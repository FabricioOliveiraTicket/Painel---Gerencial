// Segmentos atualizados
const segmentLabels = [
  "Alianças e Parcerias",
  "Top Accounts",
  "Itaú",
  "Mercado Público",
  "Middle",
  "Pequenas Empresas",
  "Produtos Especializados",
  "RB"
];

const featureUsageData = {
  labels: segmentLabels,
  datasets: [{
    label: "Feature Usage",
    data: [21, 13, 33, 17, 9, 7, 12, 15],
    backgroundColor: [
      "#cfe2f3", "#d9ead3", "#fce5cd", "#f4cccc", "#d9d2e9", "#fff2cc", "#d0e0e3", "#ead1dc"
    ]
  }]
};

const accessOverTimeData = {
  labels: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7"],
  datasets: [{
    label: "Acessos",
    data: [102, 114, 98, 130, 140, 150, 126],
    fill: false,
    borderColor: "#2a739e",
    tension: 0.4
  }]
};

const usersBySegmentData = {
  labels: segmentLabels,
  datasets: [{
    label: "Usuários por Segmento",
    data: [6, 8, 2, 4, 5, 7, 3, 4],
    backgroundColor: [
      "#cfe2f3", "#d9ead3", "#fce5cd", "#f4cccc", "#d9d2e9", "#fff2cc", "#d0e0e3", "#ead1dc"
    ]
  }]
};

// Chart.js inicialização
new Chart(document.getElementById('featureUsage'), {
  type: 'bar',
  data: featureUsageData,
  options: {
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } }
  }
});
new Chart(document.getElementById('accessOverTime'), {
  type: 'line',
  data: accessOverTimeData,
  options: {
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } }
  }
});
new Chart(document.getElementById('usersBySegment'), {
  type: 'pie',
  data: usersBySegmentData,
  options: {
    plugins: { legend: { position: 'bottom' } }
  }
});

// Estrelas de avaliação no formulário
const starContainer = document.getElementById('star-rating');
let selectedStars = 0;
for (let i = 1; i <= 5; i++) {
  const star = document.createElement('span');
  star.innerHTML = '★';
  star.className = 'unselected';
  star.onclick = () => {
    selectedStars = i;
    updateStars();
  };
  starContainer.appendChild(star);
}
function updateStars() {
  [...starContainer.children].forEach((s, idx) => {
    s.className = idx < selectedStars ? '' : 'unselected';
  });
}

// Feedbacks de exemplo
const feedbacks = [
  { name: "Alianças e Parcerias", stars: 5, comment: "Excelente integração!", date: "2024-04-01" },
  { name: "Top Accounts", stars: 4, comment: "Recurso muito útil.", date: "2024-04-02" },
  { name: "Itaú", stars: 5, comment: "Ótimo acompanhamento.", date: "2024-04-18" },
  { name: "Mercado Público", stars: 5, comment: "Respondeu as necessidades.", date: "2024-04-01" }
];

// Mostra feedbacks
function renderFeedbacks() {
  const list = document.getElementById('feedback-list');
  list.innerHTML = "";
  feedbacks.forEach(fb => {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    item.innerHTML = `
      <div class="feedback-header">
        <b>${fb.name}</b>
        <span>${fb.date}</span>
      </div>
      <div class="feedback-stars">${'★'.repeat(fb.stars)}${'☆'.repeat(5-fb.stars)}</div>
      <div class="feedback-comment">${fb.comment}</div>
    `;
    list.appendChild(item);
  });
}
renderFeedbacks();

// Envio de feedback do formulário
document.getElementById('feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim() || "Anônimo";
  const comment = document.getElementById('comment').value.trim();
  if (selectedStars === 0) {
    document.getElementById('feedback-message').innerText = "Escolha uma nota!";
    return;
  }
  if (comment.length < 3) {
    document.getElementById('feedback-message').innerText = "Digite um comentário maior.";
    return;
  }
  feedbacks.unshift({ name, stars: selectedStars, comment, date: new Date().toISOString().slice(0,10) });
  renderFeedbacks();
  document.getElementById('feedback-message').innerText = "Obrigado pelo feedback!";
  this.reset();
  selectedStars = 0;
  updateStars();
  setTimeout(() => document.getElementById('feedback-message').innerText = "", 3500);
});