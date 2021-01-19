const wallsDiv = document.querySelector('#wallpapers')
const wallbody = document.querySelector('body')
const form = document.querySelector('form')
window.onload = ()=> {
    loadGrid('paintings')
}

let loadGrid = (type) => {
    let path = 'poornima/p'
    let level = 6;
    if (type === 'wallpapers') {
        path = 'walls/w'
        level = 11
    } 
    for (let i=1; i<level; i++) {
        let wall = document.createElement('img');
        wall.src = '../images/' + path + i + '.jpeg'
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

let cleanGrid = ()=> {
    while(wallsDiv.childNodes.length > 0) {
        wallsDiv.removeChild(wallsDiv.childNodes[0])
    }
}

form.addEventListener('submit', (e)=> {
    console.log(e)
    let selectedItem = document.getElementById('gridItems')
    cleanGrid();
    loadGrid (selectedItem.value)
    e.preventDefault();
})

wallbody.onscroll = () => {
    let wallpaper = document.getElementById('wallPosterparent')
    if (wallpaper) {
        wallpaper.style.top = (window.pageYOffset + 360) + 'px'
    }
}