import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import "../../Styles/HomePageAsk.css"
import Aos from "aos";

import "aos/dist/aos.css";
import TransitionsModal from '../Modal/SearchModal';
const Homepage = () => {

    useEffect(() => {
      Aos.init({ duration: 2000 });
    });
    return (
        <div>
            <div className="Askque-home" data-aos="fade-left">
            <TransitionsModal />
            </div>
        </div>
    )
}

export default Homepage
