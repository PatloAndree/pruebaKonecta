import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Home/Login";
import Inicio from "./Home/Inicio";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
};

export default App;
