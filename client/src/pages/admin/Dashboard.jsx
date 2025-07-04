import { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
     const {axios}=useAppContext();

     const [DashboardData, setDashboardData] = useState({
          blogs: 0,
          comments: 0,
          drafts: 0,
          recentBlogs: [],
     })

     const fetchDashboard = async () => {
          try{
               const {data}= await axios.get('/api/admin/dashboard');
               if(data.success){
                   setDashboardData(data.dashboardData)
               } else{
                    toast.error(data.message)
               }

          } catch(error){
                 toast.error(error.message)
          }
     }

     useEffect(() => {
          fetchDashboard();
     }, [])


     return (
          <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
               <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer  hover:scale-105 transition-all">
 
                         <img src={assets.dashboard_icon_1} />
                         <div>
                              <p className="text-xl font-semibold text-gray-600">{DashboardData.blogs}</p>
                              <p className="text-gray-400">Blogs</p>
                         </div>

                    </div>

                    <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer  hover:scale-105 transition-all">
 
                         <img src={assets.dashboard_icon_2} />
                         <div>
                              <p className="text-xl font-semibold text-gray-600">{DashboardData.comments}</p>
                              <p className="text-gray-400">Blogs</p>
                         </div>

                    </div>

                    <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer  hover:scale-105 transition-all">
 
                         <img src={assets.dashboard_icon_3} />
                         <div>
                              <p className="text-xl font-semibold text-gray-600">{DashboardData.blogs}</p>
                              <p className="text-gray-400">drafts</p>
                         </div>

                    </div>

                     
               </div>

               <div>
                    <div>
                         <img src={assets.dashboard_icon_4}  alt=""  className="flex item-center gap-3 m-4 mt-6 text-gray-600"/> 
                         <p>Latest Blog</p>
                    </div>
                     
                    <div className="relative max-w-4xl overflow-x-auto shodow rounded-lg scrollbar-hide bg-white">

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
                                   {DashboardData.recentBlogs.map((blog,index)=>(
                                         <BlogTableItem key ={index} index={index+1} blog={blog}  fetchBlogs={fetchDashboard}/>
                                   ))}
                               </tbody>

                         </table>
                    </div>
               </div>
          </div>
     )
}

export default Dashboard;