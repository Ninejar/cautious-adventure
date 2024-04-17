import React from 'react'
import '../components/Goals/Goals.css'
import Navbar from "../components/NavBar/Navbar";
import BackButton from '../components/BackButton/BackButton';

 const Goals = () => {
    return (
        <div className="app">
        <Navbar />
        <div className='content'>
            <div className="backbutton"> 
            <BackButton destination='/journals' /> 
                <h1>Sustainability Goals</h1>
            </div>

            <div className="goals-container">
                <h1>Sustainability Goals</h1>
                <div className="goal">
                    <h2>Goal 1: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 2: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
                <div className="goal">
                    <h2>Goal 3: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages.</p>
                </div>
                {/* Add more goals here as needed */}
            </div>
        </div>
    </div>
);
};
export default Goals;