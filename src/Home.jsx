import React, { useState, useEffect } from "react";
import { baseUrl } from "./utils/common";
import RecentlyPlayedContainer from "./RecentlyPlayedContainer";
import { FloatingPlayer } from "./FloatingPlayer";
import { HTTP, SPOTIFY_API_URL } from "./utils/constants";
import PropTypes from "prop-types";
import "./Home.scss";

export const Home = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
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

        response.json().then(data => console.log(data));
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
      </div>
      <div className="home">
        <RecentlyPlayedContainer accessToken={accessToken} />
        <FloatingPlayer accessToken={accessToken} />
      </div>
    </>
  );
};

Home.propTypes = {
  location: PropTypes.object
};
