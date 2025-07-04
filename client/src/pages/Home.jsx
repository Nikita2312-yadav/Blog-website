 import BlogCard from "../components/BlogCard";
import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbaar from "../components/Navbaar";
import NewsLetter from "../components/NewsLetter";
 const Home=()=>{
     return  (
        <div>
            <Navbaar/>
            <Header/>
            <BlogList/>
            <BlogCard/>
            <NewsLetter/>
            <Footer/>
        </div>
     )
}
export default Home;