import express from 'express';
import 'dotenv/config'
import cors from 'cors' 
import connectDB from './congifs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRouter.js';

const app=express();
app.use(cors()); 
app.use(express.json());

await connectDB();  

app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);  
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log("server started at" +PORT);
})

export default app;  