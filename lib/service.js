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
        headers: { authorization: 'Bearer ' + env.token }
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