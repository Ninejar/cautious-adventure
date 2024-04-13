import React from 'react'
import {Link} from 'react-router-dom'
import {BsInfoCircle} from 'react-icons/bs'
import Navbar from "../components/NavBar/Navbar";
import '../components/LinkItem/LinkItem.css'
const TeacherHome = () => {
  return (
    <div className="app">
        <Navbar />

        <div className='content'>
        <main>
        <div className="link_container">
            
            <Link to = {`/teachers/shared`}>
            <div className="link_item">
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
           
        </div>
        <div className="other_container">

        </div>

    </main>
        </div>

</div>
  )
}

export default TeacherHome