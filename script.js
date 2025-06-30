// =================== DADOS ====================
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

// Exemplo de usuários (agora com campo ano!)
// Para simulação, cada usuário vai ter um campo acessosPorMes (opcional)
// Se não existir, será distribuído igual pelo gráfico de linha
const users = [
  { segmento: "Alianças e Parcerias", nome: "Alice", acessos: 1340, ano: 2024 },
  { segmento: "Alianças e Parcerias", nome: "Bruno", acessos: 1120, ano: 2025 },
  { segmento: "Top Accounts", nome: "Carlos", acessos: 900, ano: 2024 },
  { segmento: "Top Accounts", nome: "Débora", acessos: 1300, ano: 2025 },
  { segmento: "Itaú", nome: "Elisa", acessos: 800, ano: 2024 },
  { segmento: "Itaú", nome: "Fábio", acessos: 1400, ano: 2025 },
  { segmento: "RB", nome: "Giovana", acessos: 1000, ano: 2024 },
  { segmento: "RB", nome: "Valéria", acessos: 1970, ano: 2025 }
  // ... adicione outros usuários e anos conforme necessário ...
];

// Feedbacks de exemplo
const feedbacks = [
  { name: "Alianças e Parcerias", stars: 5, comment: "Excelente integração!", date: "2024-04-01" },
  { name: "RB", stars: 4, comment: "Gostei muito!", date: "2024-04-05" },
  { name: "Top Accounts", stars: 5, comment: "Muito eficiente!", date: "2024-05-01" }
  // ... adicione mais feedbacks ...
];

// =============== USUÁRIOS ONLINE MOCK ===============
const avatarMap = {
  "Alice": "https://randomuser.me/api/portraits/women/44.jpg",
  "Bruno": "https://randomuser.me/api/portraits/men/47.jpg",
  "Carlos": "https://randomuser.me/api/portraits/men/54.jpg",
  "Débora": "https://randomuser.me/api/portraits/women/55.jpg",
  "Elisa": "https://randomuser.me/api/portraits/women/56.jpg",
  "Fábio": "https://randomuser.me/api/portraits/men/58.jpg",
  "Giovana": "https://randomuser.me/api/portraits/women/57.jpg",
  "Valéria": "https://randomuser.me/api/portraits/women/58.jpg"
};
// Função para gerar horário de login aleatório nos últimos 20 minutos
function randomLoginTime() {
  const now = new Date();
  const minAgo = Math.floor(Math.random() * 20); // até 20 minutos atrás
  now.setMinutes(now.getMinutes() - minAgo);
  return now;
}
// Inicializa o mock de usuários online
let onlineUsersMock = [
  { nome: "Alice", avatar: avatarMap["Alice"], login: randomLoginTime() },
  { nome: "Bruno", avatar: avatarMap["Bruno"], login: randomLoginTime() },
  { nome: "Carlos", avatar: avatarMap["Carlos"], login: randomLoginTime() },
  { nome: "Débora", avatar: avatarMap["Débora"], login: randomLoginTime() }
];

// Guardar todos que já apareceram online (simulando acessos únicos à API)
let uniqueOnlineUsers = new Set();
onlineUsersMock.forEach(user => uniqueOnlineUsers.add(user.nome));

// Simula entradas e saídas de usuários online
function mockUpdateOnlineUsers() {
  const nomesPossiveis = Object.keys(avatarMap);
  if (Math.random() > 0.5 && onlineUsersMock.length < nomesPossiveis.length) {
    const candidatos = nomesPossiveis.filter(n => !onlineUsersMock.some(u => u.nome === n));
    if (candidatos.length > 0) {
      const nome = candidatos[Math.floor(Math.random() * candidatos.length)];
      onlineUsersMock.push({
        nome,
        avatar: avatarMap[nome],
        login: randomLoginTime()
      });
      uniqueOnlineUsers.add(nome); // NOVO: registra usuário como "já acessou"
    }
  } else if (onlineUsersMock.length > 1) {
    onlineUsersMock.splice(Math.floor(Math.random() * onlineUsersMock.length), 1);
  }
}

