import axios from 'axios'
import { useState ,useEffect } from 'react';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import Menubar from './Menubar';
import Footer from './Footer';
import Login from './Login';
function Home() {
  
    return(

        <>
        <center>
          <Login/>
    <HeroSection/>
    <ServiceSection/> 
    <br/><br/>
    <Menubar/>
    <Footer/>
    </center>

        </>
    )

}

export default Home;

