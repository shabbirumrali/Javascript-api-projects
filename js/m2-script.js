const mymap = L.map('issMap').setView([51.505, -0.09], 1);
const issIcon = L.icon({
    iconUrl: '../image/iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
});

const marker = L.marker([0, 0], {icon: issIcon }).addTo(mymap);

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tile_url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tile_url, { attribution });
      tiles.addTo(mymap);

function getData() {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { latitude, longitude } = data;
            marker.setLatLng([latitude, longitude])
            mymap.setView([latitude, longitude], 2)
            
        })
        .catch(err => console.log(err.message));
}
setInterval(getData, 1000);