function getAllscoresPrint() {
  let allScores = JSON.parse(localStorage.getItem("scores"));
  allScores.sort((a, b) => {
    return b.score - a.score;
  });

  let ui = "";
  for (let i = 0; i < allScores.length; i++) {
    ui += `<li><span>${i + 1}.</span> <span style="margin-left: 10px;">${
      allScores[i].initials
    } - ${allScores[i].score}</span></li>`;
  }

  document.querySelector(".score-list").innerHTML = ui;
}

function clearScores() {
  localStorage.setItem("scores", "[]");
  getAllscoresPrint();
}

function goBack() {
  window.location = "/index.html";
}

window.onload = getAllscoresPrint;