// Nova função para mostrar a quantidade total de pessoas que acessaram a API (mock)
function renderTotalOnlineUsers() {
  const el = document.getElementById('online-users-total');
  if (!el) return;
  el.textContent = `Total de pessoas que acessaram a API: ${uniqueOnlineUsers.size}`;
}

// Formata horário de login para "HH:mm:ss" e quanto tempo atrás
function formatLoginTime(dateObj) {
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  let ago = "";
  if (diffHr > 0) ago = `${diffHr}h ${diffMin % 60}min atrás`;
  else if (diffMin > 0) ago = `${diffMin}min atrás`;
  else ago = "agora";
  // Horário em HH:mm:ss
  const hora = dateObj.toLocaleTimeString("pt-BR").slice(0, 8);
  return `${hora} (${ago})`;
}

// Renderiza o painel de usuários online
function renderOnlineUsersPanel() {
  renderTotalOnlineUsers(); // NOVO
  const el = document.getElementById('online-users-list');
  if (!el) return;
  if (!onlineUsersMock.length) {
    el.innerHTML = "<span>Nenhum usuário online.</span>";
    return;
  }
  el.innerHTML = "";
  onlineUsersMock.forEach(user => {
    const badge = document.createElement('div');
    badge.className = 'online-user-badge';
    // Avatar
    const avatar = document.createElement('img');
    avatar.className = 'online-user-avatar';
    avatar.src = user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.nome);
    avatar.alt = user.nome;
    // Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'online-user-info';
    const nome = document.createElement('span');
    nome.className = "online-user-nome";
    nome.textContent = user.nome;
    const login = document.createElement('span');
    login.className = "online-user-login";
    login.textContent = "Login: " + formatLoginTime(user.login);
    infoDiv.appendChild(nome);
    infoDiv.appendChild(login);

    badge.appendChild(avatar);
    badge.appendChild(infoDiv);
    el.appendChild(badge);
  });
}
// Executa o mock e renderização a cada 5s
setInterval(() => {
  mockUpdateOnlineUsers();
  renderOnlineUsersPanel();
}, 5000);
// Renderiza ao carregar
renderOnlineUsersPanel();

// =================== ESTADO DE FILTRO ====================
let filtroAno = null;
let filtroSegmento = null;

// =================== FUNÇÃO CENTRAL DE FILTRO ====================
function getFilteredUsers() {
  return users.filter(u =>
    (!filtroAno || u.ano == filtroAno) &&
    (!filtroSegmento || u.segmento === filtroSegmento)
  );
}

