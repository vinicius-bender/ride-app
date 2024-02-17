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

    const mapElement = document.createElement("div");
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
        window.location.href = "./detail.html";
    });

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);
    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);
});