function getCountryName(){
    console.log('fetching country data...')
    ;(async function() {
        const url = 'https://restcountries.com/v3.1/all';
        response = await fetch(url)
                .then(res => {
                        if(res.ok){
                            return res.json();
                        }else{
                            alert("server down.")
                            return 0;
                        }
                })
                .then(res => {
                    return res;
                })
                .catch((err)=>console.log(err))  
        console.log(response)
        if(response !== 0){
            for(country in response){
                let optionName = response[country].name.common;
                // console.log(optionName);
                //let optionVal = response[country].cca3;
                // console.log(optionVal);
                let newOption = new Option(optionName, optionName);
                const select = document.getElementById('countrySelect'); 
                select.add(newOption,undefined);
                document.getElementById('loading').style.display = 'none';
                console.log('country data fetched successfully...')
            }       
        }
    })()    
}
//https://documenter.getpostman.com/view/1134062/T1LJjU52#7255f1cc-b52d-41b3-b5a4-b1197db619b5 api doc
function getStates(obj){  
    document.getElementById('loading').style.display = 'block';
    ;(async function(){
        let country = obj.value;
        document.getElementById("stateSelect").options.length=1;
        var headers = new Headers();
        headers.append("X-Powered-By", "Express");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Headers", "*");
        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", "1603");
        headers.append("ETag", 'W/"643-K3YS4WMINUtkPWnzM2utdIFgdIg"');
        headers.append("Date", "Wed, 16 Sep 2020 08:03:22 GMT");
        headers.append("Connection", "keep-alive");

        var requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "country": country
        })
        };
        const url = "https://countriesnow.space/api/v0.1/countries/states";

        response = await fetch(url, requestOptions)
        .then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    console.log(res)
                }
        })
        .then(result => {return result})
        .catch(error => console.log('error', error));
      
        let statesData = response.data.states;
        const select = document.getElementById('stateSelect')
        if(statesData.length >0){
            for(states in statesData){
                let optionName = statesData[states].name;
            // console.log(optionName);
                //let optionVal = response[country].cca3;
                // console.log(optionVal);
                let newOption = new Option(optionName, optionName);
                select.style.display = "block";
                select.add(newOption,undefined);
                document.getElementById('loading').style.display = 'none';
                // console.log('country data fetched successfully...')
            }
        }else{
            select.style.display = "none";
            document.getElementById('citySelect').style.display="none";
            getCordinates(country)
            document.getElementById('loading').style.display = 'none';
        }    
    })()
}
function getCities(obj){
    ;(async function(){
        const state = obj.value;
        document.getElementById('loading').style.display = 'block';
        let country = document.getElementById('countrySelect').value;
       // console.log(country.value);
        const url = "https://countriesnow.space/api/v0.1/countries/state/cities";
        var headers = new Headers();
        headers.append("X-Powered-By", "Express");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Headers", "*");
        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", "157");
        headers.append("ETag", 'W/"9d-laheLqB06/2L4F8Bwm6wiZQbEaE"');
        headers.append("Date", "Sun, 30 May 2021 00:07:39 GMT");
        headers.append("Connection", "keep-alive");

        var requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "country": country,
            "state": state
        })
        };

        response = await fetch(url, requestOptions)
                    .then(res=>{
                        if(res.ok){
                            console.log("city api processed successfully.")
                            return res.json();
                        }else{
                            console.log("cities api failed.");
                        }
                    })
                    .then(res =>{
                            return res;
                    })
                    .catch(err => {
                        console.log(err)
                    })
        //console.log(response);
        let cities = response.data;
        const selectCity = document.getElementById('citySelect'); 
        //console.log(response); 
        if( response.data.length > 0){ 
            for(city in cities){
                let cityName = cities[city];
            // console.log(optionName);
                //let optionVal = response[country].cca3;
                // console.log(optionVal);
                let newOption = new Option(cityName, cityName);
                selectCity.style.display='block';
                selectCity.add(newOption,undefined);
                document.getElementById('loading').style.display = 'none';
                // console.log('country data fetched successfully...')
            }    
        }else{
            selectCity.style.display='none';
            getCordinates(state)
            document.getElementById('loading').style.display = 'none';
        }
    })()
}

function onCitySelect(){
    let city = document.getElementById('citySelect').value;
    const data = getCordinates(city)
    console.log(data);
}

async function getCordinates(areaname){
    const url = "https://geocode.maps.co/search?q={"+areaname+"}";
    response = await fetch(url)
                    .then(res=>{
                        if(res.ok){
                            console.log("city api processed successfully.")
                            return res.json();
                        }else{
                            console.log("cities api failed.");
                        }
                    })
                    .then(res =>{
                            return res;
                    })
                    .catch(err => {
                        console.log(err)
                    })
    getWeatherData(response);
}


//https://geocode.maps.co/search?q={noida} api to get lat and long
//api weather https://api.open-meteo.com/v1/for ecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

function getWeatherData(data){
    const lat = (Math.round(data[0].lat * 100) / 100).toFixed(2);
    const lon =(Math.round(data[0].lon * 100) / 100).toFixed(2);
    console.log(lat+"  "+lon)
    ;(async function(){
        const url = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

        response = await fetch(url)
                    .then(res=>{return res.json()})
                    .then(res=>{return res})
                    .catch(err=>{console.log(err)})
        console.log(response)
        document.querySelector('.city-info').innerText = (data[0].display_name);
        document.querySelector('.temprature-reading').innerText = (response.current_weather.temperature);
        document.querySelector(".wind-direction").innerHTML = "wind direction: "+response.current_weather.winddirection
        document.querySelector(".wind-speed").innerHTML = "wind speed: "+response.current_weather.windspeed
        document.querySelector(".area-info").style.display = "block"
        let weatherinfo = document.querySelector(".weather-info");
        let isDay = response.current_weather.is_day;
        // console.log(isDay)
        let img = document.querySelector('.is-day');
        if( isDay == 0){
            img.src="./images/moon.png";
            weatherinfo.style.background="#00000070";
            weatherinfo.style.color="#fff";
        }else{
            img.src="./images/sun.png";
            weatherinfo.style.background="rgb(153 143 115 / 44%)";
            weatherinfo.style.color="#fff";
        }
        

    })()
}

function searchByInput(obj){
    let searchCity = document.querySelector('.search-by-area').value;
    getCordinates(searchCity)
}

getCountryName();
