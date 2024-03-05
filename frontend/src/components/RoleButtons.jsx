import React from "react"

// http://react.tips/radio-buttons-in-reactjs/ :(
const RoleButtons = () => {
    return (
        <div className="container">
            <form>
                <div className="radio">
                    <label>
                        <input type="radio" value="student"/>
                        Student
                    </label>
                        </div>
                        <div className="radio">
                    <label>
                        <input type="radio" value="teacher"/>
                        Teacher
                    </label>
                </div>
            </form>
        </div>
    )
}

export default RoleButtons