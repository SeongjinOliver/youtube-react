import React, { useCallback, useEffect, useState } from "react";
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from "./components/video_list/video_list";
import VideoDetail from "./components/video_detail/video_detail";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const selectVideo = (video) => {
    setSelectedVideo(video);
  };
  
  // useCallback은 한번 만들면 메모리 상에 계속 보관하기 때문에 많은 영항을 끼칠 수 있음.
  // 자식 컴포넌트가 다시 리랜더링 안되게 하기 위해서만 사용할 때 좋음.
  const search = useCallback((query) => {
    setSelectedVideo(null);
    youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos);
        
      });
  }, [youtube]);

  useEffect(() => {
    youtube
    .mostPopular() // 
    .then(videos => setVideos(videos));
  }, [youtube]);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
