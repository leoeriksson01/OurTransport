import React from "react";
import style from "../css/AboutPage.module.css";
import aboutImage from "../assets/aboutimage.jpg";
import staff from "../assets/bilgagnat-staff.jfif";
import Form from "../components/formComponents/Form.js"



function AboutPage(props) {
  return (
    <div id={style.aboutContainer}>
      <div id={style.heroContainer}>
       { <img src={aboutImage} id={style.aboutImage} alt="Image of a car dealership."/>}
        <h1 id={style.heroText}>ABOUT BILGAGNAT</h1>
      </div>
      <div id={style.textImageContainer}>
        <h2 id={style.aboutHeading}>Who we are</h2>
        <p id={style.aboutParagraph}>We at Bilgagnat believe that there is a car for everyone, no matter the budget. Bilgagnat is a Swedish used car service with a high focus on quality. We provide you with an assortment of dozens of used cars, with new ones added to our website each day. Each car is carefully vetted by our professionals and we never sell a car that doesn't meet our high standards. We spend on average 10 hours replacing parts, fixing dents and scratches, making sure the used car feels like new.</p>
        {<img src={staff} id={style.staffImage} alt="Image of our staff at Bilgagnat."/>}      </div>
      <Form/>
    </div>
  )
}
export default AboutPage
