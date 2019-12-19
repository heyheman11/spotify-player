import React, { useState, useEffect } from "react";
import { baseUrl } from "./common";
import RecentlyPlayedContainer from "./RecentlyPlayedContainer";
import { FloatingPlayer } from "./FloatingPlayer";
import { HTTP, SPOTIFY_API_URL } from "./util/constantss";
import "./Home.scss";

export const Home = ({ location }) => {
  const [accessToken, setAccessToken] = useState(location.state.accessToken);
  const [userDetails, setUserDetail] = useState({});

  if (!accessToken) {
    window.location = baseUrl;
  }

  const saveDetails = data => {
    setUserDetail({
      displayName: data.display_name,
      email: data.email
    });
  };

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}/v1/me`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.status === 401) {
        // Handle a 401
        // Expired token
        response.json().then();
      }
      response.json().then(saveDetails);
    });
  }, []);

  return (
    <>
      <div className="top-container">
        <div className="profile">
          <p>{`logged in as: ${userDetails.displayName}`}</p>
          <p>{`email: ${userDetails.email}`}</p>
        </div>
        {/* <div className="album-scroll">
          <div>
            <img src="https://i.scdn.co/image/cfa68245aa41dc540fcb6c51b5994c81db34eac6"></img>
          </div>
          <div>
            <img src="https://i.scdn.co/image/cfa68245aa41dc540fcb6c51b5994c81db34eac6"></img>
          </div>
        </div> */}
      </div>
      <div className="home">
        <RecentlyPlayedContainer accessToken={accessToken} />
        {/* <FloatingPlayer accessToken={accessToken} /> */}
      </div>
    </>
  );
};
