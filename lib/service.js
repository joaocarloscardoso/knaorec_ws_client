const axios = require('axios');
var fs = require('fs'),
    path = require('path');

var xpath   = require('xpath');
var Dom     = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var env = require('./globalvalues.js');

function GetPortfolios(){
    //get request through axios component
    axios.get('http://localhost:3001/GetData')
        .then(response => {
        
            console.log(response.data);
            console.log(response.status + ' : ' + response.statusText);
        })
        .catch(error => {
            console.log(error);
    });
};

function AddPortfolio(xmlSource){
    const options = {
        headers: { authorization: 'Bearer ' + env.token }
    };

    xmlSource = env.dataSetPath + xmlSource + '.xml';
    var data = fs.readFileSync(xmlSource, { encoding : 'UTF-8' });
    // Create an XMLDom Element:
    var doc = new Dom().parseFromString(data);
    var datadb = new XMLSerializer().serializeToString(doc);

    const data2Send= {
        userid: 'knaouser',
        datepub: (new Date()).toJSON(),
        portfolioid: xpath.select("/portfolio/@autoNr",doc)[0].nodeValue,
        description: xpath.select("/portfolio/name/tx[@l='" + env.lang + "']/@description",doc)[0].nodeValue,
        coverage: xpath.select("/portfolio/@coverage",doc)[0].nodeValue,
        org: env.org, //xpath.select("/portfolio/@org",doc)[0].nodeValue, 
        publish:xpath.select("/portfolio/@publish",doc)[0].nodeValue,
        data: datadb
    };

    axios.post(
        'http://localhost:3001/AddData', 
        data2Send, 
        options
    )
    .then((response) => {
        console.log(response.data);
        console.log(response.status + ' : ' + response.statusText);
    }, (error) => {
        console.log(error);
    });

};

function DeletePortfolio(idPortfolio){
    const options = {
        headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpzV2JPM2x6WXhpam14NzQ5NmFhZyJ9.eyJpc3MiOiJodHRwczovL2Rldi0wcGFpZncweS5ldS5hdXRoMC5jb20vIiwic3ViIjoiRzI3NGcxZXBhZkZuakR0cW5rR3hhZmRieXlYNFNnSlVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYWRzLWFwaSIsImlhdCI6MTYxNDM2NzkwNiwiZXhwIjoxNjE0NDU0MzA2LCJhenAiOiJHMjc0ZzFlcGFmRm5qRHRxbmtHeGFmZGJ5eVg0U2dKVSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.hD1HYB7nkOZWiH7m_RTio0XRSAryUTh8bumNUnRSuqKfvfi3njwyYBphqNJuw9MX3rGUcA1BkkmAOTVP31bnJNk5ayq0s8UNK6cjF-l-ZqZTGHGPVTQsIMGlT3IBEX2sm3E9N-YNTVWNs6_gIEmkPwDb93QOi8Xd_fo9wrpESQaP7sSVp2S-_dVvB5yfj2jeNPH3X-GnIq1_PIpGsRSMnXXa2nw5lv_rTuxLTmCtLDicFV1AZ98i-uR2KsejZ2JJV0F_JYDhYprtDwxs_sN2_Qo0G7S8kaxIIAXlbfA5yST5xQzerkY0Le6kbIj8pPADlnKXOYgYw3qpkj3aXNaBew' }
    };

    axios.delete(
        'http://localhost:3001/DeleteData/' + idPortfolio, 
        options
    )
    .then((response) => {
        console.log(response.data);
        console.log(response.status + ' : ' + response.statusText);
}, (error) => {
        console.log(error);
    });
};
/*
// multiple concurrent requests with axios
axios.all([
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-26'),
        axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-25')
    ]).then(axios.spread((response1, response2) => {
        console.log(response1.data.url);
        console.log(response2.data.url);
    })).catch(error => {
        console.log(error);
    });
*/
//post request through axios component
/*
axios({
    "method": "POST",
    "url": "http://httpbin.org/post",
    "params": {
        "key": "abc123"
    },
    "data": {
        "firstname": "Nic",
        "lastname": "Raboy"
    }
}).then(response => {
    console.log(response.data);
});
*/

module.exports.GetPortfolios = GetPortfolios;
module.exports.AddPortfolio = AddPortfolio;
module.exports.DeletePortfolio = DeletePortfolio;