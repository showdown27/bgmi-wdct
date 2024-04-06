import React, { useEffect, useState } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    
    const loaderShownBefore = localStorage.getItem("loaderShown");
    if (!loaderShownBefore) {
      
      setShowLoader(true);
      localStorage.setItem("loaderShown", "true");
    }
  }, []);

  if (!showLoader) {
    
    return null;
  }

  return (
    <div
      className="cs-loader show"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        backdropFilter: "blur(8px)",
        flexDirection: "column",
      }}
    >
      <div
        className="cs-loader__media"
        style={{
          position: "relative",
          maxWidth: "8rem",
          maxHeight: "8rem",
          marginBottom: "1rem",
        }}
      >
        <img
          loading="lazy"
          src="https://www.bigmpizza.com/static/media/loader.dcda44e4fa1c198431d4.gif"
          alt=""
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
      <div className="waviy" style={{ color: "#eca800",fontSize: "2rem" }}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
};

export default Loader;
