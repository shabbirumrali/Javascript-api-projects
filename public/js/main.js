const btn = document.getElementById('btn');

function getData() {
    if('geolocation' in navigator) {
        console.log('location available', navigator)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
    
            // console.log(position);
            const data = { lat, lon };
    
            const response = await fetch('/api', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            console.log("server data", json)
    
            document.getElementById('latitude').textContent = json.lat;
            document.getElementById('longitude').textContent = json.lon;
            document.getElementById('status').textContent = json.status;
        })
    } else {
        console.log('location not available')
    }
}

btn.addEventListener('click', () => {
    getData();
})