import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import './style.css'

const History = () => {
    const navigate = useNavigate() 
  const [data, setData] = useState([]);
  const [openRoundIndex, setOpenRoundIndex] = useState(null); // Keep track of the opened round index

  const handleHistory = async () => {
    const res = await axios.get("http://localhost:4000/api/data");
    setData(res.data);
  };

  useEffect(() => {
    handleHistory();
  }, []);

  const toggleRoundDetails = (index) => {
    setOpenRoundIndex(openRoundIndex === index ? null : index); // Toggle the open round index
  };

  return (
    <div className="history">
     <div className="top"> <button onClick={()=>navigate('/')}>Back</button><h2>History</h2></div>
      {data.map((item, index) => {
        const time = new Date(item.createdAt)
        return (
          <div className="container" key={index}>
            <div className="head">
                
            <h3>Winner : {item.winner}</h3>
            <p>{time.toLocaleString()}</p>
            </div>
            <div>
              <h5>Player 1 : {item.player1}</h5>
              <h5>Player 2 : {item.player2}</h5>
            </div>
            <div className="rounds">
              <button onClick={() => toggleRoundDetails(index)}>
                {openRoundIndex === index ? "Less History " : "Show more History "}
              </button>
              {openRoundIndex === index && (
                <div>
                  {item.rounds.map((round, i) => {
                    return (
                      <div key={i} className="round">
                        <div className="top">
                        <p>
                          Rounds :{i+1}
                        </p>
                        <p>
                           winner: {round.result}
                        </p>
                        </div>
                        <p className="p">
                          {item.player1} Choice: {round.player1Choice}
                        </p>
                        <p className="p">
                          {item.player2} Choice: {round.player2Choice}
                        </p>
                        
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
