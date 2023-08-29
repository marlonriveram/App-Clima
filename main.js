const city = (name) =>`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es`;
const datosActuales = (lat,lon) =>`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric`;
const datosHora = (lat,lon) => `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric&cnt=5`;
const urlIconClima = (codigo) => `https://openweathermap.org/img/wn/${codigo}@2x.png`

const inputCity = document.getElementById('city');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const condicionClima = document.querySelector('.condicion-climatica');
const temperatura = document.querySelector('.numero-tem-actual');
const velocidaViento = document.querySelector('.velocidad-viento');
const humedad = document.querySelector('.humedad');
const visibilidad = document.querySelector('.visibilidad');
const presionAire = document.querySelector('.presion-de-aire');
const iconTem = document.querySelector('.img')
const containerClima3h = document.querySelector('.otros-datos-climaticos-clima-3h');
const containerDatosClima3hCartas = document.querySelector('.datos-clima-3h-cartas ');

function pintarCartasClima3h (arreglo) {

arreglo.forEach(lista => {
    const datosClima3hCartas = document.createElement('div');
    const fecha = document.createElement('p');
    const contianerIconClima = document.createElement('figure');
    const iconClima = document.createElement('img');
    const containerTempGrados = document.createElement('div')
    const temperatura3h = document.createElement('span');
    const gradosCelcius = document.createElement('span');
     
    datosClima3hCartas.classList.add('datos-clima-3h-cartas','color_carta','tamaño_carta_clima_3h');
    fecha.classList.add('fecha');
    contianerIconClima.classList.add('container-icon-clima');
    iconClima.classList.add('icon-clima');
    temperatura3h.classList.add('icon-clima');
    
    gradosCelcius.innerText = '°C' 
    temperatura3h.innerText = Math.round(lista.main.temp);
    containerTempGrados.append(temperatura3h,gradosCelcius)
    iconClima.src = urlIconClima (lista.weather[0].icon);
    contianerIconClima.append(iconClima);
    fecha.innerText = lista.dt_txt;
    datosClima3hCartas .append(fecha,contianerIconClima,containerTempGrados);
    containerClima3h.append(datosClima3hCartas);

    console.log('fehca :',fecha)

});




}
async function pronosticoActual (lat,lon){
    const res = await fetch(datosActuales(lat,lon));
    const data = await res.json();
    const icon = urlIconClima(data.weather[0].icon);
    console.log('Pronostico Actual:',data)

    condicionClima.innerText = '';
    temperatura.innerText = '';
    velocidaViento.innerText = '';
    humedad.innerText = '';
    visibilidad.innerText = '';
    presionAire.innerText = '';
    iconTem.src = '';
    condicionClima.innerText = data.weather[0].main;
    temperatura.innerText = Math.round(data.main.temp);
    velocidaViento.innerText = data.wind.speed;
    humedad.innerText = data.main.humidity;
    visibilidad.innerText = data.visibility;
    presionAire.innerText = data.main.pressure;
    iconTem.src = icon;
    

    // icon (data.weather[0].icon);

    console.log(icon)
};
async function pronosticoHora (lat,lon){
    const res = await fetch(datosHora(lat,lon));
    const data = await res.json();
    console.log('pronostico hora :' ,data.list)

    pintarCartasClima3h (data.list);
    // var timestamp = data.list[dia].dt;  // Ejemplo de un timestamp en tiempo Unix
    // var dateObject = new Date(timestamp * 1000);  // JavaScript usa milisegundos
    // console.log(dateObject.toLocaleString());  // convertir a una cadena legible
};



async function ciudades (name){   // cosumo api de geolocalizacion
    const res = await fetch(city(name));
    const data = await res.json();
   
    // if(data.length == 0 ){
    //     console.log('ciudad no valida');
    // }

    // lat.innerText = '';
    // lon.innerText = '';
    // lat.innerText=data[0].lat;
    // lon.innerText=data[0].lon;
    pronosticoActual (data[0].lat,data[0].lon);
    pronosticoHora (data[0].lat,data[0].lon)
    
    console.log('Ciudad :',data[0].name);
};

// Detecta cuando dentro del input se preciona  Enter
// inputCity.addEventListener('keydown',(event) =>{
//     if (event.key === 'Enter') {         // Detectar si se preciono enter
//         event.preventDefault();          // Evita que al priconar enter se mande el formulario
//         inputCity.blur();               // quita el foco del input
//         ciudades(event.target.value);
        
//     }
// });

ciudades('medellin');


//  pronosticoHora();
