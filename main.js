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
            if ((player.y - MainEnemyObj.en2.y) <= 54 && (player.y - MainEnemyObj.en2.y) >= -21) {
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
                if ((player.x - MainEnemyObj.en3.x) <= 48 && (player.x - MainEnemyObj.en3.x) >= -28) {
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
        y: 320,
        speed: 5,
        enemycolor: 0,
        enemyeye: 64,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 64,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - this.y) <= 54 && (player.y - this.y) >= 0) {
                if ((player.x - this.x) <= 38 && (player.x - this.x) >= -25) {
                    if (endGame()) {
                        window.cancelAnimationFrame(render);
                        end = true;
                        return;
                    }
                }
            }
        }
    },

    en5: {
        x: 210,
        y: 310,
        speed: 5,
        enemycolor: 0,
        enemyeye: 96,
        dirX: 0,
        dirY: 0,
        move: 1,
        esize: 48,
        enemyPath: [], indexOfEnemy: 0,
        enemyCollision: function () {
            if ((player.y - this.y) <= 30 && (player.y - this.y) >= 0) {
                if ((player.x - this.x) <= 48 && (player.x - this.x) >= -21) {
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


let scanner = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    vy: 1,
    radiusX: 170,
    radiusY: 60,
    color: '#FFFFE0',
    drawEllipse: function () {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        if (scanner.y + scanner.vy > 120 && !scannerTop) {
            //console.log(scanner.y + scanner.vy);

            scanner.y -= scanner.vy;

            if (scanner.y + scanner.vy <= 120) {
                scannerTop = !scannerTop;
            }
        } else if (scanner.y + scanner.vy <= 290 && scannerTop) {
            scanner.y += scanner.vy;

            //console.log(scanner.y + scanner.vy);

            if (scanner.y + scanner.vy >= 290) {
                scannerTop = !scannerTop;
            }
        }
    }
};


let imageSrc = ['enemy.png', 'char.png', 'radar.png',
                 'radar2.png', 'codec.png', 'start.png',
                  'gameover.png'];

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

let startWindow = true; // first window
let preGameCodec = false; // second window

let crossVar = false;

let codecIndex = 0;

let firstLap = false;
let secondLap = false;

//let MainEnemyObj.en1.enemyPath = [] //x = 50; y : 101 - 210

firstEnemyPath();
secondEnemyPath();
thirdEnemyPath();
forthEnemyPath();
fifthEnemyPath();

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

    // if (loadMap2)
    //     map2Laptop(keyclick);
}

document.addEventListener('keydown', k, false);

document.addEventListener('keyup', function (e) {
    delete keyclick[e.keyCode];
}, false);

document.addEventListener('click', nextCodec, false);

function nextCodec() {

    if (startWindow) {
        startWindow = false;
        preGameCodec = true;
    } else {
        codecIndex++;
    }
}

function randomizeNumber(num) {
    return Math.floor(Math.random() * num);
}

function playGame() {


    if (startWindow) {
        ctx.drawImage(image[5], 0, 0);
    }

    else if (preGameCodec) {
        codec();
    }

    else if (loadMap2) {
        ctx.drawImage(image[3], 0, 0);

        if (!end) {
            renderMap2();
        } else {

            if (firstLap && secondLap) {

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.font = 'bolder 15px Courier New';
                ctx.fillStyle = 'white';
                ctx.fillText('YOU WIN NO MORE HOMEWORKS GO HOME AND SLEEP!', 100, canvas.height / 2);

                window.cancelAnimationFrame(renderMap2);
                return;
            }

            endGame();
            window.cancelAnimationFrame(renderMap2);
            return;
        }
    }

    else {

        if (!end) {
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

                ////////////////////////////////////////////////////////////////////////////////////

                MainEnemyObj.en4.y = MainEnemyObj.en4.enemyPath[MainEnemyObj.en4.indexOfEnemy][1];
                MainEnemyObj.en4.x = MainEnemyObj.en4.enemyPath[MainEnemyObj.en4.indexOfEnemy][0];
                MainEnemyObj.en4.enemyeye = MainEnemyObj.en4.enemyPath[MainEnemyObj.en4.indexOfEnemy][2];
                // console.log();

                if (MainEnemyObj.en4.indexOfEnemy < MainEnemyObj.en4.enemyPath.length - 1) {
                    MainEnemyObj.en4.indexOfEnemy++;
                }
                else {
                    MainEnemyObj.en4.indexOfEnemy = 0;
                }


                ////////////////////////////////////////////////////////////////////////////////////

                MainEnemyObj.en5.y = MainEnemyObj.en5.enemyPath[MainEnemyObj.en5.indexOfEnemy][1];
                MainEnemyObj.en5.x = MainEnemyObj.en5.enemyPath[MainEnemyObj.en5.indexOfEnemy][0];
                MainEnemyObj.en5.enemyeye = MainEnemyObj.en5.enemyPath[MainEnemyObj.en5.indexOfEnemy][2];
                // console.log();

                if (MainEnemyObj.en5.indexOfEnemy < MainEnemyObj.en5.enemyPath.length - 1) {
                    MainEnemyObj.en5.indexOfEnemy++;
                }
                else {
                    MainEnemyObj.en5.indexOfEnemy = 0;
                }



            }, 2000);

            ctx.drawImage(image[2], 0, 0);

            render();
        }

        crossVar = true;

        if (crossVar) {
            if (cross()) {
                crossVar = false;
                loadMap2 = true;
            }
        }

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

    if (!loadMap2) {
        collisionMap1();
        render();
    }

    //console.log(player.x + " " + player.y);


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
    MainEnemyObj.en5.enemyCollision();

    //MainEnemyObj.cam.enemyCollision();
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


    ctx.drawImage(image[0], 0, MainEnemyObj.en1.enemyeye, 32, 32, MainEnemyObj.en1.x, MainEnemyObj.en1.y, MainEnemyObj.en1.esize, MainEnemyObj.en1.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en2.enemyeye, 32, 32, MainEnemyObj.en2.x, MainEnemyObj.en2.y, MainEnemyObj.en2.esize, MainEnemyObj.en2.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en3.enemyeye, 32, 32, MainEnemyObj.en3.x, MainEnemyObj.en3.y, MainEnemyObj.en3.esize, MainEnemyObj.en3.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en4.enemyeye, 32, 32, MainEnemyObj.en4.x, MainEnemyObj.en4.y, MainEnemyObj.en4.esize, MainEnemyObj.en4.esize);
    ctx.drawImage(image[0], 0, MainEnemyObj.en5.enemyeye, 32, 32, MainEnemyObj.en5.x, MainEnemyObj.en5.y, MainEnemyObj.en5.esize, MainEnemyObj.en5.esize);

    //ctx.drawImage(image[0], 0, MainEnemyObj.cam.enemyeye, 32, 32, MainEnemyObj.cam.x, MainEnemyObj.cam.y, MainEnemyObj.cam.esize, MainEnemyObj.cam.esizey);

    ctx.drawImage(image[1], 0, player.pacdir, 32, 32, player.x, player.y, 32, 32);
    // ctx.font = '20px fantasy';
    // ctx.fillStyle = 'white';
    // ctx.fillText('Score: ' + score, 20, 20);


}

function codec() {
    ctx.drawImage(image[4], 0, 0);
    ctx.font = 'bolder 15px Courier New';
    ctx.fillStyle = 'white';
    if (codecIndex == 0) {
        ctx.fillText("The general assembly facility on Shadow Moses Island in Alaska’s", 20, 300);
        ctx.fillText("captured by Next Generation Special Forces ", 80, 320);
        ctx.fillText("led by members of FOX-HOUND (Ebere, and Atheer).", 60, 340);
        ctx.fillText("click to view next messsage.", 350, 390);
    }

    else if (codecIndex == 1) {
        ctx.fillText("The FOX-HOUND have secured hundreds of new homeworks", 60, 300);
        ctx.fillText("they’re demanding the student's to turn over", 100, 320);
        ctx.fillText("the remains of previous homeworks", 140, 340);
        ctx.fillText("click to view next messsage.", 350, 390);
    }

    else if (codecIndex == 2) {
        ctx.fillText("They warn that if their demands are not met", 100, 300);
        ctx.fillText("within 24 hours, they’ll launch new HOMEWORKS.", 95, 330);
        ctx.fillText("click to view next messsage.", 350, 390);
    }

    else if (codecIndex == 3) {
        ctx.fillText("Your top priority now is to destroy Fox-Hounds Gears,", 70, 300);
        ctx.fillText("especially the laptops itself. Sorry to lay it all in your lap", 15, 320);
        ctx.fillText("but you're all I've got", 180, 340);
        ctx.fillText("click to start the game.", 350, 390);
    }

    else {
        preGameCodec = !preGameCodec;
        document.removeEventListener('click', nextCodec)
    }
}

function cross() {
    if (player.x >= ((canvas.width - 50) / 2) && player.x <= ((canvas.width) / 2) + 45) {
        if (player.y >= 0 && player.y <= 10) {
            ///alert('kjashdkjh');
            // ctx.fillStyle = 'black';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = 'white';
            // ctx.fillText('Score: ' + score, (canvas.width - 100) / 2, (canvas.height - 20) / 2);
            player.x = 10;
            player.y = canvas.height - 32;
            return true;
        }
    }




    return false;
}

function endGame() {
    if (document.removeEventListener) {
        document.removeEventListener('keydown', k)
    }
    ctx.drawImage(image[6], 0, 0);
    return true;
}


function renderMap2() {

    if ((player.y) <= 155 && (player.y) >= 125) { //left
        if ((player.x) <= 20 && (player.x) >= 0) {
            ctx.font = 'bolder 10px Courier New';
            ctx.fillStyle = 'white';
            ctx.fillText('Press E to destroy the computer!', 10, 30);

            if (69 in keyclick) {
                firstLap = true;
            }
        }
    }


    if ((player.y) <= 10 && (player.y) >= 0) { //left
        if ((player.x) <= 357 && (player.x) >= 325) {
            ctx.font = 'bolder 10px Courier New';
            ctx.fillStyle = 'white';
            ctx.fillText('Press E to destroy the computer!', 10, 30);

            if (69 in keyclick) {
                secondLap = true;
            }
        }
    }

    scanner.drawEllipse();

    var k = (Math.pow(((player.x) - scanner.x), 2) / Math.pow(scanner.radiusX, 2))
        + (Math.pow((player.y - scanner.y), 2) / Math.pow(scanner.radiusY, 2));

    if (k <= 1.1) {
        if (endGame()) {
            window.cancelAnimationFrame(renderMap2);
            end = true;
            return;

        }
    }

    if (firstLap) {
        if (score != 2)
            score = 1;
        else {
            
        }
    }

    if (secondLap) {
        if (score!=0)
            score = 2;
        else
            score = 1;
    }

    if (firstLap && secondLap) {
        endGameWin();
    }

    collisionMap2();

    ctx.font = 'bolder 15px Courier New';
    ctx.fillStyle = 'white';
    ctx.fillText(score + ': computer is down.', 10, 15);
    ctx.drawImage(image[1], 0, player.pacdir, 32, 32, player.x, player.y, 32, 32);

}

function endGameWin() {
    if (document.removeEventListener) {
        document.removeEventListener('keydown', k);
    }

    end = true;
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
    for (var i = 0; i < 300; i++) {
        MainEnemyObj.en4.enemyPath.push([520 - i, MainEnemyObj.en4.y, MainEnemyObj.en4.enemyeye = 64])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en4.enemyPath.push([220, MainEnemyObj.en4.y, MainEnemyObj.en4.enemyeye = 32])
    }

    for (var i = 0; i < 300; i++) {
        MainEnemyObj.en4.enemyPath.push([220 + i, MainEnemyObj.en4.y, MainEnemyObj.en4.enemyeye = 32])
    }

    for (var i = 0; i <= 50; i++) {
        MainEnemyObj.en4.enemyPath.push([520, MainEnemyObj.en4.y, MainEnemyObj.en4.enemyeye = 64])
    }
}

function fifthEnemyPath() {
    for (var i = 1; i <= 200; i++) {
        MainEnemyObj.en5.enemyPath.push([MainEnemyObj.en5.x, 310 - i, MainEnemyObj.en5.enemyeye = 96])
    }

    MainEnemyObj.en5.x -= 5;

    for (var i = 0; i <= 100; i++) {
        MainEnemyObj.en5.enemyPath.push([MainEnemyObj.en5.x, 110, MainEnemyObj.en5.enemyeye = 96])
    }

    MainEnemyObj.en5.x += 5;

    for (var i = 1; i <= 200; i++) {
        MainEnemyObj.en5.enemyPath.push([MainEnemyObj.en5.x, 110 + i, MainEnemyObj.en5.enemyeye = 0])
    }

    for (var i = 0; i <= 100; i++) {
        MainEnemyObj.en5.enemyPath.push([MainEnemyObj.en5.x, 310, MainEnemyObj.en5.enemyeye = 0])
    }
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

function collisionMap2() {

    if ((player.y) <= 355 && (player.y) >= 350) { // bottom out
        if ((player.x) <= 470 && (player.x) >= 170) {
            player.y = 360;
        }

    }

    if ((player.y) <= 230 && (player.y) >= 55) { // right out
        if ((player.x) <= 495 && (player.x) >= 490) {
            player.x = 500;
        }

    }

    if ((player.y) <= 330 && (player.y) >= 285) { // right out
        if ((player.x) <= 495 && (player.x) >= 490) {
            player.x = 500;
        }

    }

    if ((player.y) <= 30 && (player.y) >= 25) { // top out
        if ((player.x) <= 470 && (player.x) >= 365) {
            player.y = 20;
        }

    }

    if ((player.y) <= 55 && (player.y) >= 0) { // right out
        if ((player.x) <= 365 && (player.x) >= 360) {
            player.x = 370;
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ((player.y) <= 330 && (player.y) >= 325) { // bottom in
        if ((player.x) <= 470 && (player.x) >= 170) {
            player.y = 320;
        }

    }

    if ((player.y) <= 230 && (player.y) >= 55) { // right in
        if ((player.x) <= 480 && (player.x) >= 475) {
            player.x = 470;
        }

    }

    if ((player.y) <= 330 && (player.y) >= 285) { // right in
        if ((player.x) <= 480 && (player.x) >= 475) {
            player.x = 470;
        }

    }

    if ((player.y) <= 45 && (player.y) >= 40) { // top in
        if ((player.x) <= 470 && (player.x) >= 360) {
            player.y = 50;
        }

    }

    if ((player.y) <= 55 && (player.y) >= 0) { // right in
        if ((player.x) <= 345 && (player.x) >= 340) {
            player.x = 335;
        }

    }


    if ((player.y) <= 60 && (player.y) >= 0) { //left
        if ((player.x) <= 250 && (player.x) >= 245) {
            player.x = 255;
        }
    }


    if ((player.y) <= 65 && (player.y) >= 60) { // bottom in
        if ((player.x) <= 250 && (player.x) >= 105) {
            player.y = 70;
        }

    }

    if ((player.y) <= 125 && (player.y) >= 55) { // right in
        if ((player.x) <= 105 && (player.x) >= 100) {
            player.x = 110;
        }

    }

    if ((player.y) <= 130 && (player.y) >= 125) { // right in
        if ((player.x) <= 105 && (player.x) >= 0) {
            player.y = 135;
        }

    }

    if ((player.y) <= 210 && (player.y) >= 205) { // right in
        if ((player.x) <= 105 && (player.x) >= 0) {
            player.y = 215;
        }

    }

    if ((player.y) <= 350 && (player.y) >= 205) { // right in
        if ((player.x) <= 100 && (player.x) >= 95) {
            player.x = 90;
        }

    }

    if ((player.y) <= 355 && (player.y) >= 350) { // right in
        if ((player.x) <= 140 && (player.x) >= 100) {
            player.y = 360;
        }

    }

    if ((player.y) <= 175 && (player.y) >= 170) { // bottom in
        if ((player.x) <= 105 && (player.x) >= 0) {
            player.y = 165;
        }

    }

    if ((player.y) <= 320 && (player.y) >= 170) { // bottom left
        if ((player.x) <= 105 && (player.x) >= 100) {
            player.x = 110;
        }

    }

    if ((player.y) <= 320 && (player.y) >= 315) { // bottom left
        if ((player.x) <= 140 && (player.x) >= 110) {
            player.y = 310;
        }

    }


}