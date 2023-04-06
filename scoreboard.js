  // Retrieve high scores from localStorage
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Sort high scores in descending order
  highScores.sort((a, b) => b.score - a.score);
  
  // Add high scores to the table
  const scoreTable = document.getElementById('scoretable');
  console.log(scoreTable);
  highScores.forEach((score) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${score.initials}</td>
      <td>${score.score}</td>
    `;
    scoreTable.appendChild(row);
  });