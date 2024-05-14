import React, {useState} from "react"
import BackButton from "../components/BackButton/BackButton"
import Loading from "../components/Loading"
import Navbar from "../components/NavBar/Navbar"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const DeleteTask = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    const token = localStorage.getItem("auth-token")
    const config = {
        headers: {
            "auth-token": token
        }
    }

    const handleDeleteTask = () => {
        setLoading(true)
        axios.delete("http://localhost")
    }
}

