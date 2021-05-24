import React, { useEffect, useState } from "react";
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from "./components/video_list/video_list";

function App() {
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("oliver");

  useEffect(() => {
    console.log("useEffect");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyCUvB8Sz1eHI64qbp_-tgDsZWXFfXgZ6d0",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
