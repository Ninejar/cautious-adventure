import React from 'react'
import {Link} from 'react-router-dom'
import {BsInfoCircle} from 'react-icons/bs'
import Navbar from "../components/NavBar/Navbar";
import '../components/LinkItem/LinkItem.css'
const Home = () => {
  return (
    <div className="app">
        <Navbar />

        <div className='content'>
        <main>
        <div className="link_container">
            <Link to = {`/journals/list`}>
                <div className="link_item">
                <a href="" className="link_item_container">
                    <div>
                        <p className="link_item_header" >Journal</p>
                        <p>Collection of all your journals</p>
                    </div>
                    
                    <img src="" alt=""/>
                </a>
            
                <div className="bottom"><div>List all your journals</div><div></div></div>
                
            </div>
            </Link>
            
            <Link to = {`/profile`}>
            <div className="link_item">
                <a href="" className="link_item_container">
                    <div>
                        <p className="link_item_header" >Profile</p>
                        <p>Your portfolio and feedbacks</p>
                    </div>
                    
                    <img src="earth.png" alt=""/>
                </a>
            
                <div className="bottom"><div>Visit your private page</div><div></div></div>
            </div>
            </Link>
           

            <div className="link_item">
                <a href="" className="link_item_container">
                    <div>
                        <p className="link_item_header" >Shared</p>
                        <p>Your place to communicate</p>
                    </div>
                    
                    <img src="earth.png" alt="" />
                </a>
            
                <div className="bottom"><div>Start communicating</div><div></div></div>
            </div>
        </div>
        <div className="other_container">
            <h3>Notification center</h3>
            <br></br>
            <p>"Teacher name" reviewed your reflection "Entry title"</p>
            <br></br>
            <p>"Teacher name" reviewed your reflection "Entry title"</p>
            <br></br>
            <p>"Teacher name" reviewed your reflection "Entry title"</p>

        </div>

    </main>
        </div>

</div>
  )
}

export default Home