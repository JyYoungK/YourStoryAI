import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { stories } from "../components/generateImages";
import Row from "../components/Row";

const Home = () => {
  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Main stories={stories} />
      <Row rowID="1" title="Recent Releases" pictures={stories} />
      <Row rowID="2" title="Popular" pictures={stories} />
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
