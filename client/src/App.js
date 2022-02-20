import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Notifications from "./pages/Notifications/Notifications";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route
          path="/notifications"
          element={<Notifications></Notifications>}
        ></Route>
        <Route path="/" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
