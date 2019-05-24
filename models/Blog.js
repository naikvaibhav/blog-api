//importing mongoose
const mongoose = require('mongoose');

//importing schemas

const Schema = mongoose.Schema;

//instance of Schema
let blogSchema = new Schema(
    {
        blogId:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        },
        bodyHtml:{
            type:String,
            default:''
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:false
        },
        category:{
            type:String,
            default:''
        },
        author:{
            type:String,
            default:''
        },
        tags:[],
        created:{
            type:Date,
            default:Date.now
        },
        lastModified:{
            type:Date,
            default:Date.now
        }
    })

    //exporting the blogSchema
    mongoose.model('Blog',blogSchema);