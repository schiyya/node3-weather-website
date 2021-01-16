
 const domDate = document.querySelector('#date')

let goHome = () => {
    console.log('clicked home')
}

let updateDateTime = () => {
    let date = new Date()
    var n = date.toDateString()
    var time = date.toLocaleTimeString()
    date = n + ' ' + time
    domDate.innerHTML = date
    setTimeout(()=> {
        updateDateTime();
    }, 1000)
  }

 updateDateTime()