const btn = document.querySelector('#btn_data');
const div = document.getElementById('append_data');

btn.addEventListener('click', () => {
    fetchData();
    fetchWeather();
})

async function fetchData() {
    const response = await fetch('/api');
    const json = await response.json();

    console.log(json);
    for(item of json) {
        const p = document.createElement('p')
        const loc = document.createElement('span');
        loc.textContent = `location: ${item.lat}, ${item.lon}`;
        
        const timeString = new Date(item.timestamp).toLocaleString();
        const date = document.createElement('span');
        date.textContent = timeString;

        const image = document.createElement('img');
        image.src = item.image64;

        p.append(loc, date);
        div.append(p);
    }
}
async function fetchWeather() {
    const response = await fetch('/weather');
    const json = await response.json();
    console.log("weather data", json);
} 