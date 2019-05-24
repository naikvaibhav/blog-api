const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
//creating a call back function
//let helloWorldFunction=(req,res)=>res.send('Hello World!...');
//let examplePrint=(req,res)=>res.send('Print example');

require('./../models/Blog');
//importing the model here
const BlogModel = mongoose.model('Blog')
 
//function for test route
/*
let testRoute = (req,res)=>{
    console.log(req.params)
    res.send(req.params)
}//end test

//function for test query
let testQuery = (req,res)=>{
    console.log(req.query)
    res.send(req.query)
}//end test

//function for test body
let testBody = (req,res)=>{
    console.log(req.body)
    res.send(req.body)
}//end test
*/

//getAllBlog function
let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else if (result == undefined || result == null || result == '') {
                console.log('No Blog Found')
                res.send("No Blog Found")
            } else {
                res.send(result)
            }
        })
}// end get all blogs


//to read single blog
let viewByBlogId = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}//end viewByBlogId

// to get category name
let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}
//end viewByCategory

//to get author name
let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}//end viewByAuthor

let createBlog = (req,res)=>{
    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({
        blogId : blogId,
        title : req.body.title,
        description : req.body.description,
        bodyHtml : req.body.blogBody,
        isPublished : true,
        category : req.body.category,
        author : req.body.fullName,
        created : today,
        lastModified : today
    })//end new blog model

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags!='')? req.body.tags.split(','):[]
    newBlog.tags = tags


    newBlog.save((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.send(result)
        }
    })//end new blog save
}

let increaseBlogView = (req,res)=>{
    BlogModel.findOne({'blogId':req.params.blogId}, (err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No blog found')
            res.send('No blog found')

        }else{
            result.views += 1;
            result.save(function(err,result){
                if(err){
                    console.log(err)
                    res.send(err)

                }else{
                    console.log('Blog updated successfully')
                    res.send(result)
                }
            });//end result
          
        }
    })

}

let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}


let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}
//export these functions
module.exports={
    /*
    helloworld : helloWorldFunction,
    print : examplePrint
    */
   /*
   testRoute : testRoute,
   testQuery : testQuery,
   testBody : testBody,
   */
  getAllBlog :  getAllBlog,
  viewByBlogId :viewByBlogId,
  viewByCategory : viewByCategory,
  viewByAuthor : viewByAuthor,
  createBlog : createBlog,
  increaseBlogView : increaseBlogView,
  editBlog : editBlog,
  deleteBlog : deleteBlog
  

}