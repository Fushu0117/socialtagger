import * as supabase from "https://cdn.skypack.dev/@supabase/supabase-js";

const supabaseUrl = "https://azkicerksbuqfeognvvk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6a2ljZXJrc2J1cWZlb2dudnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDUyNDQsImV4cCI6MjAyMDc4MTI0NH0.o64DaZv4kTT_28qsYeGiGsjKt8Xn4tqGJE2jWC_5rTQ";

// Iniciar el cliente de Supabase
const db = supabase.createClient(supabaseUrl, supabaseKey);

const insertLabel = async (text, videoName) => {
  let videoPlayer = document.getElementById('videoPlayer');
  const currentTime = Math.floor(videoPlayer.currentTime); // Obtener el tiempo actual del video en segundos

  // Primero, verifica si ya existe una etiqueta con el mismo texto
  const { data: existingLabels, error: fetchError } = await db
    .from("etiquetas")
    .select("texto")
    .eq("texto", text);

  if (fetchError) {
    console.error(fetchError);
    return;
  }

  // Insertar la nueva etiqueta si no se encontraron coincidencias
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

  // Añadir la etiqueta al div de etiquetas creadas
  const createdLabelsList = document.getElementById("createdLabels");
  const newLabel = document.createElement("li");
  newLabel.textContent = `${text} - Tiempo: ${currentTime}s`;
  createdLabelsList.appendChild(newLabel);

  console.log("La etiqueta se guardó correctamente:", data);

 // Mostrar mensaje si se encuentra una coincidencia
 if (existingLabels.length > 0) {
    const matchMessage = document.getElementById("matchMessage");
    matchMessage.style.display = "block"; // Mostrar el mensaje
  }
};

document.getElementById('botonCrearEtiqueta').addEventListener('click', async () => {
  const labelText = document.getElementById("labelText").value.trim();
  const videoName = '23deoctubre2023_video4.mp4'; // Cambiar esto según el video
  await insertLabel(labelText, videoName);
});
