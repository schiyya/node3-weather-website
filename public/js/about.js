var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
    rgb = {r:0,g:0,b:0}



    let getPixel = (url, x, y)=> {
        let dom  = document.getElementById('aboutPage')
        var img =  document.createElement('img');
        img.src = url
        let canvas = document.createElement('canvas')
        let height = canvas.height
        let width = canvas.width
        var context = canvas.getContext('2d');
        context.drawImage(img, 10, 10);
        dom.appendChild(canvas)
        return context.getImageData(x, y, width, height);
    }
  
  

  window.onload = function() {
    let bodyElement = document.querySelector('body')
    let data = getPixel('../images/sumanth.jpeg', 0, 0); // [255, 255, 255, 0];
    let length = data.data.length;
    let i = -4, count = 0
    while ( (i += blockSize * 4) < length ) {
        count++
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    var bgColorR = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)'
    var bgColorL = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0)'
    bodyElement.style.backgroundImage = 'linear-gradient(to right, ' + bgColorR + ',' + bgColorL + ')'
  };
  