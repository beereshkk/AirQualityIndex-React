import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ViewDetails from "./pages/ViewDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewDetails/:location" element={<ViewDetails />} />
    </Routes>
  );
}

export default App;
