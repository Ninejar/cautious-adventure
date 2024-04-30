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
import '../components/JournalsHome/FilterSort.css'


const Home = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');
  const [sortType, setSortType] = useState('newest'); // Default sorting type
  const [filterType, setFilterType] = useState('all'); // Default filtering type

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('auth-token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    axios
      .get("http://localhost:5353/journals", config)
      .then((res) => {
        let sortedJournals = [...res.data.data];
        if (sortType === 'newest') {
          sortedJournals.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        } else if (sortType === 'oldest') {
          sortedJournals.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        }
        if (filterType !== 'all') {
          sortedJournals = sortedJournals.filter(item => item.visibility === filterType);
        }
        setJournals(sortedJournals);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [sortType, filterType]);

  const handleSortChange = (type) => {
    setSortType(type);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

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
          <div  
            className={showType === 'table' ? 'selected_button' : ''}
            onClick={() => setShowType('table')}>Table
          </div>
        </div>
        <div className="sorting_filters">
          <p>Sort by:</p>
          <select value={sortType} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select value={filterType} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="all">All</option>
            <option value="Private">Private</option>
            <option value="Public">Shared</option>
          </select>
        </div>

        {loading ? (
          <Loading />
        ) : showType === 'card' ? (
            <JournalsCard journals={journals}/>
        ) : (<JournalsTable journals={journals}/>)}
      </div>
    </div>
  );
};

export default Home;
