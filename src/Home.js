import React from 'react';
import NavBar from "./Webpage component/Navbar"
import Homevideo from './assets/video/video.mp4'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {TextDescription} from './styles/globalStyles'
import {
    HomePageTitle,
    HomePageSub,
  } from './styles/Homepage.style';
import Footer from './Webpage component/Footer';



function Home() {
    return (
        <div>
            {/* <Modal/> */}
            <NavBar/>

            <video src={Homevideo} autoPlay loop muted></video>
            
            <HomePageTitle>Welcome to TreesTogether</HomePageTitle>
            <HomePageSub>A place for you to save environment</HomePageSub>
    
            <Footer/>
            
        </div>
    )
}

export default Home;