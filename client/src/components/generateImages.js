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

export const stories = [
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
];

export const story = stories[Math.floor(Math.random() * stories.length)];
