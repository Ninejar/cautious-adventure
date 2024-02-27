import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className="nav_user">
            <div>User</div>
        </div>
        <ul className="ul_main">
            
            <li>Goals</li>

            <li> Journal</li>

            <li> Private</li>

            <li>
                <div>O</div>
                <div>Shared</div>
                <div>V</div>
            </li>
            
        </ul>
        <div className="nav_top"></div>
    </nav>
  )
}

export default Navbar