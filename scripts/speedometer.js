const speedElement = document.querySelector("#speed");
const startBtn = document.querySelector("#start-button");
const stopBtn = document.querySelector("#stop-button");
let watchId = null;
let currentRide = null;

startBtn.addEventListener("click", () => {

    if (watchId){
        return;
    }

    function handleSuccess(position){

        if (position.coords.speed === null){
            speedElement.innerText = 0;
        }
        addPosition(currentRide, position);
        speedElement.innerText = (position.coords.speed * 3.6).toFixed(1);
    }

    function handleError(error){
        console.log(error.msg)
    }

    const options = { enableHighAccuracy: true };
    currentRide = createNewRide();
    watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options);
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
});

stopBtn.addEventListener("click", () => {

    if (!watchId){
        return;
    }

    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    updateStopTime(currentRide);
    currentRide = null;
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
});