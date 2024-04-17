import React from 'react'
import Navbar from "../components/NavBar/Navbar";
import BackButton from '../components/BackButton/BackButton';
import '../components/StudentTasks/StudentTasks.css'


 const Tasks = () => {
    return (
        <div className="app">
        <Navbar />
        <div className='content'>
            <div className='student_tasks_container'>
                <h1>Available tasks</h1>
                <div className='student_tasks_wrapper'>
                    <div className='student_tasks'>
                        <h2>Title</h2>
                        <p>Desc</p>
                    </div>

                    <div className='interested'> 
                        <p>Interested?</p>  
                        <div class="checkbox-wrapper-34">
                            <input class='tgl tgl-ios' id='toggle-34' type='checkbox'/>
                            <label class='tgl-btn' for='toggle-34'></label>
                        </div>
                    </div>
                </div>

                <div className='student_tasks_wrapper'>
                    <div className='student_tasks'>
                        <h2>Title</h2>
                        <p>Desc</p>
                    </div>

                    <div className='interested'> 
                        <p>Interested?</p>  
                        <div class="checkbox-wrapper-34">
                            <input class='tgl tgl-ios' id='toggle-36' type='checkbox'/>
                            <label class='tgl-btn' for='toggle-36'></label>
                        </div>
                    </div>
                </div>
                <div className='student_tasks_wrapper'>
                    <div className='student_tasks'>
                        <h2>Title</h2>
                        <p>Desc</p>
                    </div>

                    <div className='interested'> 
                        <p>Interested?</p>  
                        <div class="checkbox-wrapper-34">
                            <input class='tgl tgl-ios' id='toggle-35' type='checkbox'/>
                            <label class='tgl-btn' for='toggle-35'></label>
                        </div>
                    </div>
                </div>
               
            </div>

        </div>
    </div>
);
};
export default Tasks;






  