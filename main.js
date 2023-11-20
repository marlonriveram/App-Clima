const city = (name) =>`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es`;
const datosActuales = (lat,lon) =>`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric`;
const datosHora = (lat,lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6d38995b3a17ddfebcd1527c2a264c29&lang=es&units=metric&cnt=5`;
const urlIconClima = (codigo) => `https://openweathermap.org/img/wn/${codigo}@2x.png`;

const inputCity = document.querySelector('.ciudad');
const btnBuscar = document.querySelector('.btn-buscar');
const btnBuscarPais = document.querySelector('.btn-buscar-pais');
const cerrar = document.querySelector('.close');
const containerCambiarPais = document.querySelector('.container-cambiar-pais');
const lat = document.getElementById('valor-lat');
const lon = document.getElementById('valor-lon');
const condicionClima = document.querySelector('.condicion-climatica');
const temperatura = document.querySelector('.numero-tem-actual');
const velocidaViento = document.querySelector('.velocidad-viento');
const humedad = document.querySelector('.humedad');
const visibilidad = document.querySelector('.visibilidad');
const presionAire = document.querySelector('.presion-de-aire');
const iconTem = document.querySelector('.img')
const containerClima3h = document.querySelector('.otros-datos-climaticos-clima-3h');
const containerDatosClima3hCartas = document.querySelector('.datos-clima-3h-cartas ');
const localizacionCiudad = document.querySelector('.localizacion-ciudad');

//pinta las cartas del clima que muestra la condicion climatica cada tres horas
function pintarCartasClima3h (arreglo) {

    containerClima3h.innerText = " ";
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

});

};
// muestra la temperatura actual del pais seleccionado
async function pronosticoActual (lat,lon){
    const res = await fetch(datosActuales(lat,lon));
    const data = await res.json();
    const icon = urlIconClima(data.weather[0].icon);

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
    
};

// muestra la temperatura actual cada cada tres horas (por defecto muestra 5 temperaturas en lapsos de 3h cada una)
async function pronosticoHora (lat,lon){
    const res = await fetch(datosHora(lat,lon));
    const data = await res.json();

    pintarCartasClima3h (data.list);
    // var timestamp = data.list[dia].dt;  // Ejemplo de un timestamp en tiempo Unix
    // var dateObject = new Date(timestamp * 1000);  // JavaScript usa milisegundos
    // console.log(dateObject.toLocaleString());  // convertir a una cadena legible
};
// escribo el nombre de la ciudad y me devuelve la latitud y longitud de dicha ciudad
async function ciudades (name){   // cosumo api de geolocalizacion
    const res = await fetch(city(name));
    const data = await res.json();
   
    // if(data.length == 0 ){
    //     console.log('ciudad no valida');
    // }

    lat.innerText = '';
    lon.innerText = '';
    localizacionCiudad.innerText = " ";
    lat.innerText = data[0].lat;
    lon.innerText = data[0].lon;
    localizacionCiudad.innerText = data[0].name;
    pronosticoActual (data[0].lat,data[0].lon);
    pronosticoHora (data[0].lat,data[0].lon)
    
  
    console.log(data)
    // console.log('lat:',lat, 'lon:',lon)
};

function showAside (){
    containerCambiarPais.classList.add('show');
};

function closeAside (){
    containerCambiarPais.classList.remove('show');
};

function manejadorEvenetos (event){
  if(event.type === 'keydown'){
    if (event.key === 'Enter') {         // Detectar si se preciono enter
        event.preventDefault();          // Evita que al priconar enter se mande el formulario
        inputCity.blur();
        console.log(event)               // quita el foco del input
        ciudades(event.target.value);
        closeAside()
    }
  };

  if(event.type === 'click'){
    event.preventDefault();          // Evita que al priconar enter se mande el formulario
    inputCity.blur();
    console.log(event)               // quita el foco del input
    ciudades(inputCity.value);
    closeAside()
  }

 
}

//Mostrar aside
btnBuscar.addEventListener('click',showAside);

// Cerrar aside
cerrar.addEventListener('click',closeAside);


// Detecta cuando dentro del input se preciona  Enter
inputCity.addEventListener('keydown',manejadorEvenetos);
btnBuscarPais.addEventListener('click',manejadorEvenetos);
// Detecta cuando dentro le da click al boton buscar



ciudades('medellin')
