import {IndexPage} from '../js/indexPage';

describe("index page",()=>{
    beforeEach(()=>{
        const country={nativeName:'Brasil', capital:'Brasilia', region:'America',subregion:'South America',languages:[{nativeName:'Português',name:'Portuguese'}],timezones:['-2:00,-3:00,-4:00,-5:oo'],population:'200000',area:'8500000',flag:'https://restcountries.eu/data/bra.svg'}
        const weather={datetime:'16-06-2000', low_temp:8, high_temp:16,temp:10,weather:'Overcast clouds'}
        const placeData=[{countryCode:'BR',lat:-23.5530264,lng:-46.6973042}]
        global.fetch = jest.fn().mockImplementation(()=> {
            const p = new Promise((resolve, reject) => {
              resolve({
                status:200,
                json: ()=>{ 
                  return {placeData,country,weather}
                }
              });
            });
            return p;
        });
    });
    test('button click', () => {
        document.body.innerHTML =
        '<div>' +
        '  <button id="btnSearch" />' +
        '  <input id="txtLocal" value="São Paulo"></input>' +
        '  <div id="images-grid"></div>' +
        '  <div id="weather-container"></div>' +
        '  <div id="country-container"></div>' +
        '</div>';
        IndexPage();
        btnSearch.click();
        setTimeout(()=>{   
            const country=document.getElementById('txtCountryName')
            expect(country.innerHTML).toEqual('Brasil');
        },5000)
    });
})