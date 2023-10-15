import { server } from "./server.js"
const form = document.querySelector('#form');
const inp = document.querySelector('#url');
const cont = document.querySelector('#content');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  cont.classList.add("placeholder")
  const videoURL = inp.value;
  
  if (!videoURL.includes("shorts")){
    return cont.textContent = "Esse vídeo não é um short.";
  }

  const [_, params] = videoURL.split("/shorts/");
  const [videoID] = params.split("?si");
  cont.textContent = "Obtendo o texto do áudio...";

  const transcription = await server.get("/summary/" + videoID);
  cont.textContent = "Realizando o resumo...";

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  });

  cont.textContent = summary.data.result
  cont.classList.remove("placeholder");
});