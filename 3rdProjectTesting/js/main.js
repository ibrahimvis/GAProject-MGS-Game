let player = {
    x: 20,
    y: 340,
    speed: 5,
    movement: 0,
    animate: 1,
    pacdir: 0,
    psize: 32
};

MainEnemyObj = {
    en1: {
        x: 520,
        y: 30,
        speed: 5,
        enemycolor: 0,
        enemyeye: 0,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 64,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - MainEnemyObj.en1.y) <= 54 && (player.y - MainEnemyObj.en1.y) >= 0) {
                if ((player.x - MainEnemyObj.en1.x) <= 38 && (player.x - MainEnemyObj.en1.x) >= -25) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                }
            }
        }
    },
    en2: {
        x: 20,
        y: 30,
        speed: 5,
        enemycolor: 0,
        enemyeye: 0,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 64,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - MainEnemyObj.en2.y) <= 54 && (player.y - MainEnemyObj.en2.y) >= -5) {
                if ((player.x - MainEnemyObj.en2.x) <= 38 && (player.x - MainEnemyObj.en2.x) >= -25) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                }
            }
        }
    },

    en3: {
        x: 120,
        y: 170,
        speed: 5,
        enemycolor: 0,
        enemyeye: 32,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 48,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - MainEnemyObj.en3.y) <= 30 && (player.y - MainEnemyObj.en3.y) >= 0) {
                if ((player.x - MainEnemyObj.en3.x) <= 48 && (player.x - MainEnemyObj.en3.x) >= -5) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                }


            }
        }
    },

    en4: {
        x: 520,
        y: 310,
        speed: 5,
        enemycolor: 0,
        enemyeye: 64,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 48,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - MainEnemyObj.en4.y) <= 30 && (player.y - MainEnemyObj.en4.y) >= 0) {
                if ((player.x - MainEnemyObj.en4.x) <= 48 && (player.x - MainEnemyObj.en4.x) >= -5) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                    console.log(true);

                }
            }
        }
    },

    cam: {
        x: 280,
        y: 295,
        speed: 5,
        enemycolor: 0,
        enemyeye: 96,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 48,
        esizey: 106,
        camPath: [], indexOfCam: 0,
        enemyCollision: function () {
            if ((player.y - MainEnemyObj.cam.y) <= 80 && (player.y - MainEnemyObj.cam.y) >= 0) {
                if ((player.x - MainEnemyObj.cam.x) <= 45 && (player.x - MainEnemyObj.cam.x) >= 0) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                }
            }
        }

    }
};

// let MainEnemyObj.en1 = {
//     x: 520,
//     y: 101,
//     speed: 5,
//     enemycolor: 0,
//     enemyeye: 0,
//     dirX: 0,
//     dirY: 0,
//     move: 1,
//     esize: 32
// };

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
    color: '#FFFFE0',
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


let imageSrc = ['../assets/enemy.png', '../assets/char.png', '../assets/radar.png'];

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
        //this.ready = true;
        if (index == image.length - 1) {

        }
        if (image.length == imagesLoadedCounter) {
            playGame();
        }
    };
}

let score = 0;

let keyclick = {};

let loadMap2 = false;
let end = false;
let scannerTop = false;
var counterIndex = 0;
//let MainEnemyObj.en1.enemyPath = [] //x = 50; y : 101 - 210

firstEnemyPath();
secondEnemyPath();
thirdEnemyPath();
forthEnemyPath();

fCamPath();

