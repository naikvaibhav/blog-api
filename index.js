//needed to import expressjs into our application
const express = require('express');

//importing appconfig
const appConfig = require('./config/appconfig');

//declaring an instance or creating an application instance
const app = express();

const fs = require('fs');

const mongoose = require('mongoose');

//importing body parser module
const bodyParser = require('body-parser');

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))


//Bootstrap route 
//storing the toutes golser in a variable

let routesPath = './routes'
//reading all the files present in the routes folder and for each file do something 
fs.readdirSync(routesPath).forEach(function(file){
    //checking js extension for the files in router folder
    if(~file.indexOf('.js')){
        console.log('the files present in the routes folder:\n');
        console.log(routesPath+'/'+file);
        let route = require(routesPath+'/'+file);
        route.setRouter(app);
    }

});


//imprting the blogSchema
//bootstrap models
let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) 
    console.log(file)
    require(modelsPath+'/'+file)
})//end bootstrap models

//listening the serve at port no 3000 . creating a local server
app.listen(appConfig.port,()=>{
    
    console.log('Example app listening on port no 3000');
    let db = mongoose.connect(appConfig.db.uri,{useMongoClient:true});
})


//to handle connection errors
//handling mongoose connction error
mongoose.connection.on('error',function(err){
    console.log('Database connection error');
    console.log(err);

}); //end mongoose connection error

//handling mongoose success event
mongoose.connection.on('open',function(err){
    if(err){
        console.log('database error');
        console.log(err);
    }else{
        console.log("database connection open success");
    }
}); // end mongoose connection open handler