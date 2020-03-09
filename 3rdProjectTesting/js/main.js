let player = {
    x: 30,
    y: 30,
    speed: 5,
    movement: 0,
    animate: 1,
    pacdir: 0,
    psize: 48
};

let enemy = {
    x: 560,
    y: 340,
    speed: 5,
    enemycolor: 0,
    enemyeye: 0,
    dirX: 0,
    dirY: 0,
    move: 1,
    esize: 32
};

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

document.body.appendChild(canvas);


var scanner = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    vy: 1,
    radiusX: 120,
    radiusY: 60,
    color: 'white',
    drawEllipse: function () {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        if (scanner.y + scanner.vy > 70 && !scannerTop) {
            //console.log(scanner.y + scanner.vy);

            scanner.y -= scanner.vy;

            if (scanner.y + scanner.vy <= 72) {
                scannerTop = !scannerTop;
            }
        } else if (scanner.y + scanner.vy <= canvas.height - 70 && scannerTop) {
            scanner.y += scanner.vy;

            //console.log(scanner.y + scanner.vy);

            if (scanner.y + scanner.vy >= 330) {
                scannerTop = !scannerTop;
            }
        }
    }
};


let imageSrc = ['', '../assets/Portraits2_01.png', '../assets/Man_walk.png', '../assets/Man_walk.png'];

let image = [];

for (var index = 0; index < imageSrc.length; index++) {
    image.push(new Image());
}

for (var index = 0; index < imageSrc.length; index++) {
    image[index].src = imageSrc[index];
    image[index].ready = false;
}

var imagesLoadedCounter = 0;
for (var index = 0; index < image.length; index++) {
    image[index].onload = function () {
        imagesLoadedCounter++;
        this.ready = true;
        if (image.length == imagesLoadedCounter) {
            playGame();
        }
    };
}

let score = 0;
let sghost = 0;

let ghost = false;

let keyclick = {};

let loadMap2 = false;
let end = false;
let scannerTop = false;

var counterIndex = 0;
let enmeyPath = [] //x = 50; y : 101 - 210

var len = 210 - 101;
index = 0;
for (var i = 0; i <= len; i++) {
    enmeyPath.push([50, 101+i])
}

function k(e) {
    keyclick[e.keyCode] = true;

    // console.log('picture number: ' + player.movement + '  ' + ' animate: ' + player.animate);
    // console.log(player.animate % 5 == 0);

    if (player.animate % 5 == 0) {
        if (player.movement == 0) {
            player.movement = 96;
        }

        else if (player.movement == 96) {
            player.movement = 144;
        }

        else if (player.movement == 144) {
            player.movement = 192;
        }

        else {
            player.movement = 0;
        }
    }

    move(keyclick);
}

document.addEventListener('keydown', k, false);

document.addEventListener('keyup', function (e) {
    delete keyclick[e.keyCode];
}, false);

function randomizeNumber(num) {
    return Math.floor(Math.random() * num);
}

function playGame() {

    if (cross()) {
        if (document.removeEventListener) {
            document.removeEventListener('keydown', k)
        }

        loadMap2 = true;
    }

    if (loadMap2) {
        renderMap2();
    }
    else {

        setInterval(function () {
            // if (enemy.y < canvas.height / 2 + 10) {
            //     enemy.dirY = enemy.speed = randomizeNumber(2);
            //     //console.log(100 - (-1));
            //     enemy.y += enemy.dirY;
            //     //console.log('(' + enemy.x + ', ' + enemy.y + ')');
                
            // }
    
    
            //var len = 210 - 101;
    
            //enmey.x = 50;
            enemy.y = enmeyPath[index][1];
            console.log(enemy.y);
            
            if (index != len) {
                index++;
            } 
    
        }, 2000);

        render();
    }

    window.requestAnimationFrame(playGame);
}

