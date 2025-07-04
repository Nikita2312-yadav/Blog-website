import express from 'express'
import upload from '../middleware/multar.js';
import auth from '../middleware/auth.js';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/BlogController.js';

const blogRouter=express.Router();
 
blogRouter.post('/add',upload.single('image'),auth, addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:id',getBlogById);
blogRouter.delete('/delete',auth,deleteBlogById);
blogRouter.post('/toggle-publish',togglePublish);
blogRouter.post('/add-comment',addComment); 
blogRouter.post('/comments',getBlogComments);
blogRouter.post('/generate',auth,generateContent);



export default blogRouter;  