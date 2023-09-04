const express = require("express")
const router =  express.Router()
const {create} = require("../controllers/blogController")
const{getAllblogs} = require("../controllers/blogController")
const{singleBlog,DeleteBlog,update} = require("../controllers/blogController")
router.post('/create',create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',DeleteBlog)
router.put('/blog/:slug',update)

module.exports=router