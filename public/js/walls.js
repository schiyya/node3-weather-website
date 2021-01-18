const wallsDiv = document.querySelector('#wallpapers')
const wallbody = document.querySelector('body')

window.onload = ()=> {
    for (let i=1; i<6; i++) {
        let wall = document.createElement('img');
        wall.src = '../images/poornima/p' + i + '.jpeg'
        wall.style.width = '98%'
        wall.style.height = '540px'
        wall.addEventListener('click', clickFunction)
        wallsDiv.appendChild(wall)
    }
}

let clickFunction = (e)=> {
    let selElement = e.currentTarget;
    let wallPoster = document.createElement('div');
    wallPoster.setAttribute('id', 'wallPosterparent')
    let wallPosterImage = document.createElement('img');
    wallPosterImage.setAttribute('class', 'wallsPosterImage')
    wallPosterImage.src = selElement.src
    let wallPosterClose = document.createElement('div');
    wallPosterClose.setAttribute('id', 'closeX')
    wallPosterClose.innerHTML = 'X'
    wallPosterClose.addEventListener('click', closeMe)
    wallPoster.appendChild(wallPosterImage)
    wallPoster.appendChild(wallPosterClose)
    wallPoster.style.top = (window.pageYOffset + 360) + 'px'
    wallbody.appendChild(wallPoster)
    wallsDiv.classList.add('blur')
    wallsDiv.classList.add('noHover')
    wallPosterClose.classList.add('hover')
}

let closeMe = (e)=> {
    let element = e.currentTarget.parentElement
    element.parentElement.removeChild(element)
    wallsDiv.classList.remove('blur')
    wallsDiv.classList.remove('noHover')
}