import React from "react";
import rity_logo from "../assets/rity_logo.png";
import github_logo from "../assets/github-mark-white.png";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full flex justify-between items-center mb-10 pt-3">
        <img className="w-28 object-contain" src={rity_logo} alt="rity_logo" />
        <button
          type="button"
          className="black_btn"
          onClick={() => window.open("https://github.com/natzgg")}
        >
          <img className="object-contain w-5" src={github_logo} alt="" />
        </button>
      </nav>

      <h1 className="head_text">
        SUMMARIZING AI TOOL using <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <div className="desc">
        An AI Summarizing tool to help you read and understand the article
        faster. It transform lenghty article to a more readable and clear way
        summary.
      </div>
    </header>
  );
};

export default Hero;