function k(e) {
    keyclick[e.keyCode] = true;

    // console.log('picture number: ' + player.movement + '  ' + ' animate: ' + player.animate);
    // console.log(player.animate % 5 == 0);

    // if (player.animate % 5 == 0) {
    //     if (player.movement == 0) {
    //         player.movement = 96;
    //     }

    //     else if (player.movement == 96) {
    //         player.movement = 144;
    //     }

    //     else if (player.movement == 144) {
    //         player.movement = 192;
    //     }

    //     else {
    //         player.movement = 0;
    //     }
    // }

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

        setTimeout(function () {
            // if (enemy.y < canvas.height / 2 + 10) {
            //     enemy.dirY = enemy.speed = randomizeNumber(2);
            //     //console.log(100 - (-1));
            //     enemy.y += enemy.dirY;
            //     //console.log('(' + enemy.x + ', ' + enemy.y + ')');

            // }


            // var len = (210 - 101) * 2;

            // //enmey.x = 50;////////////////////////////////////////////////////////
            MainEnemyObj.en1.y = MainEnemyObj.en1.enemyPath[MainEnemyObj.en1.indexOfEnemy][1];
            MainEnemyObj.en1.x = MainEnemyObj.en1.enemyPath[MainEnemyObj.en1.indexOfEnemy][0];
            MainEnemyObj.en1.enemyeye = MainEnemyObj.en1.enemyPath[MainEnemyObj.en1.indexOfEnemy][2];
            // console.log();

            if (MainEnemyObj.en1.indexOfEnemy < MainEnemyObj.en1.enemyPath.length - 1) {
                MainEnemyObj.en1.indexOfEnemy++;
            }
            else {
                MainEnemyObj.en1.indexOfEnemy = 0;
            }

            ////////////////////////////////////////////////////////

            MainEnemyObj.en2.y = MainEnemyObj.en2.enemyPath[MainEnemyObj.en2.indexOfEnemy][1];
            MainEnemyObj.en2.x = MainEnemyObj.en2.enemyPath[MainEnemyObj.en2.indexOfEnemy][0];
            MainEnemyObj.en2.enemyeye = MainEnemyObj.en2.enemyPath[MainEnemyObj.en2.indexOfEnemy][2];
            // console.log();

            if (MainEnemyObj.en2.indexOfEnemy < MainEnemyObj.en2.enemyPath.length - 1) {
                MainEnemyObj.en2.indexOfEnemy++;
            }
            else {
                MainEnemyObj.en2.indexOfEnemy = 0;
            }

            ////////////////////////////////////////////////////////////////////////////////////

            MainEnemyObj.en3.y = MainEnemyObj.en3.enemyPath[MainEnemyObj.en3.indexOfEnemy][1];
            MainEnemyObj.en3.x = MainEnemyObj.en3.enemyPath[MainEnemyObj.en3.indexOfEnemy][0];
            MainEnemyObj.en3.enemyeye = MainEnemyObj.en3.enemyPath[MainEnemyObj.en3.indexOfEnemy][2];
            // console.log();

            if (MainEnemyObj.en3.indexOfEnemy < MainEnemyObj.en3.enemyPath.length - 1) {
                MainEnemyObj.en3.indexOfEnemy++;
            }
            else {
                MainEnemyObj.en3.indexOfEnemy = 0;
            }

        }, 2000);

        ctx.drawImage(image[2], 0, 0)

        render();
    }

    window.requestAnimationFrame(playGame);
}

function move(keyclick) {

    if (37 in keyclick) { player.x -= player.speed; player.animate++; player.pacdir = 64; }
    if (38 in keyclick) { player.y -= player.speed; player.animate++; player.pacdir = 0; }
    if (39 in keyclick) { player.x += player.speed; player.animate++; player.pacdir = 96; }
    if (40 in keyclick) { player.y += player.speed; player.animate++; player.pacdir = 32; }

    if (player.x >= (canvas.width - 32)) { player.x = (canvas.width - 32); }
    if (player.y >= (canvas.height - 32)) { player.y = (canvas.height - 32); }
    if (player.x < 0) { player.x = 0; }
    if (player.y < 0) { player.y = 0; }


    collisionMap1();


    //console.log(player.x + " " + player.y);

    render();
}

