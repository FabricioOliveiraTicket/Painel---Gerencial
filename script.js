// 1. Simulação dos dados de usuários (ideal: carregar do backend)
const users = [
  { segmento: "Alianças e Parcerias", nome: "Alice", acessos: 1340 },
  { segmento: "Alianças e Parcerias", nome: "Bruno", acessos: 1120 },
  // ... todos os outros usuários ...
  { segmento: "RB", nome: "Valéria", acessos: 1970 }
];

// 2. Função para renderizar a tabela filtrando por segmento
function renderTable(filterSegment = "Todos") {
  const tbody = document.querySelector(".table-card tbody");
  tbody.innerHTML = "";
  users
    .filter(u => filterSegment === "Todos" || u.segmento === filterSegment)
    .forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${u.segmento}</td><td>${u.nome}</td><td>${u.acessos}</td>`;
      tbody.appendChild(tr);
    });
}

// 3. Eventos dos botões/seletores
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    const segmento = btn.textContent;
    renderTable(segmento);
    // aqui você pode também atualizar os gráficos conforme o segmento
  });
});

// Renderiza tudo ao carregar
renderTable();

// 4. Para feedbacks, suponha que feedbacks têm segmento:
const feedbacks = [
  { name: "Alianças e Parcerias", stars: 5, comment: "Excelente integração!", date: "2024-04-01" },
  { name: "RB", stars: 4, comment: "Gostei muito!", date: "2024-04-05" }
  // ... etc ...
];

function renderFeedbacks(filterSegment = "Todos") {
  const list = document.getElementById('feedback-list');
  list.innerHTML = "";
  feedbacks
    .filter(fb => filterSegment === "Todos" || fb.name === filterSegment)
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

// Exemplo: filtro do select na área de feedback
document.querySelector('.feedback-list-card select').addEventListener('change', function() {
  renderFeedbacks(this.value === "Filtrar por Segmento" ? "Todos" : this.value);
});

// Renderiza feedbacks ao carregar
renderFeedbacks();