import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import Loading from '../components/Loading'
import BackButton from '../components/BackButton'
import Navbar from '../components/Navbar'


const Home = () => {
    const [journals, setJournals] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios
            .get('http://localhost:1814/journals')
            .then((res) => {
                setJournals(res.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])
  return (
    <div className='app'>
    <Navbar />
    <div className='table_container'>
        <BackButton />
        <h1>Journal list</h1>
        <Link to ="/journals/create">
            <MdOutlineAddBox />
        </Link>

        {loading ? (
            <Loading />
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map((journal, index) => (
                        <tr key = {journal._id}>
                            <td>{index + 1}</td>
                            <td>{journal.title}</td>
                            <td>{journal.content}</td>
                            <td>
                                <div>
                                    <Link to = {`/journals/details/${journal._id}`}>
                                        <BsInfoCircle />
                                    </Link>
                                    <Link to = {`/journals/edit/${journal._id}`}>
                                        <AiOutlineEdit />
                                    </Link>
                                    <Link to = {`/journals/delete/${journal._id}`}>
                                        <MdOutlineDelete />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    </div>
  )
}

export default Home