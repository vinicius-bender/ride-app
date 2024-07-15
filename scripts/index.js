const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach (async ([id, value]) => {
    const ride = JSON.parse(value);
    ride.id = id;

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.classList.add("itemElement");
    rideListElement.appendChild(itemElement);

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const mapID = `map${ride.id}`;
    const mapElement = document.createElement("div");
    mapElement.id = mapID;
    mapElement.classList.add("map");


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

    itemElement.addEventListener("click", () => {
        window.location.href = `./detail.html?id=${ride.id}`;
    });

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);
    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);


    const map = L.map(mapID, 
        {zoomControl: false, 
        dragging: false, 
        attributionControl: false,
    scrollWheelZoom: false});
    map.setView([firstPosition.latitude, firstPosition.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
	maxZoom: 20,
	//attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);
});