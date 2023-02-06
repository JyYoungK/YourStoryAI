import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Main from "../components/Main";
import { stories } from "../components/generateImages";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Row from "../components/Row";

const Home = () => {
  const [createdStories, setCreatedStories] = useState([]);
  const [savedStories, setSavedStories] = useState([]);
  const { user } = UserAuth();
  const [story, setStory] = useState(null);

  useEffect(() => {
    setStory(stories[Math.floor(Math.random() * stories.length)]);
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedStories(doc.data()?.savedShows);
      setCreatedStories(doc.data()?.createdShows);
    });
  }, [user?.email]);

  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Main story={story} />
      {createdStories?.length > 0 && (
        <Row
          rowID="1"
          title="Created Stories"
          pictures={createdStories}
          liked={true}
        />
      )}
      {savedStories?.length > 0 && (
        <Row
          rowID="2"
          title="Saved Stories"
          pictures={savedStories}
          liked={true}
        />
      )}
      <Row rowID="3" title="Recent Releases" pictures={stories} liked={false} />
      <Row rowID="4" title="Popular" pictures={stories} liked={false} />
    </div>
  );
};

export default Home;
