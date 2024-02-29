import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5"
import './JournalsTable.css'

const journalsTable = ({journals}) => {
  return (
    <>
    <Link to="/journals/create">
          <button className="new_journal_btn">New Journal</button>
        </Link>
    <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Content</th>
                <th>Visibility</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((journal, index) => (
                <tr key={journal._id}>
                  <td>{index + 1}</td>
                  <td>{journal.title}</td>
                  <td> <pre>{journal.content}</pre> </td>
                  <td>{journal.visibility}</td>
                  <td>
                    <div>
                      <Link to={`/journals/details/${journal._id}`}>
                        <BsInfoCircle />
                      </Link>
                      <Link to={`/journals/edit/${journal._id}`}>
                        <AiOutlineEdit />
                      </Link>
                      <Link to={`/journals/delete/${journal._id}`}>
                        <MdOutlineDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
  )
}

export default journalsTable