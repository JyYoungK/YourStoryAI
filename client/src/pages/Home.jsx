import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import {
  actionUrls,
  adventureUrls,
  comedyUrls,
  crimeUrls,
  dramaUrls,
  fantasyUrls,
  historicalUrls,
  horrorUrls,
  knowledgeUrls,
  mysteryUrls,
  mythologyUrls,
  natureUrls,
  romanceUrls,
  scifiUrls,
} from "../constant/coverPhotoVariables";
import Row from "../components/Row";

const Home = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    setStories([
      ...actionUrls,
      ...adventureUrls,
      ...comedyUrls,
      ...crimeUrls,
      ...dramaUrls,
      ...fantasyUrls,
      ...historicalUrls,
      ...horrorUrls,
      ...knowledgeUrls,
      ...mysteryUrls,
      ...mythologyUrls,
      ...natureUrls,
      ...romanceUrls,
      ...scifiUrls,
    ]);
  }, []);

  return (
    <div>
      <Main stories={stories} />
      <Row rowId="1" title="Recent Releases" pictures={stories} />
      <Row rowId="2" title="Popular" pictures={stories} />
      {/* <Row rowId="3" title="Action" pictures={actionUrls} />
      <Row rowId="4" title="Adventure" pictures={adventureUrls} />
      <Row rowId="5" title="Comedy" pictures={comedyUrls} />
      <Row rowId="6" title="Crime" pictures={crimeUrls} />
      <Row rowId="7" title="Drama" pictures={dramaUrls} />
      <Row rowId="8" title="Fantasy" pictures={fantasyUrls} />
      <Row rowId="9" title="Historical" pictures={historicalUrls} />
      <Row rowId="10" title="Horror" pictures={horrorUrls} />
      <Row rowId="11" title="Knowledge" pictures={knowledgeUrls} />
      <Row rowId="12" title="Mystery" pictures={mysteryUrls} />
      <Row rowId="13" title="Mythology" pictures={mythologyUrls} />
      <Row rowId="14" title="Nature" pictures={natureUrls} />
      <Row rowId="15" title="Romance" pictures={romanceUrls} />
      <Row rowId="16" title="SciFi" pictures={scifiUrls} /> */}
    </div>
  );
};

export default Home;
