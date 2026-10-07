import React from "react";
import contactcss from "../Contact/Contact.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import Nikhil from "../../assets/imgs/Nikhil.png";
import Saiteja from "../../assets/imgs/Saiteja.png";
import { Card } from "../../components/Card";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";

const cardItems = [
  {
    img: Nikhil,
    title: "Nikhil Kumar",
    phone: "+917644088558",
    phoneDisplay: "+91 76440 88558",
    instagram: "https://www.instagram.com/showdown.27/",
  },
  {
    img: Saiteja,
    title: "Saiteja Kothuri",
    phone: "+916303019533",
    phoneDisplay: "+91 63030 19533",
    instagram: "https://www.instagram.com/teja_eqx/",
  },
];

export const Contact = () => {
  return (
    <div className={contactcss.contact}>
      <Navbar />
      <div className={contactcss.box}>
        <div className={contactcss.contactUs}>
          <h2 style={{ color: "black" }}>Contact Us</h2>

          <div className={contactcss.cards_container}>
            {cardItems.map((element, index) => {
              return <Card element={element} index={index} key={index} />;
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
