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
                <div className="goal">
                    <h2>Goal 4: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 5: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
                <div className="goal">
                    <h2>Goal 6: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages.</p>
                </div>
                <div className="goal">
                    <h2>Goal 7: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 8: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
                <div className="goal">
                    <h2>Goal 9: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages.</p>
                </div>
                <div className="goal">
                    <h2>Goal 10: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 11: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
                <div className="goal">
                    <h2>Goal 12: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages.</p>
                </div>
                <div className="goal">
                    <h2>Goal 13: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 14: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
                <div className="goal">
                    <h2>Goal 15: Good Health and Well-being</h2>
                    <p>Ensure healthy lives and promote well-being for all at all ages.</p>
                </div>
                <div className="goal">
                    <h2>Goal 16: No Poverty</h2>
                    <p>Eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</p>
                </div>
                <div className="goal">
                    <h2>Goal 17: Zero Hunger</h2>
                    <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
                </div>
            </div>
        </div>
    </div>
);
};
export default Goals;