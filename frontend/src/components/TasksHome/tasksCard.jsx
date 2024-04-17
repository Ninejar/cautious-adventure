import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import {BsInfoCircle} from 'react-icons/bs'
import PropTypes from 'prop-types'; // Import PropTypes
import './tasksCard.css';

const TasksCard = ({ tasks }) => {
  return (
    <div className="task_cards">
      <Link to="/tasks/create">
        <div className="task_card new">
          <div className="create_new">
            <div className="plus">+</div>
            <div>New Task</div>
          </div>
        </div>
      </Link>

      {tasks.map((item) => (
        <Link to={`/tasks/edit/${item._id}`} key={item._id}>
          <div className="task_card">
            <h2>{item.title}</h2>
            <div className="visibility_container">
              {item.visibility === 'Public' ? (
                <span className="--public" title="Shared">
                  <FaEye />
                </span>
              ) : (
                <span className="--private" title="Private">
                  <IoIosLock />
                </span>
              )}
            </div>

            <div className="card_operations">
              <Link to={`/tasks/details/${item._id}`}>
                <BsInfoCircle />
              </Link>

              <Link to={`/tasks/delete/${item._id}`}>
                <MdOutlineDelete />
              </Link>
            </div>

            <div className="last_edited">
              <h6>Last edited: </h6>
              <h6>{new Date(item.updatedAt).toLocaleString()}</h6>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

TasksCard.propTypes = {
    tasks: PropTypes.array.isRequired, // Define PropTypes for tasks prop
  };

export default TasksCard;
