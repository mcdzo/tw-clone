import React, { useReducer } from "react";

const TweetContext = React.createContext();

const reducer = (tweets, action) => {
  switch (action.type) {
    case "GET_TWEETS":
      return action.tweets;
    case "ADD_TWEET":
      const newTweet = action.tweet;
      const prevstate = [...tweets];
      prevstate.push(newTweet);
      return prevstate;

    default:
      return tweets;
  }
};

const initialState = [];

export function TweetContextProvider({ children }) {
  const [tweets, dispatch] = useReducer(reducer, initialState);

  return (
    <TweetContext.Provider value={{ tweets, dispatch }}>
      {children}
    </TweetContext.Provider>
  );
}

export default TweetContext;
