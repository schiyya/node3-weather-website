const wallsDiv = document.querySelector('#wallpapers')
const wallbody = document.querySelector('body')

window.onload = ()=> {
    for (let i=1; i<11; i++) {
        let wall = document.createElement('img');
        wall.src = '../images/walls/w' + i + '.jpeg'
         let parentWidth = wallsDiv.width/3;
        wall.style.width = '98%'
        wall.style.height = '480px'
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
    let offset = window.pageYOffset;
}

let closeMe = (e)=> {
    let element = e.currentTarget.parentElement
    element.parentElement.removeChild(element)
    wallsDiv.classList.remove('blur')
    wallsDiv.classList.remove('noHover')
}