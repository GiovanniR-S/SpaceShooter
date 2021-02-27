const yourShip = document.querySelector('.player');
const area = document.querySelector('#main-play-area');
const enemys = ['imgs/Enemy.png', 'imgs/enemy2.png'];
const instructionsText = document.querySelector('.game-instructions');
const start = document.querySelector('.start');
let alienInterval;

function flyShip(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

//Nave Subiu
function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px"){
        return;
    }else {
        
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;

    }
}

//Nave desceu
function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "500px"){
        return;
    }else {

        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;

    }
}

//tiro
function fireLaser(){
    let laser = createLaserElement();

    area.appendChild(laser);

    moveLaser(laser);

}

function createLaserElement(){

    let xposition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yposition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'imgs/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xposition}px`;
    newLaser.style.top = `${yposition - 10}px`;
    return newLaser;

}

function moveLaser(laser){

    let laserInterval = setInterval(() => {
        let xposition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {

            if(checarLaserCollision(laser, alien)){
                alien.src = 'img/explosion.png'
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }

        })
        
        if(xposition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xposition + 8}px`;
        }

    }, 10)

}

function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = enemys[Math.floor(Math.random() * enemys.length)];

    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-trasmition');

    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    area.appendChild(newAlien);

    moveAlien(newAlien);

}

function moveAlien(alien){
    let moveAlienInterval = setInterval(() => {

        let xposition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xposition <= 50){

            if(Array.from(alien.classList).includes('dead-alien')){

                alien.remove();

            }else{
                gameOver();
            }

        }else{
            alien.style.left = `${xposition - 4}px`;
        }

    }, 30);
}

function checarLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true;
        }else {
            return false;
        }
    }else {
        return false;
    }
}

start.addEventListener('click', (event) => {
    playGame();
});

function playGame(){
    start.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);

    alienInterval = setInterval(() => {

        createAliens();

    }, 2000)

}

function gameOver(){
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let laser = document.querySelectorAll('.laser');
    laser.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over !');
        yourShip.style.top = "250px";
        start.style.display = "block";
        instructionsText.style.display = "block";
    });
}