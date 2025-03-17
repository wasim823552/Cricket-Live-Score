const API_KEY = 'YOUR_CRICAPI_KEY'; // Replace with your CricAPI key
const API_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`;

const scoresElement = document.getElementById('scores');

// Fetch live scores
async function fetchLiveScores() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status === 'success') {
      const matches = data.data;
      let scoresHTML = '';

      matches.forEach(match => {
        scoresHTML += `
          <div class="match">
            <h3>${match.name}</h3>
            <p>${match.status}</p>
            <p>${match.score}</p>
          </div>
          <hr>
        `;
      });

      scoresElement.innerHTML = scoresHTML;
    } else {
      scoresElement.innerHTML = '<p>No live matches at the moment.</p>';
    }
  } catch (error) {
    console.error('Error fetching live scores:', error);
    scoresElement.innerHTML = '<p>Failed to load live scores. Please try again later.</p>';
  }
}

// Fetch scores every 10 seconds
fetchLiveScores();
setInterval(fetchLiveScores, 10000);
