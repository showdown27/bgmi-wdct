import React from "react";
import contactcss from "../Contact/Contact.module.css";
import cardImg from "../../assets/imgs/arhn.jpg";
import { Navbar } from "../../components/Navbar/Navbar";
import Saikat from "../../assets/imgs/Saikat Sarkar.jpg";
import Rishav from "../../assets/imgs/Rishav Jha.jpg";
import Arya from "../../assets/imgs/Arya Sah.jpg";
import Somwrik from "../../assets/imgs/Somwrik Dubey.jpg";
import { Card } from "../../components/Card";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";

const cardItems = [
  {
    img: Saikat,
    title: "Saikat Sarkar",
    linkedin: "https://www.linkedin.com/in/saikat-sarkar-395785205/",
    instagram: "https://www.instagram.com/_saikxx_/",
    
  },
  {
    img: Arya,
    title: "Arya Sah",
    linkedin: "https://www.linkedin.com/in/arya-sah/",
    instagram: "https://www.instagram.com/aryasah30/",
    
  },
  {
    img: Rishav,
    title: "Rishav Jha",
    linkedin: "https://www.linkedin.com/in/rishav-devraj/",
    instagram: "https://www.instagram.com/_d.e.v.r.a.j/",
    
  },
  {
    img: Somwrik,
    title: "Somwrik Dubey",
    linkedin: "https://www.linkedin.com/in/somwrik-dubey-8b35771ba/",
    instagram: "https://www.instagram.com/somwrik.psd/",
    
  },
];
export const Contact = () => {
  return (
    <div className={contactcss.contact}>
      <Navbar />
      <div className={contactcss.box}>
        <div className={contactcss.contactUs}>
          <h2 style={{
            color:'black'
          }}>Contact Us</h2>

          <div className={contactcss.cards_container}>
            {cardItems.map((element, index) => {
              return <Card element={element} index={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={contactcss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
