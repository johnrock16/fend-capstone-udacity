
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const API_WEATHER='https://api.weatherbit.io/v2.0'//'/forecast/daily'
const API_PICTURES='https://pixabay.com/api';
const API_GEONAME='http://api.geonames.org/searchJSON?';
const API_COUNTRY='https://restcountries.eu/rest/v2';

const app = express();
const port = 3000;

dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.static('dist'))

app.get('/',(req,res)=>{
    res.sendFile('../../dist/index.html');
});

app.post('/getCountry', async (req, res) => {
    const {alphaCode} = req.body
    const urlFetch=`${API_COUNTRY}/alpha/${alphaCode}`
    fetch(urlFetch,{
        method:'GET',
    }).then((resolve)=>{
        if(resolve.status===200){
            return resolve.json();
        }
        res.sendStatus(500)
    }).then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    });
});

app.post('/getPlace', async (req, res) => {
    const {placename} = req.body
    const urlFetch=`${API_GEONAME}${new URLSearchParams({
        name:placename,
        username:process.env.API_KEY_GEONAME
    })}`
    fetchAPI(res,urlFetch);
});

app.post('/getWeather', async (req, res) => {
    const {lat,lon} = req.body
    const urlFetch=`${API_WEATHER}/forecast/daily?${new URLSearchParams({
        lat:lat,
        lon:lon,
        key:process.env.API_KEY_WEATHER
    })}`
    fetchAPI(res,urlFetch);
});

app.post('/getPlaceImages', async (req, res) => {
    const {placename} = req.body
    const urlFetch=`${API_PICTURES}/?${new URLSearchParams({
        q:placename,
        safesearch:true,
        per_page:20,
        key:process.env.API_KEY_PICTURES
    })}`;
    fetchAPI(res,urlFetch);
});

const fetchAPI=(res,url,data={method:'GET'})=>{
    fetch(url,data).then((resolve)=>{
        if(resolve.status===200){
            return resolve.json();
        }
        res.sendStatus(500)
    }).then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    });
}

const server=app.listen(port, () => {
    console.log(`Server is running`);
});

module.exports=server;