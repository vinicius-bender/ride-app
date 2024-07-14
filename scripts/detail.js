const params = new URLSearchParams(window.location.search);
const rideID = params.get("id");
const ride = getRideRecord(rideID);

document.addEventListener("DOMContentLoaded", async () => {

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dataElement = document.createElement("div");
    dataElement.classList.add("dataElement");

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
    cityDiv.classList.add("cityDiv");

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`;
    maxSpeedDiv.classList.add("maxSpeedDiv");

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)}`;

    const dateDiv = document.createElement("div");
    dateDiv.innerText = getStartDate(ride);
    dateDiv.classList.add("dateDiv");

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);
    document.querySelector("#detailsData").appendChild(dataElement);

    const map = L.map("mapDetail");
    map.setView(firstPosition.latitude, firstPosition.longitude);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
    }).addTo(map);
});

