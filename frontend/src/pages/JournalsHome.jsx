import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5"
import { HiOutlineSwitchHorizontal } from "react-icons/hi"
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";
import JournalsCard from "../components/home/JournalsCard";
import JournalsTable from "../components/home/JournalsTable";

const Home = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table')

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
        <div className="backbutton" ><BackButton /></div>
        <h1>Journal list</h1>
        <div className="table_or_card">
          <button onClick={() => setShowType('table')}>Table</button>
          <HiOutlineSwitchHorizontal />
          <button onClick={() => setShowType('card')}>Card</button>
        </div>

        {loading ? (
          <Loading />
        ) : showType === 'table' ? (
            <JournalsTable journals = {journals}/>
        ) : (<JournalsCard journals = {journals}/>)}
      </div>
    </div>
  );
};

export default Home;
