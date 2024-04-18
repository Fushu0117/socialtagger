document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'https://azkicerksbuqfeognvvk.supabase.co-supabase-url';
    const supabaseAnonKey = 'your-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6a2ljZXJrc2J1cWZlb2dudnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDUyNDQsImV4cCI6MjAyMDc4MTI0NH0.o64DaZv4kTT_28qsYeGiGsjKt8Xn4tqGJE2jWC_5rTQ-anon-key';
    const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

        const videoPlayer = new Plyr('#videoPlayer', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
        });
    
        let totalLabels = 0;
        let matchingLabels = 0;
    
        window.saveLabel = async function() {
            const labelText = document.getElementById('labelText').value;
            const videoTime = Math.floor(videoPlayer.currentTime); // Gets the current time of the video in seconds
            const videoName = '06denoviembre2023_video2.mp4'; // Change this based on the video
    
            // Check if the label already exists in the database
            const { data: existingLabels, error: fetchError } = await supabase
                .from('etiquetas')
                .select('id')
                .eq('texto', labelText)
                .eq('video', videoName)
                .single();
    
            if (fetchError) {
                console.error('Error fetching labels:', fetchError);
                return;
            }
    
            if (existingLabels) {
                alert('This label matches an existing one.');
                matchingLabels++;
                document.getElementById('matchingLabels').textContent = matchingLabels;
                return;
            }
    
            // Save the label to the database
            const { data: newLabel, error: saveError } = await supabase
                .from('etiquetas')
                .insert([{ tiempo: videoTime.toString(), texto: labelText, video: videoName }]);
    
            if (saveError) {
                console.error('Error saving label:', saveError);
            } else {
                console.log('Label saved:', newLabel);
                totalLabels++;
                document.getElementById('totalLabels').textContent = totalLabels;
                document.querySelector('.label-message').style.display = 'block';
                document.getElementById('labelText').value = ''; // Clear the input after saving
    
                // Add the created label to the list
                const createdLabelsList = document.getElementById('createdLabels');
                const listItem = document.createElement('li');
                listItem.textContent = `${videoTime}s: ${labelText}`;
                createdLabelsList.appendChild(listItem);
            }
        };
    
        videoPlayer.on('ready', function() {
            console.log('Video 2 is ready to play');
        });
    });
    