import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
const Navbaar=()=>{
    // const navigate=useNavigate()
     const {navigate,token}=useAppContext()
     return (
        <div className=" flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 ">
            <img onClick={()=>navigate('/')} className='w-32 sm:w-44 cursor-pointer' src={assets.logo}/>
            <button  onClick={()=>navigate('/admin')} className=' flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token? 'DashBoard' : 'Login' }
                <img className="w-3" alt="arrow" src={assets.arrow}/>
            </button>
        </div>
     )
}
export default Navbaar;