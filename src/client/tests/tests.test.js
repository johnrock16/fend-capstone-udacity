import {verifyUrl} from '../js/utils';
import {searcHPlaceInfos} from '../js/FendAPI';
import {IndexPage} from '../js/indexPage';


describe("test url",()=>{
    test('valid url https', () => {
        expect(verifyUrl('https://www.google.com')).toEqual(true);
    });
    test('valid url ftp', () => {
        expect(verifyUrl('ftp://www.google.com')).toEqual(true);
    });
    test('invalid url http', () => {
        expect(verifyUrl('http://www.google.com')).toEqual(false);
    });
    test('invalid url any text', () => {
        expect(verifyUrl('anyTest.com')).toEqual(false);
    });
})

describe("Request Evaluate NLP",()=>{
    beforeEach(()=>{
        global.fetch = jest.fn().mockImplementation(()=> {
            const p = new Promise((resolve, reject) => {
              resolve({
                status:200,
                json: ()=>{ 
                  return {confidenty: 100}
                }
              });
            });
            return p;
        });
    });
    it("fetch sucessfully", async ()=>{
        const response = await evaluateNPL("url");
        expect(response.confidenty).toBe(100); 
    });
});

describe("index page",()=>{
    beforeEach(()=>{
        global.fetch = jest.fn().mockImplementation(()=> {
            const p = new Promise((resolve, reject) => {
              resolve({
                status:200,
                json: ()=>{ 
                  return {confidence: 100,agreement:'Agreement',irony:'IRONIC',subjectivity:'SUBJECTIVE'}
                }
              });
            });
            return p;
        });
    });
    test('button click', () => {
        document.body.innerHTML =
        '<div>' +
        '  <button id="btnEvaluate" />' +
        '  <input id="txtUrl" value="https://www.bbc.com/news/health-55228421"></input>' +
        '  <span id="lblAgreement"></span>' +
        '  <span id="lblConfidence"></span>' +
        '  <span id="lblIrony"></span>' +
        '  <span id="lblSubjectivity"></span>' +
        '</div>';
        IndexPage();
        btnEvaluate.click();
        setTimeout(()=>{
            expect(lblConfidence.innerHTML).toEqual('100');
        },5000)
    });
})