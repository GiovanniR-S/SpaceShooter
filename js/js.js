const yourShip = document.querySelector('.player');
const area = document.querySelector('#main-play-area');

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

    moveLaser();

}

function createLaserElement(){

    let xposition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yposition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = '../imgs/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xposition}px`;
    newLaser.style.top = `${yposition - 10}px`;
    return newLaser;

}

function moveLaser(laser){

    let laserInterval = setInterval(() => {
        let xposition = parseInt(laser.style.left);

        if(xposition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xposition + 8}px`
        }

    }, 10)

}

window.addEventListener('keydown', flyShip);