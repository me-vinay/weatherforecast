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
            getWeatherData(country)
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
            getWeatherData(state)
            document.getElementById('loading').style.display = 'none';
        }
    })()
}

function onCitySelect(){
    let city = document.getElementById('citySelect').value;
    const data = getWeatherData(city)
    console.log(data);
}

async function getCordinates(areaname){
    const url = "http://api.weatherstack.com/current?access_key=deabd5d593da3bd178b885646de2d906&query=New York";
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
                    console.log(response);
   // getWeatherData(response);
}


//https://geocode.maps.co/search?q={noida} api to get lat and long
//api weather https://api.open-meteo.com/v1/for ecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m
//deabd5d593da3bd178b885646de2d906
////api.weatherstack.com/current?access_key=deabd5d593da3bd178b885646de2d906&query=New York

function getWeatherData(data){
    // const lat = Math.round(data[0].lat);
    // const lon = Math.round(data[0].lon);
    const url = "http://api.weatherstack.com/current?access_key=deabd5d593da3bd178b885646de2d906&query="+data;
    ;(async function(){
        //const url = "https://api.open-meteo.com/v1/forecast?latitude="+lon+"&longitude="+lat+"&current_weather=true";

        response = await fetch(url)
                    .then(res=>{return res.json()})
                    .then(res=>{return res})
                    .catch(err=>{console.log(err)})
        console.log(response)
        document.querySelector('.city-info').innerText = (response.location.name);
        document.querySelector('.temprature-reading').innerText = (response.current.temperature);
        document.querySelector(".wind-direction").innerHTML = "wind direction: "+response.current.wind_dir
        document.querySelector(".wind-speed").innerHTML = "wind speed: "+response.current.wind_speed
        document.querySelector(".area-info").style.display = "block"
    })()
}

function searchByInput(obj){
    let searchCity = document.querySelector('.search-by-area').value;
    getWeatherData(searchCity)
}
getCountryName();
