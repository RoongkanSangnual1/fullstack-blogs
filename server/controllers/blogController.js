 const slugify = require("slugify")
 const Blogs = require("../models/blogs")
const blogs = require("../models/blogs")
const {v4:uuidv4} = require('uuid')
const { response } = require("express")


 
 exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    if(!slug)slug = uuidv4();
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    Blogs.create({title,content,author,slug}).then(blogs =>{
        res.json(blogs)
    }).catch(err=>{
        res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
    })
} 


exports.getAllblogs=(req,res)=>{
    Blogs.find({}).then(blog=>{
        res.json(blog)
    }).catch(err=>{
        
    })
    }

exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).then(blog=>{
        res.json(blog)
    }).catch(err=>{
        
    })
}
exports.DeleteBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).then(blog=>{
        res.json({
            message:`remove`
        })
}
)
}
exports.update=(req,res)=>{
    const {slug} = req.params
    // ส่งข้อมูล => title , content, author
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).then(response=>{
        res.json(response)
    })
        
}