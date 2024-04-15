import React, { useEffect, useState } from "react";
import axios from "axios";
import './Notifications.css'
import { FaCircle } from "react-icons/fa";

const Notifications = () => {

  useEffect(() => {

  }, []);
  return (
    <>
        <div className="other_container">
            <h3>Notifications</h3>
            <div className="notification">
                <div className="notification_title"><h4>Entry reviewed!</h4><span><FaCircle /></span></div>
                <p>[Teacher name] reviewed your reflection [Entry title]</p>
            </div>
            <div className="notification">
                <div className="notification_title"><h4>Entry reviewed!</h4><span><FaCircle /></span></div>
                <p>[Teacher name] reviewed your reflection [Entry title]</p>
            </div>

            <div className="notification">
                <div className="notification_title"><h4>Entry reviewed!</h4><span></span></div>
                <p>[Teacher name] reviewed your reflection [Entry title]</p>
            </div>
            <div className="notification">
                <div className="notification_title"><h4>Entry reviewed!</h4><span></span></div>
                <p>[Teacher name] reviewed your reflection [Entry title]</p>
            </div>
           
        </div>
    </>
  );
};

export default Notifications;
