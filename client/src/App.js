import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Notifications from "./pages/Notifications/Notifications";
import Login from "./pages/Login/Login";
import { TweetContextProvider } from "./context/TweetsContext";
import Detail from "./pages/Detail/Detail";

function App() {
  return (
    <div className="App">
      <TweetContextProvider>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/detail/:id" element={<Detail></Detail>}></Route>
          <Route
            path="/notifications"
            element={<Notifications></Notifications>}
          ></Route>
          <Route path="/" element={<Login></Login>}></Route>
        </Routes>
      </TweetContextProvider>
    </div>
  );
}

export default App;
