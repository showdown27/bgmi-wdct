import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import prizecss from "./Prizes.module.css";
import cardImg from "../../assets/imgs/cca.png";
import { Card } from "../../components/Card";
import CashPrize from "../../assets/imgs/prizes.jpg";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";
import AarohanTshirt from "../../assets/imgs/arhn_tshirt.jpeg";

const cardItems = [
  {
    img: AarohanTshirt,
    title: "1ST PRIZE",
    subtitle: "Aarohan Tshirt Certificate and Cash Prize",
  },
  {
    img: CashPrize,
    title: "2ND PRIZE",
    subtitle: "Certificate and Cash Prize",
  },
  {
    img: CashPrize,
    title: "3RD PRIZE",
    subtitle: "Certificate and Cash Prize",
  },
];

export const Prizes = () => {
  return (
    <div className={prizecss.prizes}>
      <Navbar />
      <div className={prizecss.box}>
        <div className={prizecss.prize_menu}>
          <h2 className={prizecss.prizefont}>PRIZES</h2>

          <div className={prizecss.cards_container}>
            {cardItems.map((element, index) => {
              return <Card element={element} index={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={prizecss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
