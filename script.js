let currentAnimeId;

        function fetchRandomAnime() {
            fetch('https://api.jikan.moe/v4/random/anime')
                .then(response => response.json())
                .then(data => {
                    const anime = data.data;
                    currentAnimeId = anime.mal_id;
                    document.getElementById('animeInfo').innerHTML = `
                        <h2>${anime.title}</h2>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
                    `;
                    document.getElementById('additionalInfo').innerHTML = '';
                })
                .catch(error => console.error('Error al obtener la información del anime:', error));
        }

        function getAnime() {
            if (currentAnimeId) {
                fetch(`https://api.jikan.moe/v4/anime/${currentAnimeId}`)
                    .then(response => response.json())
                    .then(data => {
                        const anime = data.data;
                        document.getElementById('additionalInfo').innerHTML = `
                            <p>${anime.synopsis}</p>
                            <p><strong>Score:</strong> ${anime.score}</p>
                            <p><strong>Episodes:</strong> ${anime.episodes}</p>
                        `;
                    })
                    .catch(error => console.error('Error al obtener la información del anime:', error));
            } 
            else {
                document.getElementById('response').innerText = 'Primero obtén un anime aleatorio.';
            }
        }