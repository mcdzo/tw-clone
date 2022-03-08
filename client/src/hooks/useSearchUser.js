import { useEffect, useState } from "react";
import UserTweetsService from "../services/Tweets/UserTweetsService";
import SearchUserService from "../services/Users/SearchUserService";

const useSearchUser = (username) => {
  const [user, setUser] = useState();
  const [tweets, setTweets] = useState();

  useEffect(() => {
    SearchUserService(username).then((data) => {
      //if exists:
      if (data.value) {
        window.sessionStorage.setItem("user-to-see", JSON.stringify(data.user));
        setUser(data.user);
        UserTweetsService(username).then((data) => {
          window.sessionStorage.setItem("user-tweets", JSON.stringify(data));
          setTweets(data);
        });
      }
    });
  }, [setUser, setTweets]);

  return { user, tweets };
};

export default useSearchUser;
