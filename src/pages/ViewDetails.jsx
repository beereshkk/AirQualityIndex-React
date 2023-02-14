import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LineChartView from "./LineChart";

import "./ViewDetails.scss";

const ViewDetails = () => {
  const navigate = useNavigate();
  const locationValue = useLocation();
  const graphData = locationValue.state;
  console.log("gg", graphData.o3);
  const { location } = useParams();
  console.log(location);
  const [data, setData] = useState([]);
  const [view, setView] = useState("aqi");
  const [date, setDate] = useState("");
  const [aqi, setAqi] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.waqi.info/search/?token=2d71850fc24edb7443b5922b70f3587eabb14119&keyword=${location}`
      )
      .then((res) => {
        console.log("123", res.data.data[0].aqi);
        setAqi(res.data.data[0].aqi);
        setData(res?.data?.data);
        setDate(res.data.data[0].time.stime.split(" ")[1]);
      })
      .catch();
  }, [location]);

  return (
    <div className="details_wrap">
      <header>
        <nav>
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              <a>{"Back To Home"}</a>
            </li>
            <li>
              <a
                onClick={() => {
                  setView("aqi");
                }}
              >
                {/* Air Quality Index */}
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setView("graph");
                }}
              >
                {/* Deatiled Graph View */}
              </a>
            </li>
          </ul>
        </nav>
        <div className="header_container">
          <div class="searchBar">
            <input
              type="search"
              autocomplete="off"
              class="search-box"
              placeholder="Search by name or zip code..."
              inputmode="search"
            />
            <button id="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </header>
      <div className="main-section">
        <main className="aqi_details">
          <section class="card target" id="currentWeather">
            <div class="location">
              <span class="city"> {location.toUpperCase()} </span>
              <span class="date"> {date}</span>
              <span class="date"> AirQualityIndex {aqi}</span>
            </div>
          </section>
        </main>

        <div className="graphs">
          <div className="graphs_view">
            <div className="o3_graph">
              <p>O3</p>
              <LineChartView data={graphData.o3} />
            </div>{" "}
            <div className="pm10_graph">
              <p>PM10</p>
              <LineChartView data={graphData.pm10} />
            </div>{" "}
            <div className="pm25_graph">
              <p>PM25</p>
              <LineChartView data={graphData.pm25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
