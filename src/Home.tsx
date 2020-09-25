import React, { useState, useEffect } from "react";
import { baseUrl } from "./utils/common";
import RecentlyPlayedContainer from "./RecentlyPlayedContainer";
import FloatingPlayerContainer from "./FloatingPlayer/FloatingPlayerContainer";
// import { AlbumPanel } from "./AlbumPanel";
import { HTTP, SPOTIFY_API_URL } from "./utils/constants";
import "./Home.scss";

interface UserDetails {
  displayName: string;
  email: string;
}

export const Home = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useState(location.state.accessToken);
  const [userDetails, setUserDetail] = useState<UserDetails>();

  if (!accessToken) {
    window.location.assign(baseUrl);
  }

  const saveDetails = (data) => {
    setUserDetail({
      displayName: data.display_name,
      email: data.email,
    });
  };

  useEffect(() => {
    fetch(`${SPOTIFY_API_URL}/v1/me`, {
      method: HTTP.GET,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        response.json().then((data) => console.log(data));
      }
      response.json().then(saveDetails);
    });
  }, []);

  const getProfile = () => {
    return (
      <div className="profile">
        {userDetails && userDetails ? (
          <>
            <p>{`logged in as: ${userDetails?.displayName}`}</p>
            <p>{`email: ${userDetails?.email}`}</p>
          </>
        ) : (
          <div className="profile-loading"></div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="top-container">{getProfile()}</div>
      <main className="home">
        <RecentlyPlayedContainer accessToken={accessToken} />
        <FloatingPlayerContainer accessToken={accessToken} />
      </main>
    </>
  );
};
