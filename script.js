// --------------- DADOS ---------------------
// Exemplo de usuários (adicione todos aqui!)
const users = [
  { segmento: "Alianças e Parcerias", nome: "Alice", acessos: 1340 },
  { segmento: "Alianças e Parcerias", nome: "Bruno", acessos: 1120 },
  // ... (adicione todos os outros usuários) ...
  { segmento: "RB", nome: "Valéria", acessos: 1970 }
];

// Segmentos
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

// Feedbacks de exemplo
const feedbacks = [
  { name: "Alianças e Parcerias", stars: 5, comment: "Excelente integração!", date: "2024-04-01" },
  { name: "RB", stars: 4, comment: "Gostei muito!", date: "2024-04-05" },
  { name: "Top Accounts", stars: 5, comment: "Muito eficiente!", date: "2024-05-01" }
  // ... adicione mais feedbacks ...
];

// --------------- DASHBOARD: TABELA ---------------------

function renderTable(filterSegment = null) {
  const tbody = document.querySelector(".table-card tbody");
  tbody.innerHTML = "";
  users
    .filter(u => !filterSegment || u.segmento === filterSegment)
    .forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${u.segmento}</td><td>${u.nome}</td><td>${u.acessos}</td>`;
      tbody.appendChild(tr);
    });
}

// Ativa os chips (botões) para filtro
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove visual do ativo
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("chip-active"));
    btn.classList.add("chip-active");
    const segmento = btn.textContent;
    renderTable(segmento);
    // Se quiser filtrar gráficos, chame função aqui!
  });
});

// Inicializa tabela completa ao carregar
renderTable();

// --------------- FEEDBACKS ---------------------

function renderFeedbacks(filterSegment = null) {
  const list = document.getElementById('feedback-list');
  list.innerHTML = "";
  feedbacks
    .filter(fb => !filterSegment || fb.name === filterSegment)
    .forEach(fb => {
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

// Evento do filtro de segmento nos feedbacks
document.querySelector('.feedback-list-card select').addEventListener('change', function() {
  const segment = this.value;
  if (segment === "Filtrar por Segmento") {
    renderFeedbacks();
  } else {
    renderFeedbacks(segment);
  }
});

// Inicializa feedbacks completos ao carregar
renderFeedbacks();

// --------------- ESTRELAS DE FEEDBACK ---------------------
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

// --------------- GRÁFICOS (opcional: filtrar por segmento) ---------------------
// Para filtrar gráficos, guarde os dados e redesenhe usando Chart.js conforme o segmento selecionado.
// Se quiser, posso adaptar para gráficos também!