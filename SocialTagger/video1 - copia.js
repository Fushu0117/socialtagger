import * as supabase from "https://cdn.skypack.dev/@supabase/supabase-js";

const supabaseUrl = "https://azkicerksbuqfeognvvk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6a2ljZXJrc2J1cWZlb2dudnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDUyNDQsImV4cCI6MjAyMDc4MTI0NH0.o64DaZv4kTT_28qsYeGiGsjKt8Xn4tqGJE2jWC_5rTQ";

// Queries
const db = supabase.createClient(supabaseUrl, supabaseKey);

const insertLabel = async (text, videoName) => {
    let videoPlayer =document.getElementById('videoPlayer');
  const currentTime = Math.floor(videoPlayer.currentTime); // Obtener el tiempo actual del video en segundos

  const { data, error } = await db.from("etiquetas").insert([
    {
      tiempo: currentTime.toString(),
      texto: text,
      video: videoName,
    },
  ]);

  if (error) {
    console.log(error);
    return;
  }

  console.log("La etiqueta se guardó correctamente:", data);
};

document.getElementById('botonCrearEtiqueta').addEventListener('click', async()=>{
    const labelText = document.getElementById("labelText").value.trim();
    const videoName = '30deoctubre_video1.mp4'; // Cambiar esto según el video
    insertLabel(labelText, videoName);
});



// Manipulación del DOM

/*document.getElementById("insertForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const labelText = document.getElementById("labelText").value.trim();
  const videoName = '30deoctubre_video1.mp4'; // Cambiar esto según el video

  if (!labelText) {
    alert("Por favor, ingresa un texto para la etiqueta.");
    return;
  }

  await insertLabel(labelText, videoName);
});*/
