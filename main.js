const city = (name) =>`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es`;
const datosActuales = (lat,lon) =>`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric`;
const datosDia = (lat,lon) => `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric`

const inputCity = document.getElementById('city');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const clima = document.getElementById('clima');
const temperatura = document.getElementById('temperatura');

async function pronosticoActual (){
    const res = await fetch(datosActuales(lat,lon));
    const data = await res.json();
   console.log(data)

   clima.innerText = '';
   temperatura.innerText = '';
   clima.innerText = data.weather[0].main;
   temperatura.innerText = data.main.temp;
};
async function pronosticoDia (){
    const res = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=6d38995b3a17ddfebcd1527c2a264c29&units=metric');
    const data = await res.json();
    console.log(data)

    
    for (let dia   in data.list){
    
        var timestamp = data.list[dia].dt;  // Ejemplo de un timestamp en tiempo Unix
        var dateObject = new Date(timestamp * 1000);  // JavaScript usa milisegundos
    
    console.log(dateObject.toLocaleString());  // convertir a una cadena legible
        
    }
   




}

async function ciudades (name){   // cosumo api de geolocalizacion
    const res = await fetch(city(name));
    const data = await res.json();
   
    if(data.length == 0 ){
        console.log('ciudad no valida');
    }

    lat.innerText = '';
    lon.innerText = '';
    lat.innerText=data[0].lat;
    lon.innerText=data[0].lon;
    pronosticoActual (data[0].lat,data[0].lon);
};

// Detecta cuando dentro del input se preciona  Enter
inputCity.addEventListener('keydown',(event) =>{
    if (event.key === 'Enter') {         // Detectar si se preciono enter
        event.preventDefault();          // Evita que al priconar enter se mande el formulario
        inputCity.blur();               // quita el foco del input
        ciudades(event.target.value);
        
    }
});



// pronosticoActual(33.44,-94.04);
 pronosticoDia();