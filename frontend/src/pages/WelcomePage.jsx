import React from 'react';
import { Link } from 'react-router-dom';
import '../components/WelcomePage/WelcomePage.css'; 


const WelcomePage = () => {
  return (
    <>
      <blockquote>
        <p class="welcomeFunctionTitle introduction">Empower Students, </p>
        <p class="welcomeAboutTitle introduction">Engage And Reflect, </p>
        <p class="welcomeSusTitle introduction">Sustainable Future For All </p>
      </blockquote>
      <div class="welcome-content">
        <div class="text">
          <div class="welcomeSus blockOfText">
            <h2 class="welcome-subTitle">About sustainability:</h2>
            <p class="welcomeText">The United Nations has established 17 Sustainable Development Goals to address global challenges and achieve a better and more sustainable future for all by 2030. These goals cover a wide range of issues covering the most important topics. Each goal is interconnected, and the aim is to leave no one behind in the journey towards sustainable development.</p>
          </div>
          <div class="welcomeAbout blockOfText" >
            <h2 class="welcome-subTitle">About the diary's purpose:</h2>
            <p class="welcomeText">The Digital Sustainability Diary is a tool designed to help students engage with and reflect on the UN's sustainability goals. It allows students to journal about their daily actions and thoughts related to sustainability, helping them explore how their activities align with the sustainability development goals and consider ways to contribute to a more sustainable world. This reflective practice promotes personal growth and a deeper understanding of sustainability over time.</p>
          </div>
        </div>
        <div class="side-content">
          <button class="welcomeButtons"><a href="/login" data-testid="loginyouknow">Already registered ?</a></button>
          <button class="welcomeButtons"><a href="/Signup">Signup now !</a></button>
        </div>
        
      </div>

     
    
    </>
  );
};

export default WelcomePage;
