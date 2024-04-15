import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5"
import { FaEye } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import './JournalsTable.css'
import './TableOrCard.css'

const journalsTable = ({journals}) => {
  return (
    <>
     <Link to="/journals/create">
      <div className="new_journal_btn_container" >
        <button className="new_journal_btn">New Journal</button>
      </div>
      </Link>
    <table>
            <thead>
              <tr>
                {/* <th>No</th> */}
                <th>Title</th>
                {/* <th>Content</th> */}
                <th>Visibility</th>
                <th>Last edited</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((journal, index) => (
                <tr key={journal._id}>
                  {/* <td>{index + 1}</td> */}
                  <td>{journal.title}</td>
                  {/* <td> <pre>{journal.content}</pre> </td> */}
                  <td> {journal.visibility === 'Public' ? <> <div className="visibility_container"> <span className="--public"> <abbr title="Shared"><FaEye /></abbr> </span>  </div> </> : <div className="visibility_container"><><span className="--private"> <abbr title="Private"><IoIosLock /></abbr> </span> </></div>   } </td>
                  <td>{new Date(journal.updatedAt).toLocaleString()}</td>
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