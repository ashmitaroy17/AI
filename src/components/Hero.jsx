// import React from 'react'
// eslint-disable-next-line no-unused-vars
import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header
      className="w-full flex justify-between items-center flex-col"
      style={{ margin: "10px" }}
    >
      <nav
        className="w-full mb-10 pt-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          {/* Place the logo with a gap on the left corner */}
          <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        </div>

        <div style={{ marginRight: "10px" }}>
          {/* Place the GitHub button with a gap on the right corner */}
          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/ashmitaroy17", "_blank")
            }
            className="ellipsoid_btn"
            style={{ backgroundColor: "black", color: "white" }}
          >
            GitHub
          </button>
        </div>
      </nav>
      <h1
        className="head_text"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "56px",
          fontWeight: "1800",
          textAlign: "center",
        }}
      >
        <span style={{ fontWeight: "800" }}>Summarize Articles with</span>{" "}
        <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;





