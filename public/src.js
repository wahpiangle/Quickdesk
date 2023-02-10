const switchBtn = document.getElementById('switchBtn');
const socket = new WebSocket('ws://localhost:3000');
const offlineButtonArray = document.querySelectorAll('.offline-button');

switchBtn.addEventListener('click', () => {
    window.location.href = '/client';
});

offlineButtonArray.forEach((button , index) => {
    button.addEventListener('click', (event) => {
        const counterOfflineTrigger = event.target.dataset.counter;
        socket.send(counterOfflineTrigger);
        if(button.innerHTML === "Go Offline"){
            button.innerHTML = "Go Online";
            localStorage.setItem(`button-${index}`, "Go Online");
        }else if(button.innerHTML === "Go Online"){
            button.innerHTML = "Go Offline";
            localStorage.setItem(`button-${index}`, "Go Offline");
        }
    });
});
window.addEventListener('load', () =>{
    offlineButtonArray.forEach((button, index) => {
        let storedInnerHTML = localStorage.getItem(`button-${index}`);
        if (storedInnerHTML) {
            button.innerHTML = storedInnerHTML;
        }
    });
})