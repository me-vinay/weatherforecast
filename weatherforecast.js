function getCountryName(){
    console.log('fetching country data...')
    ;(async function() {
        const url = 'https://restcountries.com/v3.1/all';
        response = await fetch(url)
                .then(res => {
                        if(res.ok){
                             document.getElementById('loading').style.display = 'none';
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
        //console.log(response)
        if(response !== 0){
            for(country in response){
                let optionName = response[country].name.common;
                // console.log(optionName);
                let optionVal = response[country].cca3;
                // console.log(optionVal);
                let newOption = new Option(optionName, optionVal);
                const select = document.getElementById('countrySelect'); 
                select.add(newOption,undefined);
                console.log('country data fetched successfully...')
            }       
        }
        
    })()    
}

function getStates(code){  

    ;(async function(){
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "API_KEY");

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };
        const url = "https://api.countrystatecity.in/v1/countries/"+code+"/states";

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
        console.log(response);  
    })()
}
getCountryName();

getStates('IN')