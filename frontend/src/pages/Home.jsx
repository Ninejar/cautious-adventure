import React from 'react'
import {Link} from 'react-router-dom'
import {BsInfoCircle} from 'react-icons/bs'
import Navbar from '../components/Navbar'
import LinkItem from '../components/LinkItem'
const Home = () => {
  return (
    <div class="app">
    
    <Navbar />

    <main>
        <div class="link_container">
        <LinkItem />


            <Link to = {`/journals/list`}>
                <div class="link_item">
                <a href="" class="link_item_container">
                    <div>
                        <p class="link_item_header" >Journal</p>
                        <p>Collection of all your journals</p>
                    </div>
                    
                    <img src="" alt=""/>
                </a>
            
                <div class="bottom"><div>List all your journals</div><div></div></div>
                
            </div>
            </Link>
            
            <div class="link_item">
                <a href="" class="link_item_container">
                    <div>
                        <p class="link_item_header" >Private</p>
                        <p>Your portfolio and feedbacks</p>
                    </div>
                    
                    <img src="earth.png" alt=""/>
                </a>
            
                <div class="bottom"><div>Visit your private page</div><div></div></div>
            </div>

            <div class="link_item">
                <a href="" class="link_item_container">
                    <div>
                        <p class="link_item_header" >Shared</p>
                        <p>Your place to communicate</p>
                    </div>
                    
                    <img src="earth.png" alt="" />
                </a>
            
                <div class="bottom"><div>Start communicating</div><div></div></div>
            </div>
        </div>
        <div class="other_container">

        </div>

    </main>
</div>
  )
}

export default Home