// =================== DASHBOARD: TABELA ====================
function renderTable() {
  const tbody = document.querySelector(".table-card tbody");
  tbody.innerHTML = "";
  getFilteredUsers().forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.segmento}</td><td>${u.nome}</td><td>${u.acessos}</td>`;
    tbody.appendChild(tr);
  });
}

// =================== DASHBOARD: RESUMO ====================
function updateSummaryCards() {
  // Total Acessos
  const totalAcessos = getFilteredUsers().reduce((acc, u) => acc + u.acessos, 0);
  document.querySelectorAll('.summary-card .summary-value')[0].textContent = totalAcessos;

  // Avg Time (exemplo fixo, personalize se tiver nos dados)
  document.querySelectorAll('.summary-card .summary-value')[1].textContent = "8m 24s";

  // Most Used Feature (exemplo fixo)
  document.querySelectorAll('.summary-card .summary-value')[2].textContent = "Dashboard";
}

// =================== DASHBOARD: GRÁFICOS ===================
let featureChart = null;
let usersPieChart = null;
let accessOverTimeChart = null;

function updateCharts() {
  const filteredUsers = getFilteredUsers();

  // Gráfico de barras: Feature Usage por segmento
  const featureUsageData = {
    labels: segmentLabels,
    datasets: [{
      label: "Usuários",
      data: segmentLabels.map(seg =>
        filteredUsers.filter(u => u.segmento === seg).length
      ),
      backgroundColor: [
        "#cfe2f3", "#d9ead3", "#fce5cd", "#f4cccc", "#d9d2e9", "#fff2cc", "#d0e0e3", "#ead1dc"
      ]
    }]
  };

  // Gráfico de pizza: Usuários por segmento
  const usersBySegmentData = {
    labels: segmentLabels,
    datasets: [{
      label: "Usuários por Segmento",
      data: segmentLabels.map(seg =>
        filteredUsers.filter(u => u.segmento === seg).length
      ),
      backgroundColor: [
        "#cfe2f3", "#d9ead3", "#fce5cd", "#f4cccc", "#d9d2e9", "#fff2cc", "#d0e0e3", "#ead1dc"
      ]
    }]
  };

  // Destroy e recria gráficos para atualizar dados
  if (featureChart) featureChart.destroy();
  featureChart = new Chart(document.getElementById('featureUsage'), {
    type: 'bar',
    data: featureUsageData,
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } }
    }
  });

  if (usersPieChart) usersPieChart.destroy();
  usersPieChart = new Chart(document.getElementById('usersBySegment'), {
    type: 'pie',
    data: usersBySegmentData,
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });

  updateAccessOverTimeChart(); // Atualiza o gráfico de linha também
}

// =================== GRÁFICO DE LINHA: ACESSOS POR MÊS ===================
function updateAccessOverTimeChart() {
  const labels = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const filteredUsers = getFilteredUsers();
  let data = Array(12).fill(0);

  // Distribui os acessos igualmente pelos meses, caso você não tenha acessos por mês real nos dados
  filteredUsers.forEach(u => {
    const base = Math.floor(u.acessos / 12);
    for (let i = 0; i < 12; i++) data[i] += base;
    // distribui o resto pelos primeiros meses
    for (let i = 0; i < u.acessos % 12; i++) data[i]++;
  });

  const chartData = {
    labels,
    datasets: [{
      label: "Acessos",
      data,
      fill: false,
      borderColor: "#2a739e",
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#2a739e"
    }]
  };

  if (accessOverTimeChart) accessOverTimeChart.destroy();
  accessOverTimeChart = new Chart(document.getElementById('accessOverTime'), {
    type: 'line',
    data: chartData,
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { display: false } } }
    }
  });
}

// =================== BOTÕES & FILTROS DASHBOARD ===================
// Filtro ano
document.querySelectorAll(".filters select")[0].addEventListener("change", function() {
  filtroAno = this.value === "Filtrar Ano" ? null : this.value;
  renderTable();
  updateSummaryCards();
  updateCharts();
});

// Select dropdown (segmentos)
document.querySelectorAll(".filters select")[1].addEventListener("change", function() {
  filtroSegmento = this.value === "Segmento" ? null : this.value;
  document.querySelectorAll(".chip").forEach(b => b.classList.remove("chip-active"));
  renderTable();
  updateSummaryCards();
  updateCharts();
});

// Chips (botões coloridos)
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("chip-active"));
    btn.classList.add("chip-active");
    filtroSegmento = btn.textContent;
    document.querySelectorAll(".filters select")[1].selectedIndex = 0;
    renderTable();
    updateSummaryCards();
    updateCharts();
  });
});

// =================== TABLEA INICIAL E GRÁFICOS ===================
renderTable();
updateSummaryCards();
updateCharts();

// =================== FEEDBACKS ===================
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
  renderFeedbacks(segment === "Filtrar por Segmento" ? null : segment);
});

// Inicializa feedbacks completos
renderFeedbacks();

// =================== ESTRELAS DE FEEDBACK ===================
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

// ============= ESTILO OPCIONAL PARA CHIP ATIVO =============
const style = document.createElement('style');
style.textContent = `
.chip-active {
  outline: 2px solid #2a739e;
  box-shadow: 0 0 0 2px #b8d8f1;
}
`;
document.head.appendChild(style);