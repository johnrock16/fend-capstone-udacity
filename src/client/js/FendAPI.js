import {postData} from './utils';

export const searcHPlaceInfos=async (place)=>{
    const placeData=await searchPlace(place);
    const images=await searchPhotos(place);
    let country={};
    let weather={};
    if(placeData.geonames[0].countryCode){
        country=await searchCountry(placeData.geonames[0].countryCode)
    }
    if(placeData.geonames && placeData.geonames.length>0){
        weather=await searchWeather({lat:placeData.geonames[0].lat,lon:placeData.geonames[0].lng});
    }
    return {placeData,weather,images,country}
}

export const searchPlace=(placename)=>{
    return postData('/getPlace',{placename});
}

export const searchWeather=(obj)=>{
    return postData('/getWeather',obj);
}

export const searchCountry=(alphaCode)=>{
    return postData('/getCountry',{alphaCode});
}

export const searchPhotos=(placename)=>{
    return postData('/getPlaceImages',{placename});
}