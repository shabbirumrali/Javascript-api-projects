const btn = document.getElementById('btn');

function getData(image64) {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
    
            // console.log(position);
            const data = { lat, lon, image64 };

            const options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
    
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log("server data", json);
    
            document.getElementById('latitude').textContent = json.lat;
            document.getElementById('longitude').textContent = json.lon;
            document.getElementById('status').textContent = json.status;
        });
    } else {
        console.log('location not available');
    }
}
function setup() {
    // noCanvas();
    // const video = createCapture(VIDEO);
    // video.size(320, 240);
    btn.addEventListener('click', (event) => {
        // video.loadPixels();
        // const image64 = video.canvas.toDataURL();
        // getData(image64);
        getData();
    })
}