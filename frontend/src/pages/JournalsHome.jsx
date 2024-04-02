import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5"
import { HiOutlineSwitchHorizontal } from "react-icons/hi"
import Loading from "../components/Loading";
import BackButton from "../components/BackButton/BackButton";
import Navbar from "../components/NavBar/Navbar";
import JournalsCard from "../components/JournalsHome/JournalsCard";
import JournalsTable from "../components/JournalsHome/JournalsTable";

const Home = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card')

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:1814/journals")
      .then((res) => {
        setJournals(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="backbutton" ><BackButton /> <h1>Journal list</h1></div>
        <div className="table_or_card">
          <div 
            className={showType === 'card' ? 'selected_button' : ''}
            onClick={() => setShowType('card')}> <p>Card</p>
          </div>
          {/* <HiOutlineSwitchHorizontal /> */}
          <div  
            className={showType === 'table' ? 'selected_button' : ''}
            onClick={() => setShowType('table')}>Table
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : showType === 'card' ? (
            <JournalsCard journals = {journals}/>
        ) : (<JournalsTable journals = {journals}/>)}
      </div>
    </div>
  );
};

export default Home;
