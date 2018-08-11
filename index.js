const express = require('express')
const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');
let app = express();
let xero = new XeroClient(config);
let lastRequestToken = null;

let newEmployee =
{
    "FirstName": "John",
    "LastName": "Smith",

    "DateOfBirth": "1987-12-28",
    "HomeAddress>":
    {
        "AddressLine1": "Street address 1",
        "City": "Wahat",
        "Region": "ACT",
        "PostalCode": "1234"
    }
}

app.set('port', 3000);
app.get('/', function (reg, res) {
    res.send('<a href="/connect">Connect</a>')
});
app.get('/connect', async function (req, res) {
    lastRequestToken = await xero.oauth1Client.getRequestToken();
    let authriseURL = xero.oauth1Client.buildAuthoriseUrl(lastRequestToken)
    console.log(lastRequestToken);
    console.log(authriseURL);
    res.redirect(authriseURL);
})
app.get('/callback', async function (req, res) {
    let oauth_verifier = req.query.oauth_verifier;
    let accessToken = await xero.oauth1Client.swapRequestTokenforAccessToken(lastRequestToken, oauth_verifier);
    //let org=await xero.organisations.get();

    // let employees=await xero.invoices.get();
    let employees=await xero.employees.get();
    // let employees = await xero.employees.create(newEmployee);
    // let employees=await xero.accounts.get();
    // let type=await employees.Accounts[0];


    console.log(accessToken);
    res.send(employees);
})
app.listen(app.get('port'), function () {
    console.log('App running on port 3000')
})


