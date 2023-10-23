
//Catch geolocation
async function getCurrentLatitude(){
    return new Promise ((resolve, reject)=>{
        const location = navigator.geolocation.getCurrentPosition(function(position) {
          resolve (position.coords.latitude);
        });

    })
}

async function getCurrentLongitude(){
    return new Promise ((resolve, reject)=>{
        const location = navigator.geolocation.getCurrentPosition(function(position) {
          resolve (position.coords.longitude);
        });

    })
}



  //fetch de datos tiempo

  async function getRawDataFromApi() {
    try {
        const latitude = await getCurrentLatitude();
        const longitude = await getCurrentLongitude();
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`)
        const weatherData = await response.json()
        return weatherData;
    } catch(error){
        console.log(error);
    }
}

async function getRawDataFromApi2() {
  try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/Any?lang=es`)
      const jokeData = await response.json()
      return jokeData;
  } catch(error){
      console.log(error);
  }
}


document.addEventListener("DOMContentLoaded", function() {
  //----------------------CHECKBOX--------------------
  //Escucha los cambios en los checkbox y guárdalos en LocalStorage
  const tempCheckbox = document.getElementById("tempCheckbox");
  tempCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarTemperatura", tempCheckbox.checked);
    mostrarValores();
  });
  
  
  const windCheckbox = document.getElementById("windCheckbox");
  windCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarViento", windCheckbox.checked);
    mostrarValores();
  });
  
  const rainCheckbox = document.getElementById("rainCheckbox");
  rainCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarLluvia", rainCheckbox.checked);
    mostrarValores();
  });
  
  const uvCheckbox = document.getElementById("uvCheckbox");
  uvCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarUv", uvCheckbox.checked);
    mostrarValores();
  });

  const vestimentaCheckbox = document.getElementById("vestimentaCheckbox");
  vestimentaCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarVestimenta", vestimentaCheckbox.checked);
    mostrarValores();
  });
  
  const weatherWeekCheckbox = document.getElementById("weatherWeekCheckbox");
  weatherWeekCheckbox.addEventListener("change", function () {
    localStorage.setItem("mostrarweatherWeek", weatherWeekCheckbox.checked);
    mostrarValores();
  });
  
  // Carga los valores de los checkbox desde LocalStorage al cargar la página
  tempCheckbox.checked = localStorage.getItem("mostrarTemperatura") === "true";
  windCheckbox.checked = localStorage.getItem("mostrarViento") === "true";
  rainCheckbox.checked = localStorage.getItem("mostrarLluvia") === "true";
  uvCheckbox.checked = localStorage.getItem("mostrarUv") === "true";
  vestimentaCheckbox.checked = localStorage.getItem("mostrarVestimenta") === "true";
  weatherWeekCheckbox.checked = localStorage.getItem("mostrarweatherWeek") === "true";

  // Función para mostrar u ocultar los valores según los checkbox
  function mostrarValores() {
    const mostrarTemperatura = tempCheckbox.checked;
    const mostrarViento = windCheckbox.checked;
    const mostrarLluvia = rainCheckbox.checked;
    const mostrarUv = uvCheckbox.checked;
    const mostrarVestimenta = vestimentaCheckbox.checked;
    const mostrarweatherWeek = weatherWeekCheckbox.checked;
  
    const tempMax = document.getElementById("tempMax")
    const tempMin = document.getElementById("tempMin")
    const wind = document.getElementById("wind")
    const rain = document.getElementById("rain")
    const uv = document.getElementById("uv")
    const vestimenta = document.getElementById("vestimentaSec")
    const weatherWeek = document.getElementById("weatherWeekSec")
    const weatherToday = document.getElementById("weatherSec")
  
    if (mostrarTemperatura) {
      tempMax.style.display= "block";
      tempMin.style.display= "block";
    } else {
      tempMax.style.display= "none";
      tempMin.style.display= "none";
    }
  
    if (mostrarViento) {
      wind.style.display= "block";
    } else {
      wind.style.display= "none";
    }
    
    if (mostrarLluvia) {
      rain.style.display= "block";
    } else {
      rain.style.display= "none";
    }
    
    if (mostrarUv) {   
      uv.style.display= "block";
    } else {
      uv.style.display= "none";
    }

    if (mostrarVestimenta) {
      vestimenta.style.display= "block";
      vestimenta.style.width="50%"
      weatherToday.style.width="50%"

    } else {
      vestimenta.style.display= "none";
      weatherToday.style.width="100%";
    }

    if (mostrarweatherWeek) {
      weatherWeek.style.display= "flex";
      weatherWeek.style.flexDirection= "row";
      weatherWeek.style.justifyContent= "space-around";;
    } else {
      weatherWeek.style.display= "none";
    }
  }
  
  mostrarValores();
  
});




