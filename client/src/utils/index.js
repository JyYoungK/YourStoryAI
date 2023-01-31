// import FileSaver from 'file-saver';
import { coverPhotoPrompts } from "../constant/coverPhotoVariables";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * coverPhotoPrompts.length);
  const randomPrompt = coverPhotoPrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

// export async function downloadImage(_id, photo) {
//   FileSaver.saveAs(photo, `download-${_id}.jpg`);
// }
