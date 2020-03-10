let player = {
    x: 20,
    y: 340,
    speed: 5,
    movement: 0,
    animate: 1,
    pacdir: 0,
    psize: 32
};

let enemy = {
    x: 530,
    y: 101,
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
        if (index == image.length -1) {
            
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
let enemyPath = [] //x = 50; y : 101 - 210

indexOfEnemy = 0;
for (var i = 0; i < 200; i++) {
    enemyPath.push([560, 101 + i])
}

for (var i = 0; i <= 100; i++) {
    enemyPath.push([560, 300])
}

for (var i = 0; i <= 200; i++) {
    enemyPath.push([560, 300 - i])
}

for (var i = 0; i <= 100; i++) {
    enemyPath.push([560, 101])
}

for (var i = 0; i < 200; i++) {
    enemyPath.push([560 - i, 101])
}

for (var i = 0; i <= 100; i++) {
    enemyPath.push([360, 101])
}

for (var i = 0; i < 200; i++) {
    enemyPath.push([360 + i, 101])
}

for (var i = 0; i <= 100; i++) {
    enemyPath.push([560, 101])
}

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

            // //enmey.x = 50;
            // enemy.y = enemyPath[indexOfEnemy][1];
            // enemy.x = enemyPath[indexOfEnemy][0];
            // console.log();

            // if (indexOfEnemy < enemyPath.length-1) {
            //     indexOfEnemy++;                
            // }
            // else {
            //     indexOfEnemy = 0;
            // }

        }, 2000);

        ctx.drawImage(image[2], 0, 0)

        render();
    }

    window.requestAnimationFrame(playGame);
}

function move(keyclick) {

    if (37 in keyclick) { player.x -= player.speed; player.animate++; player.pacdir = 64;}
    if (38 in keyclick) { player.y -= player.speed; player.animate++; player.pacdir = 0;}
    if (39 in keyclick) { player.x += player.speed; player.animate++; player.pacdir = 96;}
    if (40 in keyclick) { player.y += player.speed; player.animate++; player.pacdir = 32;}

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
    // ctx.fillRect(((canvas.width + 96) / 2), 0, 40, 40);

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
    

    if ((player.x - enemy.x) <= 23 && (player.x - enemy.x) >= 0) {
        //console.log(player.y - enemy.y);
        if ((player.y - enemy.y) <= 48 && (player.y - enemy.y) >= 0) {

            if (endGame()) {
                window.cancelAnimationFrame(render);
                end = true;
                return;
            }
        }
    }

    if ((enemy.x - player.x) <= 16 && (enemy.x - player.x) >= 0) {
        if ((enemy.y - (player.y + 16)) <= 10 && (enemy.y - player.y) >= 0) {
            if (endGame()) {
                window.cancelAnimationFrame(render);
                end = true;
                return;
            }
        }
    }
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




    ctx.drawImage(image[0], 0, 0, 32, 32, enemy.x, enemy.y, 64, 64);
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

function collisionMap1() {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 110 && (player.x) >= 105){
            player.x = 100;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 215 && (player.x) >= 210){
            player.x = 220;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
       if ((player.x) <= 205 && (player.x) >= 115){
            player.y = 295;
        }
        
    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 205 && (player.x) >= 115){
            player.y = 195;     
        }
         
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 245 && (player.x) >= 240){
            player.x = 235;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 345 && (player.x) >= 340){
            player.x = 350;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
       if ((player.x) <= 340 && (player.x) >= 245){
            player.y = 295;
        }
        
    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 340 && (player.x) >= 245){
            player.y = 195;     
        }
         
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 290 && (player.y) >= 200) { //left
        if ((player.x) <= 390 && (player.x) >= 380){
            player.x = 375;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 200) { // right
        if ((player.x) <= 470 && (player.x) >= 465){
            player.x = 475;
        }
    }

    if ((player.y) <= 290 && (player.y) >= 285) { // bottom
       if ((player.x) <= 470 && (player.x) >= 380){
            player.y = 295;
        }
        
    }

    if ((player.y) <= 205 && (player.y) >= 200) { // top
        if ((player.x) <= 470 && (player.x) >= 380){
            player.y = 195;     
        }
         
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 85 && (player.x) >= 80){
            player.x = 75;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 195 && (player.x) >= 190){
            player.x = 200;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
       if ((player.x) <= 195 && (player.x) >= 80){
            player.y = 170;
        }
        
    }

    if ((player.y) <= 60 && (player.y) >= 55) { // top
        if ((player.x) <= 195 && (player.x) >= 80){
            player.y = 50;     
        }
         
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 240 && (player.x) >= 235){
            player.x = 230;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 350 && (player.x) >= 345){
            player.x = 355;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
       if ((player.x) <= 350 && (player.x) >= 240){
            player.y = 170;
        }
        
    }

    if ((player.y) <= 65 && (player.y) >= 60) { // top
        if ((player.x) <= 350 && (player.x) >= 240){
            player.y = 55;     
        }
         
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 160 && (player.y) >= 55) { //left
        if ((player.x) <= 390 && (player.x) >= 385){
            player.x = 380;
        }
    }

    if ((player.y) <= 160 && (player.y) >= 55) { // right
        if ((player.x) <= 500 && (player.x) >= 495){
            player.x = 505;
        }
    }

    if ((player.y) <= 165 && (player.y) >= 160) { // bottom
       if ((player.x) <= 500 && (player.x) >= 390){
            player.y = 170;
        }
        
    }

    if ((player.y) <= 65 && (player.y) >= 60) { // top
        if ((player.x) <= 500 && (player.x) >= 390){
            player.y = 55;     
        }
         
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    if ((player.y) <= 35 && (player.y) >= 0) { //left
        if ((player.x) <= 230 && (player.x) >= 225){
            player.x = 220;
        }
    }

    if ((player.y) <= 35 && (player.y) >= 0) { // right
        if ((player.x) <= 350 && (player.x) >= 345){
            player.x = 355;
        }
    }

    if ((player.y) <= 35 && (player.y) >= 30) { // bottom
       if ((player.x) <= 260 && (player.x) >= 230){
            player.y = 40;
        }
        
    }
    if ((player.y) <= 35 && (player.y) >= 30) { // bottom
        if ((player.x) <= 345 && (player.x) >= 310){
             player.y = 40;
         }
         
     }


//////////////////////////////////////////////////////////////////////////////////////////////////////////
     if ((player.y) <= 308 && (player.y) >= 303) { // top
        if ((player.x) <= 15 && (player.x) >= 0){
            player.y = 298;     
        }
         
    }

    if ((player.y) <= 333 && (player.y) >= 328) { // top inside
        if ((player.x) <= 15 && (player.x) >= 0){
            player.y = 338;     
        }
         
    }


    if ((player.y) <= 323 && (player.y) >= 318) { // top right inside
        if ((player.x) <= 115 && (player.x) >= 90){
            player.y = 328;     
        }
         
    }


    if ((player.y) <= 313 && (player.y) >= 308) { // top right
        if ((player.x) <= 115 && (player.x) >= 90){
            player.y = 303;     
        }
         
    }


    if ((player.y) <= 400 && (player.y) >= 308) { // right
        if ((player.x) <= 120 && (player.x) >= 115){
            player.x = 125;
        }
    }

    if ((player.y) <= 400 && (player.y) >= 308) { // right
        if ((player.x) <= 110 && (player.x) >= 105){
            player.x = 100;
        }
    }
}