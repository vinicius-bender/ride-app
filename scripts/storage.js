function createNewRide (){
    const rideId = Date.now();
    const rideRecord = {
        data: [
    
        ],
        startTime: rideId,
        stopTime: null
    };
    saveRideRecord(rideId, rideRecord);
    return rideId;
}


function getAllRides (){
    return Object.entries(localStorage);
}

function getRideRecord (rideId){
        return JSON.parse (localStorage.getItem(rideId)); //transforma a string em um objeto
}

function saveRideRecord (rideId, rideRecord){
    localStorage.setItem(rideId, JSON.stringify(rideRecord));
}

function addPosition (rideId, position){

    const rideRecord = getRideRecord(rideId);
    const newData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timeStamp: position.timestamp
    };
    rideRecord.data.push(newData);
    saveRideRecord(rideId, rideRecord);
}

function updateStopTime(rideId){
    const rideRecord = getRideRecord(rideId);
    rideRecord.stopTime = Date.now();
    saveRideRecord(rideId, rideRecord);
}

