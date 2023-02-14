import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const token = "b98a69fa62ba3825b70b8a938027a0eb2c84dca5";
  const [city, setCity] = useState("");
  const [qualityIcon, setQualityIcon] = useState("");
  const [qualityDescription, setQualityDescription] = useState("");
  const [location, setlocation] = useState("");
  const [airQualityIndex, setAirQualityIndex] = useState("1");
  const [dataFetched, setDataFetched] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.waqi.info/feed/${city}/?token=${token}`)
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success("🦄 Data Succesfully Fetched!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setlocation(city);
          setAirQualityIndex(res?.data?.data?.aqi);
          setGraphData(res?.data?.data?.forecast?.daily);
          setDataFetched(true);
          console.log("resdd", res?.data.data.forecast.daily);

          if (res?.data?.data?.aqi === "-") {
            setQualityDescription("Data not available");
            setQualityIcon("❌");
          } else if (res?.data?.data?.aqi >= 0 && res?.data?.data?.aqi <= 50) {
            setQualityDescription("Great");
            setQualityIcon("🤩");
          } else if (
            res?.data?.data?.aqi >= 51 &&
            res?.data?.data?.aqi <= 100
          ) {
            setQualityDescription("Moderate");
            setQualityIcon("😕");
          } else if (
            res?.data?.data?.aqi >= 101 &&
            res?.data?.data?.aqi <= 150
          ) {
            setQualityDescription("Sick");
            setQualityIcon("🥴");
          } else if (
            res?.data?.data?.aqi >= 151 &&
            res?.data?.data?.aqi <= 200
          ) {
            setQualityDescription("Harmfull");
            setQualityIcon("😷");
          } else if (
            res?.data?.data?.aqi >= 201 &&
            res?.data?.data?.aqi <= 300
          ) {
            setQualityDescription("Terrible");
            setQualityIcon("🤮");
          } else if (res?.data?.data?.aqi >= 300) {
            setQualityDescription("Dangerous");
            setQualityIcon("🤯");
          }
        }
        console.log(res.data.data);
        if (res.data.status !== "ok") {
          toast.error(res.data.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="container_wrap">
      <form className="search-form">
        <input
          type="search"
          placeholder="Search City"
          className="search-input"
          required
          autocomplete="off"
          onChange={handleCityChange}
          value={city}
        />
        <ToastContainer />
        <button className="search-button" onClick={handleSubmit}>
          Searh
        </button>

        <button className="geo-button">
          <i class="fas fa-map-marker-alt"></i>
        </button>
      </form>
      {dataFetched && (
        <>
          <main className="app-container">
            <div className="location">
              <p>{location.toUpperCase()}</p>
            </div>
            <div className="quality">
              <h1 className="quality-icon">{qualityIcon}</h1>
            </div>
            <div className="quality-description">
              <p>{qualityDescription}</p>
            </div>
            <div className="index-value">
              <p>Air Quality Index -{airQualityIndex}</p>
            </div>{" "}
          </main>
          <div className="view_details">
            <button
              onClick={() =>
                navigate(`/viewdetails/${location}`, { state: graphData })
              }
            >
              View Details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
