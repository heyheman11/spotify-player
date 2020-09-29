import React, { useState, useEffect } from "react";
import { baseUrl } from "./utils/common";
import RecentlyPlayedContainer from "./RecentlyPlayed/RecentlyPlayedContainer";
import FloatingPlayerContainer from "./FloatingPlayer/FloatingPlayerContainer";
// import { AlbumPanel } from "./AlbumPanel";
import { HTTP, ENDPOINTS } from "./utils/constants";
import { request } from "./utils/common";
import { Loader } from "./Components/Loader";
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
    request(
      { url: ENDPOINTS.me, method: HTTP.GET, token: accessToken },
      saveDetails
    );
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
          <Loader />
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
