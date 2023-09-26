const btn = document.getElementById('csv-btn');

btn.addEventListener('click', () => {
    chartIt();
})

const getData = async () => {
    const res = await fetch('../data/SH.Ts+dSST.csv');
    const text = await res.text();
    const table = text.split('\n').slice(1);

    let xs = [];
    let ys = [];
    table.forEach((row) => {
        let columns = row.split(',');
        let year = columns[0];
        let temp = columns[1];
        
        xs.push(year);
        ys.push(parseFloat(temp) + 1);
    })
    return { xs, ys };
}
const fetchData = async () => {
    const res = await fetch('../data/ZonAnn.Ts+dSST.csv');
    const text = await res.text();

    let xyears = [];
    let ytemp = [];

    const table = text.split('\n').slice(1);
    table.forEach((row) => {
        let columns = row.split(',');
        let year = columns[0];
        let temp = columns[1];
        xyears.push(year);
        ytemp.push(parseFloat(temp) + 1);
    });
    return {xyears, ytemp}; 
}

// Chart JS
const chartIt = async () => {
    const { xs, ys } = await getData();
    const {xyears, ytemp} = await fetchData();
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: xyears,
        datasets: [{
            label: 'GISS Surface Temperature Analysis',
            data: ytemp,
            borderWidth: 1,
            fill: false
        },
        {
            label: 'GISS Surface Temperature Analysis',
            data: ys,
            borderWidth: 1,
            fill: false
        }]
        },
    });
}