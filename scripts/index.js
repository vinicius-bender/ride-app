const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach (async ([id, value]) => {
    const ride = JSON.parse(value);
    ride.id = id;

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.classList.add("itemElement");

    const mapElement = document.createElement("div");
    mapElement.classList.add("map");


    const dataElement = document.createElement("div");
    dataElement.classList.add("dataElement");

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`;
    
    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)}`;

    const dateDiv = document.createElement("div");
    dateDiv.innerText = getStartDate(ride);


    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);
    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);
    rideListElement.appendChild(itemElement);
    
});


async function getLocationData(latitude, longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`;
    const response = await fetch(url);
    return await response.json();

}

function getMaxSpeed (positions){
    let maxSpeed = 0;
    positions.forEach(position => {
        if (position.speed != null && position.speed > maxSpeed){
            maxSpeed = position.speed;
        }
    });
    return (maxSpeed * 3.6).toFixed(1);
}


function getDistance (positions){
    const earthRadiusKm = 6371;
    let totalDist = 0;
    for (let i = 0; i < positions.length - 1; i++){
        const p1 = {
            latitude: positions[i].latitude, 
            longitude: positions[i].longitude
        };
        const p2 = {
            latitude: positions[i + 1].latitude, 
            longitude: positions[i + 1].longitude
        };
    
        const deltaLatitude = toRadius (p2.latitude - p1.latitude);
        const deltaLongitude = toRadius(p1.longitude - p2.longitude);

        const a = 
        Math.sin(deltaLatitude/2) * 
        Math.sin(deltaLatitude/2) + 
        Math.sin(deltaLongitude/2) * 
        Math.sin(deltaLongitude/2) * 
        Math.cos(toRadius(p1.latitude)) * 
        Math.cos(toRadius(p2.latitude));

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = earthRadiusKm * c;
        totalDist = totalDist + distance;
    }

    function toRadius (degree){
        return degree * (Math.PI / 180)
    }

    return totalDist.toFixed(2);
}

function getDuration (ride){

    function format (number, digits){
        return String(number.toFixed(0)).padStart(2, '0');
    }

    const interval = (ride.stopTime - ride.startTime)/1000;
    const minutes = Math.trunc(interval/60);
    const seconds = interval % 60;
    return `${format(minutes, 2)}:${format(seconds, 2)}`;
}

function getStartDate (ride){
    const date = new Date(ride.startTime);

    const day = date.toLocaleString("en-US", {day: "numeric"});
    const month=  date.toLocaleString("en-US", {month: "numeric"});
    const year = date.toLocaleString("en-US", {year: "numeric"});
    const hour=  date.toLocaleString("en-US", {hour: "2-digit", hour12:false});
    const minute = date.toLocaleString("en-US", {minute: "2-digit"});

    return `${hour}:${minute} - ${month}/${day}/${year}`;
}