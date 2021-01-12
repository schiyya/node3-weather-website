let dateTimeUpdate = ()=> {
    let dateTime = new Date();
    postMessage(dateTime);
    setTimeout("dateTimeUpdate()",1000);
}

dateTimeUpdate();