function move(keyclick) {

    if (37 in keyclick) { player.x -= player.speed; player.animate++; }
    if (38 in keyclick) { player.y -= player.speed; player.animate++; }
    if (39 in keyclick) { player.x += player.speed; player.animate++; }
    if (40 in keyclick) { player.y += player.speed; player.animate++; }

    if (player.x >= (canvas.width - 32)) { player.x = (canvas.width - 32); }
    if (player.y >= (canvas.height - 32)) { player.y = (canvas.height - 32); }
    if (player.x < 0) { player.x = 0; }
    if (player.y < 0) { player.y = 0; }

    render();
}

function render() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(((canvas.width - 32) / 2), 0, 40, 40);


    ctx.fillStyle = 'white';
    ctx.fillRect(((canvas.width + 96) / 2), 0, 40, 40);

    // if (!ghost) {
    //     //console.log(randomizeNumber(300));

    //     enemy.x = randomizeNumber(300);
    //     enemy.y = randomizeNumber(200) + 30;
    //     enemy.enemycolor = randomizeNumber(5) * 64;
    //     ghost = !ghost;
    // }


    //console.log ((player.x-enemy.x) + ' ' +  (enemy.x-player.x))


    if (player.x < enemy.x) {
        enemy.dirX = enemy.speed = -randomizeNumber(3);
    } else {
        enemy.dirX = enemy.speed = randomizeNumber(3);
    }

    if (player.y < enemy.y) {
        enemy.dirY = enemy.speed = -randomizeNumber(3);
    } else {
        enemy.dirY = enemy.speed = randomizeNumber(3);
    }

    if (end) {
        endGame();
        window.cancelAnimationFrame(render);
        return
    } 

    if ((player.x - enemy.x) <= 23 && (player.x - enemy.x) >= 0) {
        //console.log(player.y - enemy.y);
        if ((player.y - enemy.y) <= 25 && (player.y - enemy.y) >= 0) {

            if (endGame()) {
                window.cancelAnimationFrame(render);
                end = true;
                return;
            }
        }
    }

    if ((enemy.x - player.x) <= 15 && (enemy.x - player.x) >= 0) {
        if ((enemy.y - player.y) <= 40 && (enemy.y - player.y) >= 0) {
            if (endGame()) {
                window.cancelAnimationFrame(render);
                end = true;
                return;

            }

        }
    }
    //console.log(player.x - enemy.x);



    scanner.drawEllipse();

    //  scanner.y -= scanner.vy;

    var k = (Math.pow((player.x - scanner.x), 2) / Math.pow(scanner.radiusX, 2)) 
    + (Math.pow((player.y - scanner.y), 2) / Math.pow(scanner.radiusY, 2)); 

    if(k <= 1){
        if (endGame()) {
            window.cancelAnimationFrame(render);
            end = true;
            return;

        }
    }


    

    ctx.drawImage(image[1], 0, 0, 32, 32, enemy.x, enemy.y, enemy.esize, enemy.esize);
    ctx.drawImage(image[3], player.movement, 10, 48, 48, player.x, player.y, player.psize, player.psize);
    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 20, 20);

    if (69 in keyclick) {
        ctx.beginPath();
        ctx.moveTo((canvas.width + 96) / 2, 0);
        ctx.lineTo((canvas.width + 96) / 2 + 40, 40);

    }
}

function cross() {
    if (player.x >= ((canvas.width - 40) / 2) && player.x <= ((canvas.width) / 2) + 40) {
        if (player.y >= 0 && player.y <= 10) {
            ///alert('kjashdkjh');
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + score, (canvas.width - 100) / 2, (canvas.height - 20) / 2);
            return true;
        }
    }

    return false;
}

function endGame() {
    if (document.removeEventListener) {
        document.removeEventListener('keydown', k)
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, (canvas.width - 100) / 2, (canvas.height - 20) / 2);
    return true;
}

function renderMap2() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('HELOO: ', (canvas.width - 100) / 2, (canvas.height - 20) / 2);
}
