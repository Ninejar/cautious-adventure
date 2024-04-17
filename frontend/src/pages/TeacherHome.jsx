import React from 'react'
import {Link} from 'react-router-dom'
import {BsInfoCircle} from 'react-icons/bs'
import Navbar from "../components/NavBar/Navbar";
import '../components/LinkItem/LinkItem.css'
import '../components/Notifications/Notifications.css'
import { FaCircle } from "react-icons/fa";
const TeacherHome = () => {
  return (
    <div className="app">
        <Navbar />

        <div className='content'>
        <main>
        <div className="link_container">
            
            <Link to = {`/teachers/shared`}>
            <div className="link_item shared">
                <a href="" className="link_item_container">
                    <div>
                        <p className="link_item_header" >Shared</p>
                        <p>View your students entries</p>
                    </div>
                    
                    <img src="earth.png" alt=""/>
                </a>
            
                <div className="bottom"><div>Visit your Shared page</div><div></div></div>
            </div>
            </Link>

            <Link to = {`/teachers/TeacherTaskHome`}>
            <div className="link_item tasks">
                <a href="" className="link_item_container">
                    <div>
                        <p className="link_item_header" >Tasks</p>
                        <p>View your students entries</p>
                    </div>
                    
                    <img src="earth.png" alt=""/>
                </a>
            
                <div className="bottom"><div>Visit your Shared page</div><div></div></div>
            </div>
            </Link>
           
        </div>
        <div className="other_container">
        <h3>Notifications</h3>
            <div className="notification">
                <div className="notification_title"><h4>New student entry!</h4><span><FaCircle /></span></div>
                <p>[Student name] shared [Entry title] with you</p>
            </div>
            <div className="notification">
                <div className="notification_title"><h4>New student entry!</h4><span><FaCircle /></span></div>
                <p>[Student name] shared [Entry title] with you</p>
            </div>

            <div className="notification">
                <div className="notification_title"><h4>New student entry!</h4><span><FaCircle /></span></div>
                <p>[Student name] shared [Entry title] with you</p>
            </div>
            <div className="notification">
                <div className="notification_title"><h4>New student entry!</h4><span></span></div>
                <p>[Student name] shared [Entry title] with you</p>
            </div>
       </div>

    </main>
        </div>

</div>
  )
}

export default TeacherHome