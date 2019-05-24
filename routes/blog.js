const express = require('express');

const blogController = require('./../controllers/blogController');

const appConfig = require('./../config/appconfig');

//create a function 
let setRouter = (app)=>{
    

/*//route the application
app.get('/helloworld',blogController.helloworld);
app.get('/print',blogController.print);*/

/*
app.get('/test/route/:param1/:param2',blogController.testRoute);
app.get('/test/query',blogController.testQuery);
app.get('/test/body',blogController.testBody);
*/





let baseUrl = appConfig.apiVersion+'/blogs';

    app.get(baseUrl+'/all',blogController.getAllBlog);

    app.get(baseUrl+'/view/:blogId',blogController.viewByBlogId);

    app.get(baseUrl+'/view/by/author/:author',blogController.viewByAuthor);

    app.get(baseUrl+'/view/by/category/:category',blogController.viewByCategory);

    app.post(baseUrl+'/:blogId/delete',blogController.deleteBlog);

    app.put(baseUrl+'/:blogId/edit',blogController.editBlog);

    app.post(baseUrl+'/create',blogController.createBlog);

    app.get(baseUrl+'/:blogId/count/view',blogController.increaseBlogView);


}//end setRouter function

module.exports={
    setRouter : setRouter
}