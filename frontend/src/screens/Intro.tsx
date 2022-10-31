import React from "react";
import { Link } from "react-router-dom";
import "./Intro.scss";
import { ReactComponent as Intro_logo } from "../assets/images/intro_logo.svg";

function Intro() {
  return (
    <>
      <div id="intro">
        <Intro_logo className="introLogo" />

        <Link to="main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default Intro;