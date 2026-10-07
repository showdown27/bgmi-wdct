import React from 'react'
import homecss from './Home.module.css';
import Timer from '../../components/Timer/Timer';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => {

    return (
      <div className={homecss.home}>
        <Navbar />
        <div className={homecss.main}>
          <h1>INDIA KA BATTLEGROUNDS</h1>
          <Timer eventDate={new Date(2026, 9, 9, 10, 0, 0)} />
        </div>
        <Footer />
      </div>
    );
}
