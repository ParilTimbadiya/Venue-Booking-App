import React, { useEffect, useState } from "react";
// import circle from "./circle.png";
import { use } from "react";

const InternationalLiveMatch = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState();
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=efde5522-21df-4992-af0a-8cfb9c78935c"
      );
      const data = await response.json();
      console.log(data);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //   const handleInput = (e) => {
  //     console.log(e.target.value);
  //     setInputData(e.target.value);
  //   };
  //   const handleBtn = () => {
  //     setSearch(inputData);
  //     getData();
  //   };
  return (
    <div className="main-container">
      {/* <div className="searchBar">
        <input
          type="text"
          placeholder="Search Match, series"
          onChange={handleInput}
        />
        <button onClick={handleBtn}>Search</button>
      </div> */}
      {/* <div className="heading"> */}
      {/* <img src={circle} /> */}
      {/* <p>Live Cricket Score App</p>
      </div> */}

      {/* <div className="container min-h-screen bg-gray-900 flex flex-column  flex-nowrap items-center justify-center p-2"> */}
      <div className="container min-h-screen bg-gray-900 grid m-auto grid-cols-2 gap-3 p-4">
        {data ? (
          data.map((curVal) => {
            console.log(curVal);
            if (curVal.status != "Match not started") {
              if (
                curVal.series.includes(search) ||
                curVal.t1.includes(search) ||
                curVal.t2.includes(search)
              ) {
                return (
                  <div className="card m-auto w-full h-80 max-w-md bg-gray-800 text-white rounded-2xl shadow-lg">
                    <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-teal-400 mb-2">
                        {curVal.series}
                      </h3>
                      <h3 className="flex justify-around text-sm text-gray-400">
                        {curVal.matchType}
                      </h3>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex flex-col items-center">
                          <img
                            className="w-12 h-8 rounded-md mb-2"
                            src={curVal.t1img}
                          />
                          <p className="text-lg font-semibold">{curVal.t1}</p>
                          <p className="text-sm">{curVal.t1s}</p>
                        </div>

                        {/* VS Divider */}
                        <div className="text-gray-400 text-xl font-bold">
                          VS
                        </div>

                        <div className="flex flex-col items-center">
                          <img className="w-12 h-8 rounded-md mb-2" src={curVal.t2img} />
                          <p className="text-lg font-semibold">{curVal.t2}</p>
                          <p className="text-sm">{curVal.t2s}</p>
                        </div>
                      </div>
                    </div>
                    {/* <p className="status">Status : {curVal.status}</p> */}
                    <div className="text-center text-lg font-bold text-teal-400 mb-2">{curVal.status}</div>
                    </div>
                  </div>
                );
              }

              if (search === "") {
                return (
                  <div className="card">
                    <h3>{curVal.series}</h3>
                    <h3>{curVal.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={curVal.t1img} />
                        <p>{curVal.t1}</p>
                        <p>{curVal.t1s}</p>
                      </div>
                      <div>
                        <img src={curVal.t2img} />
                        <p>{curVal.t2}</p>
                        <p>{curVal.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {curVal.status}</p>
                  </div>
                );
              }
            }
          })
        ) : (
          <p>Data Not Found !</p>
        )}
      </div>
    </div>
  );
};

export default InternationalLiveMatch;
