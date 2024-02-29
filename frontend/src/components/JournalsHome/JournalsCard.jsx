import {Link} from 'react-router-dom'
import {PiBookOpenTextLight} from 'react-icons/pi'
import {BiUserCircle} from 'react-icons/bi'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineDelete} from 'react-icons/md'
import { GoPlus } from "react-icons/go";
import './JournalsCard.css'

const journalsCard = ({journals}) => {
  return (
    <div className='journal_cards'>
        <Link to="/journals/create">
            <div className='journal_card new'>
                <div className='create_new'>   
                    <div className='plus'><GoPlus /></div>
                    <div>New Journal</div>
                </div>
                
            </div>
        </Link>
        
        {journals.map((item) => (
            <div className='journal_card'  key = {item._id}> 
                <h6 className='card_id'>{item._id}</h6>
                <h2>{item.title}</h2>
                
                {/* <div>
                    <PiBookOpenTextLight />
                    <h2>{item.content}</h2>
                </div> */}
                <div>
                    {/* <BiUserCircle /> */}
                    <h5>{item.visibility}</h5>
                </div>

                <div className='card_operations'>
                    <Link to={`/journals/details/${item._id}`}>
                        <BsInfoCircle />
                    </Link> 

                    <Link to={`/journals/edit/${item._id}`}>
                        <AiOutlineEdit />
                    </Link>

                    <Link to={`/journals/delete/${item._id}`}>
                        <MdOutlineDelete />
                    </Link>
                </div>

                <div className='last_edited'>
                    <h6>Last edited: </h6>
                    <h6>{new Date(item.updatedAt).toLocaleString()}</h6>
                </div>
            
            </div>
        ))}
    </div>
  )
}

export default journalsCard