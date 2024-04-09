import React from "react";
import faqcss from "./FAQ.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import EventDetails from "../../components/Modals/EventDetails";
import Register from "../../components/Modals/Register";

const FaqComponent = (props) => {
  return (
    <div className={faqcss.wrapper}>
      <div className={faqcss.collapsible}>
        <input type="checkbox" id={props.id} />
        <label
          htmlFor={props.id}
          className={`${faqcss.text_normal} ${faqcss.font_medium}`}
        >
          {props.id ? props.id + ". " : "No ID defined"}
          {props.question ? props.question : "No Question defined"}
          <div className={faqcss.arrow} />
        </label>

        <div className={faqcss.collapsible_text}>
          <p style={{
          color: "black",
        }}>{props.para ? props.para : "No Para defined"}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const faqData = [
    {
      id: "1",
      question: "What are the prerequisites for the tournament?",
      para: "All participants are required to bring their own mobile devices with BattleGrounds Mobile India 'BGMI' pre installed. Additionally, participants are responsible for bringing their own gaming peripherals as they will not be provided at the event.",
    },
    {
      id: "2",
      question:
        "Will internet connection be provided or do I have to use my own network?",
      para: "Yes, high speed internet connection will be provided throughout the duration of the tournament.",
    },
    {
      id: "3",
      question:
        "Can I compete as part of a team or do I have to compete individually?",
      para: "You can opt to participate either on your own or  as part of a team in BGMI. If you decide to join a team, each member needs to register separately. Once all members have registered, we'll assemble your team. Furthermore, all competition updates will be communicated through WhatsApp.",
    },
    {
      id: "4",
      question:
        "Is there a minimum rank or skill level required to participate in the BGMI tournament?",
      para: "All players, regardless of their rank or skill level, are welcome to participate in the tournament.",
    },
    {
      id: "5",
      question:
        "We are not NIT Durgapur college students, can we still participate in the tournament?",
      para: "Yes, the tournament is open to all students from any college or university. You are welcome to participate in the tournament. You can attend in online mode, no need to reach venue. Once you have registered, join the WhatsApp group to receive all competition updates.",
    },
  ];

  return (
    <div className={faqcss.faqs}>
      <Navbar />
      <div className={faqcss.faq_container}>
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
        {faqData.map((item, index) => (
          <FaqComponent
            key={item.id}
            id={item.id}
            question={item.question}
            para={item.para}
          />
        ))}
      </div>
      <div className={faqcss.footer}>
        <EventDetails />
        <Register />
      </div>
    </div>
  );
};
