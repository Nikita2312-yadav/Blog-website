import { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
     const {axios}=useAppContext();

     const [bloglist, setListBlog] = useState([]);
     // console.log(bloglist);
     const fetchListBlog = async () => {
         try{
            const {data}=await axios.get('/api/admin/blogs')
            if(data.success){
                setListBlog(data.blogs);
            } else {
                toast.error(data.message);
            } 
         } catch(error){
           toast.error(error.message);
         }

     }

     useEffect(() => {
          fetchListBlog();
     }, [])


     return (
          <div className="flex-1 pt-5   mt-4 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">

               <h1>All blogs</h1>
               <div className="relative max-w-4xl h-4/5 overflow-x-auto shodow rounded-lg scrollbar-hide bg-white">

                    <table className="w-full text-sm text-gray-500">
                         <thead className=" text-xs text-gray-600 text-left upparcase">
                              <tr>

                                   <th scope='col' className="px-2 py-4 xl:px-6" ># </th>
                                   <th scope='col' className="px-2 py-4">Blog Title </th>
                                   <th scope='col' className="px-2 py-4 max-sm:hidden">Date </th>
                                   <th scope='col' className="px-2 py-4 max-sm:hidden">Status</th>
                                   <th scope='col' className="px-2 py-4">Actions</th>

                              </tr>
                         </thead>
                         <tbody>
                              
                              {bloglist.map((blog, index) => (
                                   <BlogTableItem key={index} index={index + 1} blog={blog}  fetchBlogs={fetchListBlog} />
                              ))}
                         </tbody>

                    </table>
               </div>
          </div>
     )
}

export default ListBlog;