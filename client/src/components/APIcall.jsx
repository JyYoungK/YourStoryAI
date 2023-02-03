export async function APIcall(prompt) {
  const response = await fetch("https://yourstoryai.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  if (response) {
    const data = await response.json();
    console.log(data);
    return data.bot;
  } else {
    alert("Error generating a new sentence");
  }
}