function render() {

    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(((canvas.width - 50) / 2), 0, 45, 40);


    // ctx.fillStyle = 'white';
    // ctx.fillRect(MainEnemyObj.en3.x, MainEnemyObj.en3.y, MainEnemyObj.en3.esize, MainEnemyObj.en3.esize);


    MainEnemyObj.en1.enemyCollision();
    MainEnemyObj.en2.enemyCollision();
    MainEnemyObj.en3.enemyCollision();
    MainEnemyObj.en4.enemyCollision();

    MainEnemyObj.cam.enemyCollision();
    //console.log(player.x - MainEnemyObj.cam.x);

    // if (!condition) {
    //     //console.log(randomizeNumber(300));

    //     enemy.x = randomizeNumber(300);
    //     enemy.y = randomizeNumber(200) + 30;
    //     enemy.enemycolor = randomizeNumber(5) * 64;
    //     ghost = !ghost;
    // }


    //console.log ((player.x-enemy.x) + ' ' +  (enemy.x-player.x))
    // var moveEnemy = randomizeNumber(50) * 3 + 1;
    // if (moveEnemy % 10 == 0)
    //     if (player.x < enemy.x) {
    //         enemy.dirX = enemy.speed = -randomizeNumber(3);
    //     } else {
    //         enemy.dirX = enemy.speed = randomizeNumber(3);
    //     } else {

    //     if (player.y < enemy.y) {
    //         enemy.dirY = enemy.speed = -randomizeNumber(3);
    //     } else {
    //         enemy.dirY = enemy.speed = randomizeNumber(3);
    //     }
    // }

    // enemy.x += enemy.dirX;
    // enemy.y += enemy.dirY;

    if (end) {
        endGame();
        window.cancelAnimationFrame(render);
        return;
    }

    //console.log(player.x + ", " + player.y + ", " + " | " + enemy.x + ", " + enemy.y);


    // if ((player.x - enemy.x) <= 23 && (player.x - enemy.x) >= 0) {
    //     //console.log(player.y - enemy.y);
    //     if ((player.y - enemy.y) <= 48 && (player.y - enemy.y) >= 0) {

    //         if (endGame()) {
    //             window.cancelAnimationFrame(render);
    //             end = true;
    //             return;
    //         }
    //     }
    // }

    // if ((enemy.x - player.x) <= 16 && (enemy.x - player.x) >= 0) {
    //     if ((enemy.y - (player.y + 16)) <= 10 && (enemy.y - player.y) >= 0) {
    //         if (endGame()) {
    //             window.cancelAnimationFrame(render);
    //             end = true;
    //             return;
    //         }
    //     }
    // }
    //console.log(player.x - enemy.x);



    // scanner.drawEllipse();

    // //  scanner.y -= scanner.vy;

    // var k = (Math.pow(((player.x) - scanner.x), 2) / Math.pow(scanner.radiusX, 2))
    //     + (Math.pow((player.y - scanner.y), 2) / Math.pow(scanner.radiusY, 2));

    // if (k <= 1) {
    //     if (endGame()) {
    //         window.cancelAnimationFrame(render);
    //         end = true;
    //         return;

    //     }
    // }




    ctx.drawImage(image[0], 0, MainEnemyObj.en1.enemyeye, 32, 32, MainEnemyObj.en1.x, MainEnemyObj.en1.y, MainEnemyObj.en1.esize, MainEnemyObj.en1.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en2.enemyeye, 32, 32, MainEnemyObj.en2.x, MainEnemyObj.en2.y, MainEnemyObj.en2.esize, MainEnemyObj.en2.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en3.enemyeye, 32, 32, MainEnemyObj.en3.x, MainEnemyObj.en3.y, MainEnemyObj.en3.esize, MainEnemyObj.en3.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en4.enemyeye, 32, 32, MainEnemyObj.en4.x, MainEnemyObj.en4.y, MainEnemyObj.en4.esize, MainEnemyObj.en4.esize);

    ctx.drawImage(image[0], 0, MainEnemyObj.cam.enemyeye, 32, 32, MainEnemyObj.cam.x, MainEnemyObj.cam.y, MainEnemyObj.cam.esize, MainEnemyObj.cam.esizey);

    ctx.drawImage(image[1], 0, player.pacdir, 32, 32, player.x, player.y, 32, 32);
    ctx.font = '20px fantasy';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 20, 20);

    if (69 in keyclick) {
        ctx.beginPath();
        ctx.strokeStyle = 'green'
        ctx.lineWidth = 4;
        ctx.moveTo((canvas.width + 96) / 2, 0);
        ctx.lineTo((canvas.width + 96) / 2 + 40, 40);
        ctx.stroke();
    }
}

