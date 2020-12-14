import {searcHPlaceInfos} from './FendAPI';

export const IndexPage=()=>{
    const btnEvaluate = document.getElementById('btnSearch');
    const txtLocal = document.getElementById('txtLocal');
    const imageContainer = document.getElementById('images-grid');
    const weatherContainer= document.getElementById('weather-container');
    const countryContainer= document.getElementById('country-container');
    
    btnEvaluate.addEventListener('click',async (event) => {
        const result=await searcH(txtLocal.value);
        console.log(result)
        if(result.images && result.images.hits.length>0){
            fillImages(result.images.hits);
        }
        if(result.weather.data){
            fillWeather(result.weather.data)
        }
        if(result.country){
            fillCountry(result.country)
        }
    })
    const searcH= async (text)=>{
        if(text && text.trim()!=='' && text.length<3) return alert('Invalid search');
        const result = await searcHPlaceInfos(text);
        return result;
    }

    const fillImages=(images)=>{
        let str='';
        let count=0;
        for(let i=0;i<images.length/5;i++){
            str+='<div class="row">';
            for(let j=0;j<5 && (count<images.length);j++){
                str+=`<img src="${images[count].largeImageURL}"></img>`;
                count+=1;
            }
            str+='</div>';
        }
        imageContainer.innerHTML=str;
    }

    const fillWeather=(weathers)=>{
        let str='';
            for(let j=0;j<weathers.length;j++){
                const {datetime, low_temp, high_temp,temp,weather} = weathers[j];
                str+='<div class="weather-day">'
                str+=`<span class="text">${datetime}</span>`
                str+=`<span class="text">${weather.description}</span>`
                str+=`<img class="icon-weather" src="../../assets/icons/${weather.icon}.png"></i>`
                str+=`<span class="text">${temp}ºC</span>`
                str+=`<span class="text">min: ${low_temp}ºC</span>`
                str+=`<span class="text">max: ${high_temp}ºC</span>`
                str+='</div>';
            }
        weatherContainer.innerHTML=str;
    }

    const fillCountry=(country)=>{
        let str='';
        const {nativeName, capital, region,subregion,languages,timezones,population,area,flag} = country;
        str+=`<img class="icon-weather" src="${flag}"></i>`
        str+=`<span class="text">${nativeName}</span>`
        str+=`<span class="text">${capital}</span>`
        str+=`<span class="text">${region}</span>`
        str+=`<span class="text">${subregion}</span>`
        str+=`<span class="text">${languages.map(({ nativeName,name }) => `(${[nativeName, name].join(', ')})`).join(', ')}</span>`
        str+=`<span class="text">${timezones.join(',')}</span>`
        str+=`<span class="text">${population}ºC</span>`
        str+=`<span class="text">${area}ºC</span>`
        countryContainer.innerHTML=str;
    }
}