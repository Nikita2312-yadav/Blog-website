import fs from 'fs';
import imagekit from '../congifs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/commnet.js';
import main from '../congifs/gemini.js';

// controlling the addBlog
export const addBlog = async (req, res) => {
     try {
          const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
          const imageFile = req.file;

          //check i fall the field are present 
          if (!title || !subTitle || !description || !category || !isPublished) {
               return res.json({ success: "false", message: "missing require fields" })
          }

          const fileBuffer = fs.readFileSync(imageFile.path);
          // Upload image to imagekit
          const response = await imagekit.upload({
               file: fileBuffer,
               fileName: imageFile.originalname,
               folder: '/blogs',
          })

          //optimization through imageKit URL transformation

          const optimizedImageUrl = imagekit.url({
               path: response.filePath,
               transformation: [
                    { quality: 'auto' }, //Auto compression
                    { format: 'webp' },// convert to modern format
                    { width: '1280' }// widht resizing
               ]
          })

          const image = optimizedImageUrl;

          await Blog.create({ title, subTitle, description, category, image, isPublished })
          // we can use new but this is shorter than new here we dont have to save the blog data like blog.save();
          res.json({ success: true, message: "blog data added successfully" })
     } catch (error) {
          res.json({ success: false, message: error.message })
     }
}

//controlling the list of comments

export const getAllBlogs = async (req, res) => {
     try {
          const blogs = await Blog.find({ isPublished: true });

          res.json({ success: true, blogs })
     } catch (error) {
          res.json({ success: false, message: error.message })

     }
}

//individual blog data

export const getBlogById = async (req, res) => {
     try {
          const { id } = req.params;
          const blog = await Blog.findById(id);
          if (!blog) {
               res.json({ success: false, message: error.message })
          }
          res.json({ success: true, blog })
     } catch (error) {
          res.json({ success: false, message: error.message })
     }
}

export const deleteBlogById = async (req, res) => {
     try {
          const { id } = req.body;
          await Blog.findByIdAndDelete(id);
          //delete all comments associated with the blog
          await Comment.deleteMany({blog:id});

          res.json({ success: true, message: "Blog successfully deleted" });

     } catch (error) {
          res.json({ success: false, message: error.message })
     }
}

export const togglePublish = async (req, res) => {
     try {
          const { id } = req.body;
          const blog = await Blog.findById(id);
          blog.isPublished = !blog.isPublished;
          await blog.save();
          res.json({ success: true, message: 'Blog status updated' });
     } catch (error) {
          res.json({ success: false, message: error.message })
     }
}

export const addComment =async(req,res)=>{
       try{
            const {blog,name,content}=req.body;
            if(!blog || !name || !content){
                return res.json({success:false,message:"not added"});
               }
               await Comment.create({blog,name,content});
               res.json({success:true,message:"comment added successfully"});
       }catch(error){
            res.json({ success: false, message: error.message })
       }
}

export const getBlogComments=async(req,res)=>{
     try{
         const { blogId } = req.body;
          const comments=await Comment.find({blog:blogId, isApproved:true}).sort({createdAt:-1});
           res.json({success:true,comments});
     }catch(error){
           res.json({ success: false, message: error.message})
     }
}  

export const  generateContent=async(req,res)=>{
      try{
          const {prompt}=req.body;
          const content =  await main(prompt + 'Generate a blog content for this topic in single text formate');
          res.json({success:true,content})
      } catch (error){
           res.json({success:false, message:error.message})
      }
}
