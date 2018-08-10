const express=require('express');
const XeroClient=require('xero-node').AccountingAPIClient;
const config=require('./config.json');

let app=express();

app.set('port',3000);

app.get('/',function(reg,res){
    res.send('<a href="/connect">Connect</a>')
});

app.listen(app.get('port'),function(){
    console.log('App running on port 3000')
})