function cross() {
    if (player.x >= ((canvas.width - 50) / 2) && player.x <= ((canvas.width) / 2) + 45) {
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

function firstEnemyPath() {

    for (var i = 1; i <= 150; i++) {
        MainEnemyObj.en1.enemyPath.push([MainEnemyObj.en1.x, 30 + i, MainEnemyObj.en1.enemyeye = 0])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en1.enemyPath.push([MainEnemyObj.en1.x, 180, MainEnemyObj.en1.enemyeye = 0])
    }

    for (var i = 1; i <= 150; i++) {
        MainEnemyObj.en1.enemyPath.push([MainEnemyObj.en1.x, 180 - i, MainEnemyObj.en1.enemyeye = 96])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en1.enemyPath.push([MainEnemyObj.en1.x, 30, MainEnemyObj.en1.enemyeye = 96])
    }

    for (var i = 0; i < 200; i++) {
        MainEnemyObj.en1.enemyPath.push([520 - i, 30, MainEnemyObj.en1.enemyeye = 64])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en1.enemyPath.push([320, 30, MainEnemyObj.en1.enemyeye = 64])
    }

    for (var i = 0; i < 200; i++) {
        MainEnemyObj.en1.enemyPath.push([320 + i, 30, MainEnemyObj.en1.enemyeye = 32])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en1.enemyPath.push([520, 30, MainEnemyObj.en1.enemyeye = 32])
    }
}

function secondEnemyPath() {

    for (var i = 0; i < 200; i++) {
        MainEnemyObj.en2.enemyPath.push([20 + i, 30, MainEnemyObj.en2.enemyeye = 32])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en2.enemyPath.push([220, 30, MainEnemyObj.en2.enemyeye = 64])
    }

    for (var i = 0; i < 200; i++) {
        MainEnemyObj.en2.enemyPath.push([220 - i, 30, MainEnemyObj.en2.enemyeye = 64])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en2.enemyPath.push([20, 30, MainEnemyObj.en2.enemyeye = 32])
    }

    for (var i = 1; i <= 150; i++) {
        MainEnemyObj.en2.enemyPath.push([MainEnemyObj.en2.x, 30 + i, MainEnemyObj.en2.enemyeye = 0])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en2.enemyPath.push([MainEnemyObj.en2.x, 180, MainEnemyObj.en2.enemyeye = 0])
    }


    for (var i = 1; i <= 150; i++) {
        MainEnemyObj.en2.enemyPath.push([MainEnemyObj.en2.x, 180 - i, MainEnemyObj.en2.enemyeye = 96])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en2.enemyPath.push([MainEnemyObj.en2.x, 30, MainEnemyObj.en2.enemyeye = 96])
    }

}

function thirdEnemyPath() {
    for (var i = 0; i < 300; i++) {
        MainEnemyObj.en3.enemyPath.push([120 + i, MainEnemyObj.en3.y, MainEnemyObj.en3.enemyeye = 32])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en3.enemyPath.push([420, MainEnemyObj.en3.y, MainEnemyObj.en3.enemyeye = 64])
    }

    for (var i = 0; i < 300; i++) {
        MainEnemyObj.en3.enemyPath.push([420 - i, MainEnemyObj.en3.y, MainEnemyObj.en3.enemyeye = 64])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en3.enemyPath.push([120, MainEnemyObj.en3.y, MainEnemyObj.en3.enemyeye = 32])
    }
}

function forthEnemyPath() {

}
function fCamPath() {

}

function collisionMap1() {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 110 && (player.x) >= 105) {
            player.x = 100;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 215 && (player.x) >= 210) {
            player.x = 220;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
        if ((player.x) <= 205 && (player.x) >= 115) {
            player.y = 295;
        }

    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 205 && (player.x) >= 115) {
            player.y = 195;
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 245 && (player.x) >= 240) {
            player.x = 235;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 345 && (player.x) >= 340) {
            player.x = 350;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
        if ((player.x) <= 340 && (player.x) >= 245) {
            player.y = 295;
        }

    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 340 && (player.x) >= 245) {
            player.y = 195;
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 390 && (player.x) >= 380) {
            player.x = 375;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 470 && (player.x) >= 465) {
            player.x = 475;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
        if ((player.x) <= 470 && (player.x) >= 380) {
            player.y = 295;
        }

    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 470 && (player.x) >= 380) {
            player.y = 195;
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 85 && (player.x) >= 80) {
            player.x = 75;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 195 && (player.x) >= 190) {
            player.x = 200;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
        if ((player.x) <= 195 && (player.x) >= 80) {
            player.y = 170;
        }

    }

    if ((player.y) <= 60 && (player.y) >= 55) { // top
        if ((player.x) <= 195 && (player.x) >= 80) {
            player.y = 50;
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 240 && (player.x) >= 235) {
            player.x = 230;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 350 && (player.x) >= 345) {
            player.x = 355;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
        if ((player.x) <= 350 && (player.x) >= 240) {
            player.y = 170;
        }

    }

    if ((player.y) <= 65 && (player.y) >= 60) { // top
        if ((player.x) <= 350 && (player.x) >= 240) {
            player.y = 55;
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 390 && (player.x) >= 385) {
            player.x = 380;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 500 && (player.x) >= 495) {
            player.x = 505;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
        if ((player.x) <= 500 && (player.x) >= 390) {
            player.y = 170;
        }

    }

    if ((player.y) <= 65 && (player.y) >= 60) { // top
        if ((player.x) <= 500 && (player.x) >= 390) {
            player.y = 55;
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    if ((player.y) <= 35 && (player.y) >= 0) { //left
        if ((player.x) <= 230 && (player.x) >= 225) {
            player.x = 220;
        }
    }

    if ((player.y) <= 35 && (player.y) >= 0) { // right
        if ((player.x) <= 350 && (player.x) >= 345) {
            player.x = 355;
        }
    }

    if ((player.y) <= 35 && (player.y) >= 30) { // bottom
        if ((player.x) <= 260 && (player.x) >= 230) {
            player.y = 40;
        }

    }
    if ((player.y) <= 35 && (player.y) >= 30) { // bottom
        if ((player.x) <= 345 && (player.x) >= 310) {
            player.y = 40;
        }

    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    if ((player.y) <= 308 && (player.y) >= 303) { // top
        if ((player.x) <= 15 && (player.x) >= 0) {
            player.y = 298;
        }

    }

    if ((player.y) <= 333 && (player.y) >= 328) { // top inside
        if ((player.x) <= 15 && (player.x) >= 0) {
            player.y = 338;
        }

    }


    if ((player.y) <= 323 && (player.y) >= 318) { // top right inside
        if ((player.x) <= 115 && (player.x) >= 90) {
            player.y = 328;
        }

    }


    if ((player.y) <= 313 && (player.y) >= 308) { // top right
        if ((player.x) <= 115 && (player.x) >= 90) {
            player.y = 303;
        }

    }


    if ((player.y) <= 400 && (player.y) >= 308) { // right
        if ((player.x) <= 120 && (player.x) >= 115) {
            player.x = 125;
        }
    }

    if ((player.y) <= 400 && (player.y) >= 308) { // right
        if ((player.x) <= 110 && (player.x) >= 105) {
            player.x = 100;
        }
    }
}