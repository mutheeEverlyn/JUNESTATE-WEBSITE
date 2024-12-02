import Hero  from '../components/Hero'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import About from '../components/About'
import Testimonial from '../components/Testimonial'
import Contact from '../components/Contact'
import HouseList from '../components/HouseList'
import Services from '../components/Services'

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <About/>
      <HouseList/>
      <Services/>
      <Testimonial/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
