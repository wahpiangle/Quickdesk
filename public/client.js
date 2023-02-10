const socket = new WebSocket('ws://localhost:3000');
const switchBtn = document.getElementById('switchBtn');
const statusImageArray = document.querySelectorAll('.online-status');

switchBtn.addEventListener('click', () => {
    window.location.href = '/src';
});

socket.onmessage = function (event, trigger) {
    let reader = new FileReader();
    reader.onload = function() {
        let trigger = parseInt(reader.result);
        //to load the status image based on the trigger
        statusImageArray.forEach((image, index) => {
            if(index === (trigger-1) && image.getAttribute("src") === 'online.png') {
                image.setAttribute("src", 'offline.png');
                localStorage.setItem(`image-${index}`, 'offline.png');
            }
            else if(index === (trigger-1) && image.getAttribute("src") === 'offline.png') {
                image.setAttribute("src", 'online.png');
                localStorage.setItem(`image-${index}`, 'online.png');
            }
        }
        )
    };
    reader.readAsText(event.data);
};

window.addEventListener('load', () => {
    statusImageArray.forEach((image, index) => {
        let storedSrc = localStorage.getItem(`image-${index}`);
        if (storedSrc) {
            image.setAttribute('src', storedSrc);
        }
    });
});

socket.addEventListener('open', (event) => {
    console.log('WebSocket connected');
});
