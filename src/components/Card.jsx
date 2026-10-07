import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import contactcss from '../pages/Contact/Contact.module.css'
export const Card = ({ element = {}, index = 0 }) => {
  const {
    img = "",
    title = "",
    subtitle = "",
    linkedin = "",
    twitter = "",
    instagram = "",
    imgStyle = {},
  } = element || {};
  return (
    <div className={contactcss.card} key={index}>
      {Boolean(img && img.length !== 0) && (
        <div className={contactcss.card__border}>
          <img
            src={img}
            alt={title || "Profile"}
            className={contactcss.card__img}
            style={imgStyle}
          />
        </div>
      )}
      {Boolean(title && title.length !== 0) && <h3 className={contactcss.card__name}>{title}</h3>}
      {Boolean(subtitle && subtitle.length !== 0) && (
        <h3 className={contactcss.card__name}>{subtitle}</h3>
      )}
      <div className={contactcss.socials}>
        {Boolean(instagram && instagram.length !== 0) && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <FaInstagram
              className={contactcss.icons}
              style={{ fontSize: "30px" }}
            />
          </a>
        )}
        {Boolean(linkedin && linkedin.length !== 0) && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <CiLinkedin
              className={contactcss.icons}
              style={{ fontSize: "35px" }}
            />
          </a>
        )}
        {Boolean(twitter && twitter.length !== 0) && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className={contactcss.iconAnchor}
          >
            <FaXTwitter
              className={contactcss.icons}
              style={{ fontSize: "25px" }}
            />
          </a>
        )}
      </div>
    </div>
  );
};
