import { useState } from "react";

const UserContext = React.createContext();

const initialState = JSON.parse(window.sessionStorage.getItem("user"));

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
