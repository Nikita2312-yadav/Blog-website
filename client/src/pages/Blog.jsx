import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbaar from "../components/Navbaar";
import Moment from 'moment';
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
   const { id } = useParams();
   // console.log(id)
   const { axios } = useAppContext();

   const [data, setData] = useState(null);
   // console.log(data);
   const [comments, setComments] = useState([]);
   const [name, setName] = useState('');
   const [content, setContent] = useState('');


   const fetchBlogData = async () => {
      try {
         const { data } = await axios.get(`/api/blog/${id}`);
         // console.log(data.blog);
         data.success ? setData(data.blog) : toast.error(data.message)
      } catch (error) {
         toast.error(error.message)
      }
   }

   const fetchBlogComment = async () => {
      try {
         const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
         data.success ? setComments(data.comments) : toast.error(data.message);
      } catch (error) {
         toast.error(error.message);
      }
   };


   const handleNameChange = (e) => {
      setName(e.target.value)
   }

   const handleContentChange = (e) => {
      setContent(e.target.value)

   }

   const addComment = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
          console.log(data.message);
         if (data.success) {
            toast.success(data.message)
            setContent('')
            setName('')
         } else {
            toast.error(data.message)
                     }

      } catch (error) {
         toast.error(error.message);
      }


   }

   useEffect(() => {
      fetchBlogData();
      fetchBlogComment();
   }, [])


   return data ? (
      <div className="relative">
         <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50" />
         <Navbaar />

         <div className="text-center mt-20 text-gray-600">
            <p className="text-primary py-4 font-medium">Published on {Moment(data.createdAt).format("MMMM Do YYYY")} </p>
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
            <h1 className="my-5 max-w-lg truncate mx-auto ">{data.subTitle}</h1>
            <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary ">sudeep verma</p>
         </div>

         <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
            <img src={data.image} alt="" className="rounded-3xl mb-5" />

            <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: data.description }}></div>

            {/* comment section */}
            <div className="mt-14 mb-10 max-w-3xl mx-auto">
               <p className="font-semibold mb-4">commants ({comments.length})</p>
               {comments.map((item, index) => (
                  <div key={index} className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                     <div className="flex item-center gap-2 mb-2">
                        <img src={assets.user_icon} alt="" className="w-6" />
                        <p className="font-medium" >{item.name}</p>
                     </div>
                     <p className="text-sm max-w-md ml-8">{item.content}</p>
                     <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs "> {Moment(item.createdAt).fromNow()}</div>

                  </div>
               ))}
            </div>

            {/* Add comment section */}
            <div className="max-w-3xl mx-auto">
               <p className="font-semibold md-4">Add your comment </p>
               <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
                  <input type="text" placeholder="Name" required onChange={handleNameChange} className="w-full p-2 border border-gray-300 rounded outline-none" />
                  <textarea placeholder="Comment" required onChange={handleContentChange} className="w-full p-2 border border-gray-300 rounded outline-none h-48"></textarea>
                  <button type="submit" className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer ">Submit</button>
               </form>
            </div>

            {/* Share button?  */}


            <div className="my-24 max-w-3xl mx-auto">
               <p className="font-semibold my-4"> Share this artical on socila media</p>
               <div className="flex">
                  <img src={assets.facebook_icon} width={50} alt="" />
                  <img src={assets.twitter_icon} width={50} alt="" />
                  <img src={assets.googleplus_icon} width={50} alt="" />

               </div>
            </div>

         </div >
         <Footer />
      </div>
   )
      : <Loader />

}
export default Blog;