//------------------------WEB BETE TXISTEA-------------------------
async function createJoke(){
  const allData= await getRawDataFromApi2();
  if (allData.joke){
    const chisteRandomSingle = allData.joke;
    const printJoke=document.createElement("h4")
    printJoke.textContent=chisteRandomSingle;
    const articleJoke = document.createElement("article");
    articleJoke.id = "articleJoke";
    const jokeSec = document.getElementById("joke");
    jokeSec.appendChild(articleJoke);
    articleJoke.appendChild(printJoke)
  } else {
    const chisteRandomPart1 = allData.setup;
    const chisteRandomPart2 = allData.delivery;
    const printJoke=document.createElement("h4")
    printJoke.textContent=`${chisteRandomPart1}   ${chisteRandomPart2}`;
    const articleJoke = document.createElement("article");
    articleJoke.id = "articleJoke";
    const jokeSec = document.getElementById("joke");
    jokeSec.appendChild(articleJoke);
    articleJoke.appendChild(printJoke)
  }

}
createJoke();

//------------------------WEB BETE EGURALDIA-------------------------

async function createWeatherToday(){
    const allData= await getRawDataFromApi();
    console.log(allData);
    console.log(allData.daily.time)
    //--------------------------------------------------------
        const weathercode = allData.daily.weathercode;
        const tempMax = allData.daily.temperature_2m_max;
        const tempMin = allData.daily.temperature_2m_min;
        const uV = allData.daily.uv_index_max;
        const wind = allData.daily.windspeed_10m_max;
        const rain = allData.daily.precipitation_probability_max;
    //--------------------------------------------------------
        const articleWeather = document.createElement("article");
        articleWeather.id = "weatherSec";
        const weatherToday = document.getElementById("weatherToday");
        weatherToday.appendChild(articleWeather);
	//----------------------DATE--------------------------------
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const fecha = `${diasSemana[new Date().getDay()]} ${new Date().getDate()}`;
      printDate = document.createElement("h2");
      printDate.textContent = fecha;
      articleWeather.appendChild(printDate);
    //----------------------IMG--------------------------------
    	const printWeathercode = document.createElement("img");
      printWeathercode.src  = `./assets/img/onak/${weathercode[0]}.png`;
      printWeathercode.id = "wheatherCode";
      articleWeather.appendChild(printWeathercode);
	//----------------------RAIN--------------------------------
      const printRain = document.createElement("p");
      printRain.textContent = `🌧 Probabilidad de lluvia ${rain[0]}%`
      printRain.id = "rain";
      articleWeather.appendChild(printRain);
	//----------------------TEMPERATURA MAX-MIN--------------------------------
      const printTempMax = document.createElement("p");
      const printTempMin = document.createElement("p");
      printTempMax.id="tempMax";
      printTempMin.id="tempMin";
      printTempMax.textContent = `🌡 La temperatura maxima es de: ${tempMax[0]}°C`;
		  printTempMin.textContent = `🌡 La temperatura minima es de: ${tempMin[0]}°C`;
      articleWeather.appendChild(printTempMax);
		  articleWeather.appendChild(printTempMin);
	//----------------------WIND--------------------------------
      const printWind = document.createElement("p");
      printWind.textContent = `🌬 El viento será de ${wind[0]} km/h`;
      printWind.id = "wind";
      articleWeather.appendChild(printWind);
	//----------------------UV--------------------------------
		  const printUV = document.createElement("p");
      printUV.id="uv";
      printUV.textContent = `🕶 El indice de rayos UV es ${uV[0]}`;
      articleWeather.appendChild(printUV);

      
      
      //--------------------ARROPA--------------------------------------
     
/*         function sugerirVestimenta(weathercode) {
          console.log(`Esta es la mierda q no sale${weathercode}`)
        if (weathercode===0) {
          return "Te vas a asar. La crema bronceadora ha pasado de moda. Date aceite en todo el cuerpo y traje de Borat para ir lo más fresco posible";
        } else if (weathercode<4 && weathercode>0) {
          return "La ropa recomendada para hoy es: Ropa ligera, chaqueta ligera, sombrero, gafas de sol, protector solar.";
        } else if (weathercode<49 && weathercode>44) {
          return "La ropa recomendada para hoy es: Ropa ligera, impermeable, calzado impermeable, protector solar.";
        } else if (weathercode<56 && weathercode>50-) {
          return "La ropa recomendada para hoy es: Ropa en capas, chaqueta resistente al viento, gorra, gafas de sol, protector solar.";
        } else if (weathercode<58 && weathercode>55) {
          return "La ropa recomendada para hoy es: Ropa en capas, impermeable, calzado impermeable, bufanda, guantes, protector solar si es necesario.";
        } else if (weathercode<66 && weathercode>60) {
          return "La ropa recomendada para hoy es: Ropa abrigada, bufanda, guantes, protector solar si es necesario.";
        } else if (weathercode<68 && weathercode>65) {
          return "La ropa recomendada para hoy es: Ropa abrigada en capas, chaqueta resistente al viento, bufanda, guantes, protector solar.";
        } else if (weathercode<76 && weathercode>70) {
          return "La ropa recomendada para hoy es: Ropa abrigada, gafas de sol, protector solar.";
        } else if (weathercode===77) {
          return "Va a hacer frio de cojones y además va a llover. Ponte el traje de neopreno y sal a la calle sin miedo a que te mojes.";
        } else if (weathercode<83 && weathercode>79) {
          return "Va a hacer frio de cojones y además va a llover. Ponte el traje de neopreno y sal a la calle sin miedo a que te mojes.";
        } else if (weathercode<87 && weathercode>84) {
          return "Va a hacer frio de cojones y además va a llover. Ponte el traje de neopreno y sal a la calle sin miedo a que te mojes.";
        } else {
          return "Lo mejor que puedes hacer es no quitarte el pijama y picar código, pero si es imprescindible salir, no te olvides el traje de fregona, por lo menos vas a alegrar el día a algun@";
        }
      } */


        const respuestas =[
            {
                values : [0],
                response: "Te vas a asar. La crema bronceadora ha pasado de moda. Date aceite en todo el cuerpo y traje de Borat para ir lo más fresco posible",
                img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
                values: [1,2,3],
                response: "Mainly clear, partly cloudy, and overcast",
                img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
              values: [45,48],
              response: "Hoy es un buen día para ligar. Parece que va a haber niebla, por lo que si no eres muy agraciado es tu día! Ponte ropa de gala y a gozarla!",
              img: "./assets/img/vestimenta/traje.png"
            },
            {
            values: [51,53,55],
            response: "Txiri-miri si? Txiri-miri no? lo mejor hoy ponerte lo que quieras y salir con el sombrero-paraguas por si hay imprevistos",
            img: "./assets/img/vestimenta/paraguasCabeza.jpg"
            },
            {
              values: [56,57],
              response: "Hoy toca txiri-miri de mierda. No vas a acertar en la vestimenta porque es imposible. Por eso hoy toca algo infalible, traje guardia civil. La gorra sin molestar mucho protege de la lluvia y la ropa si no calienta lo necesario igual te dan de ostias por la calle, por lo que caliente vas a llegar seguro",
              img: "./assets/img/vestimenta/guardiaCivil.avif"
            },
            {
              values: [61,63,65],
              response: "Rain",
              img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
              values: [66,67],
              response: "Freezing Rain",
              img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
              values: [71,73,75],
              response: "Snow fall",
              img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
              values: [77],
              response: "Snow grains",
              img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
            values: [80,81,82],
            response: "Rain showers",
            img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
            values: [85,86],
            response: "Snow showers",
            img: "./assets/img/vestimenta/Borat.jpg"
            },
            {
            values: [95,96,99],
            response: "Lo mejor que puedes hacer es no quitarte el pijama y picar código, pero si es imprescindible salir, no te olvides el traje de fregona, por lo menos vas a alegrar el día a algun@",
            img: "./assets/img/vestimenta/Borat.jpg"
            }
        ];

        function devuelveVestimenta(valor){
            for(element of respuestas){
                if(element.values.includes(valor)){
                    return element.response
                }
            }
            return "no debería";
        }

        function devuelveVestimentaImg(valor){
          for(element of respuestas){
              if(element.values.includes(valor)){
                  return element.img
              }
          }
          return "no debería";
      }
      
  
      const vestimentaRecomendada = devuelveVestimenta(weathercode[0]);
      const vestimentaSec = document.createElement("article")
      vestimentaSec.id = "vestimentaSec"
      weatherToday.appendChild(vestimentaSec)
      const vestimentaTitle = document.createElement("h2")
      vestimentaTitle.textContent= "🕴 Vestimenta TODAY 🩱"
      vestimentaSec.appendChild(vestimentaTitle);
      const vestimentaImg=document.createElement("img");
      vestimentaImg.src=`${devuelveVestimentaImg(weathercode[0])}`;
      vestimentaImg.id="vestimentaImg";
      vestimentaSec.appendChild(vestimentaImg);
      const printVestimenta = document.createElement("h4");
      printVestimenta.textContent = vestimentaRecomendada;
      vestimentaSec.appendChild(printVestimenta);
    };
    createWeatherToday();


    async function createWeatherWeek(){
      const allData= await getRawDataFromApi();

      const articleWeather = document.createElement("article");
      articleWeather.id = "weatherWeekSec";
      const weatherList = document.getElementById("weatherList");
      weatherList.appendChild(articleWeather);


      for (let i = 1; i < 7; i++) {
        console.log(i);
        const articleDay = document.createElement("article")
        articleWeather.appendChild(articleDay);
        //--------------------------------------------------------
            const weathercode = allData.daily.weathercode[i];
            const tempMax = allData.daily.temperature_2m_max[i];
            const tempMin = allData.daily.temperature_2m_min[i];
            const uV = allData.daily.uv_index_max[i];
            const wind = allData.daily.windspeed_10m_max[i];
            const rain = allData.daily.precipitation_probability_max[i];

      //----------------------DATE--------------------------------
          const diasSemana = ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb.", "Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."];
          const fechaHoy = new Date();
          const fecha = `${diasSemana[fechaHoy.getDay()+i]} ${fechaHoy.getDate() +i}`;
          printDate = document.createElement("h2");
          printDate.textContent = fecha;
          articleDay.appendChild(printDate);
          console.log(diasSemana[(fechaHoy.getDay()) +i])
          console.log(fechaHoy.getDay() +i)
        //----------------------IMG--------------------------------
          const printWeathercode = document.createElement("img");
          printWeathercode.src  = `./assets/img/onak/${weathercode}.png`;
          printWeathercode.id = "wheatherCode";
          articleDay.appendChild(printWeathercode);
      //----------------------RAIN--------------------------------
          const printRain = document.createElement("p");
          printRain.textContent = `🌧 Prob. lluvia ${rain}%`
          printRain.id = "rain";
          articleDay.appendChild(printRain);
      //----------------------TEMPERATURA MAX-MIN--------------------------------
          const printTempMax = document.createElement("p");
          const printTempMin = document.createElement("p");
          const maxImg = "./assets/tempMax.png";
          printTempMax.textContent = `🌡Temp. Max: ${tempMax}°C`;
          printTempMin.textContent = `🌡Temp. Min: ${tempMin}°C`;
          articleDay.appendChild(printTempMax);
          articleDay.appendChild(printTempMin);
      //----------------------WIND--------------------------------
          const printWind = document.createElement("p");
          printWind.textContent = `🌬 Viento: ${wind} km/h`;
          printWind.id = "wind";
          articleDay.appendChild(printWind);
        
        
      }
    }

    createWeatherWeek();