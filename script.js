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

// =================== NOVOS DADOS DE SIMULAÇÕES ====================
const simulacoes = [
  { segmento: "Alianças e Parcerias", status: "aprovada", oportunidade: true, ano: 2024 },
  { segmento: "Top Accounts", status: "aprovada", oportunidade: false, ano: 2024 },
  { segmento: "Top Accounts", status: "reprovada", oportunidade: false, ano: 2024 },
  { segmento: "Itaú", status: "aprovada", oportunidade: true, ano: 2025 },
  { segmento: "Itaú", status: "submetida", oportunidade: false, ano: 2025 },
  { segmento: "RB", status: "reprovada", oportunidade: false, ano: 2024 },
  { segmento: "RB", status: "aprovada", oportunidade: true, ano: 2025 },
  { segmento: "Middle", status: "submetida", oportunidade: false, ano: 2025 },
  { segmento: "Middle", status: "aprovada", oportunidade: false, ano: 2025 },
  { segmento: "Pequenas Empresas", status: "aprovada", oportunidade: true, ano: 2025 }
  // ... adicione mais simulações se desejar
];

// Exemplo de usuários (agora com campo ano!)
const users = [
  { segmento: "Alianças e Parcerias", nome: "Alice", acessos: 1340, ano: 2024 },
  { segmento: "Alianças e Parcerias", nome: "Bruno", acessos: 1120, ano: 2025 },
  { segmento: "Top Accounts", nome: "Carlos", acessos: 900, ano: 2024 },
  { segmento: "Top Accounts", nome: "Débora", acessos: 1300, ano: 2025 },
  { segmento: "Itaú", nome: "Elisa", acessos: 800, ano: 2024 },
  { segmento: "Itaú", nome: "Fábio", acessos: 1400, ano: 2025 },
  { segmento: "RB", nome: "Giovana", acessos: 1000, ano: 2024 },
  { segmento: "RB", nome: "Valéria", acessos: 1970, ano: 2025 }
];

// Feedbacks de exemplo
const feedbacks = [
  { name: "Alianças e Parcerias", stars: 5, comment: "Excelente integração!", date: "2024-04-01" },
  { name: "RB", stars: 4, comment: "Gostei muito!", date: "2024-04-05" },
  { name: "Top Accounts", stars: 5, comment: "Muito eficiente!", date: "2024-05-01" }
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
function randomLoginTime() {
  const now = new Date();
  const minAgo = Math.floor(Math.random() * 20);
  now.setMinutes(now.getMinutes() - minAgo);
  return now;
}
let onlineUsersMock = [
  { nome: "Alice", avatar: avatarMap["Alice"], login: randomLoginTime() },
  { nome: "Bruno", avatar: avatarMap["Bruno"], login: randomLoginTime() },
  { nome: "Carlos", avatar: avatarMap["Carlos"], login: randomLoginTime() },
  { nome: "Débora", avatar: avatarMap["Débora"], login: randomLoginTime() }
];
let uniqueOnlineUsers = new Set();
onlineUsersMock.forEach(user => uniqueOnlineUsers.add(user.nome));
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
      uniqueOnlineUsers.add(nome);
    }
  } else if (onlineUsersMock.length > 1) {
    onlineUsersMock.splice(Math.floor(Math.random() * onlineUsersMock.length), 1);
  }
}
function renderTotalOnlineUsers() {
  const el = document.getElementById('online-users-total');
  if (!el) return;
  el.textContent = `Total de pessoas que acessaram a API: ${uniqueOnlineUsers.size}`;
}
function formatLoginTime(dateObj) {
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffMs / 60 / 1000);
  const diffHr = Math.floor(diffMin / 60);
  let ago = "";
  if (diffHr > 0) ago = `${diffHr}h ${diffMin % 60}min atrás`;
  else if (diffMin > 0) ago = `${diffMin}min atrás`;
  else ago = "agora";
  const hora = dateObj.toLocaleTimeString("pt-BR").slice(0, 8);
  return `${hora} (${ago})`;
}
function renderOnlineUsersPanel() {
  renderTotalOnlineUsers();
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
    const avatar = document.createElement('img');
    avatar.className = 'online-user-avatar';
    avatar.src = user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.nome);
    avatar.alt = user.nome;
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
setInterval(() => {
  mockUpdateOnlineUsers();
  renderOnlineUsersPanel();
}, 5000);
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

// =================== FILTRO DAS SIMULAÇÕES ====================
function getFilteredSimulacoes() {
  return simulacoes.filter(s =>
    (!filtroAno || s.ano == filtroAno) &&
    (!filtroSegmento || s.segmento === filtroSegmento)
  );
}

// =================== REGRA DE VALIDAÇÃO DE SIMULAÇÕES ====================
function validarSimulacoes(simulacoesFiltradas) {
  // Agrupa por segmento+ano para validar cada grupo
  const agrupadas = {};
  simulacoesFiltradas.forEach(s => {
    const chave = `${s.segmento}|${s.ano || ""}`;
    agrupadas[chave] = agrupadas[chave] || [];
    agrupadas[chave].push(s);
  });

  let listaFinal = [];
  Object.values(agrupadas).forEach(lista => {
    const submetidas = lista.filter(s => s.status === "submetida");
    const aprovadas = lista.filter(s => s.status === "aprovada");
    const reprovadas = lista.filter(s => s.status === "reprovada");
    const oportunidades = lista.filter(s => s.status === "aprovada" && s.oportunidade);

    // Regra: submetidas >= aprovadas, reprovadas, oportunidades
    const maxPermitido = Math.max(aprovadas.length, reprovadas.length, oportunidades.length);
    let faltam = maxPermitido - submetidas.length;
    let listaCorrigida = [...lista];

    for (let i = 0; i < faltam; i++) {
      listaCorrigida.push({
        segmento: lista[0].segmento,
        status: "submetida",
        oportunidade: false,
        ano: lista[0].ano
      });
    }
    listaFinal = listaFinal.concat(listaCorrigida);
  });
  return listaFinal;
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
  const totalAcessos = getFilteredUsers().reduce((acc, u) => acc + u.acessos, 0);
  document.querySelectorAll('.summary-card .summary-value')[0].textContent = totalAcessos;
  document.querySelectorAll('.summary-card .summary-value')[1].textContent = "8m 24s";
  document.querySelectorAll('.summary-card .summary-value')[2].textContent = "Dashboard";
}

// =================== DASHBOARD: GRÁFICOS ===================
let featureChart = null;
let usersPieChart = null;
let accessOverTimeChart = null;

function updateCharts() {
  const filteredUsers = getFilteredUsers();

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

  updateAccessOverTimeChart();
}

// =================== GRÁFICO DE LINHA: ACESSOS POR MÊS ===================
function updateAccessOverTimeChart() {
  const labels = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const filteredUsers = getFilteredUsers();
  let data = Array(12).fill(0);
  filteredUsers.forEach(u => {
    const base = Math.floor(u.acessos / 12);
    for (let i = 0; i < 12; i++) data[i] += base;
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

// =================== SIMULAÇÕES: LÓGICA E RENDERIZAÇÃO ====================
function getSimulacoesResumo() {
  const filtered = validarSimulacoes(getFilteredSimulacoes());
  const total = filtered.length;
  const aprovadas = filtered.filter(s => s.status === "aprovada").length;
  const reprovadas = filtered.filter(s => s.status === "reprovada").length;
  const submetidas = filtered.filter(s => s.status === "submetida").length;
  const oportunidades = filtered.filter(s => s.status === "aprovada" && s.oportunidade).length;
  return { total, aprovadas, reprovadas, submetidas, oportunidades };
}
function getSimulacoesPorSegmento() {
  const filtered = validarSimulacoes(getFilteredSimulacoes());
  const porSegmento = {};
  segmentLabels.forEach(seg => {
    const sims = filtered.filter(s => s.segmento === seg);
    porSegmento[seg] = {
      total: sims.length,
      aprovadas: sims.filter(s => s.status === "aprovada").length,
      reprovadas: sims.filter(s => s.status === "reprovada").length,
      oportunidades: sims.filter(s => s.status === "aprovada" && s.oportunidade).length,
      submetidas: sims.filter(s => s.status === "submetida").length
    };
  });
  return porSegmento;
}
function renderSimulacoesResumo() {
  const { total, aprovadas, reprovadas, submetidas, oportunidades } = getSimulacoesResumo();
  document.getElementById('simulacoes-resumo').innerHTML = `
    <b>Total:</b> ${total} &nbsp; 
    <b>Submetidas:</b> ${submetidas} &nbsp; 
    <b>Aprovadas:</b> ${aprovadas} &nbsp; 
    <b>Reprovadas:</b> ${reprovadas} &nbsp; 
    <b>Oportunidades:</b> ${oportunidades}
  `;
}
function renderSimulacoesPorSegmento() {
  const dados = getSimulacoesPorSegmento();
  let html = `<table><tr><th>Segmento</th><th>Total</th><th>Submetidas</th><th>Aprovadas</th><th>Reprovadas</th><th>Oportunidades</th></tr>`;
  segmentLabels.forEach(seg => {
    const s = dados[seg];
    html += `<tr><td>${seg}</td><td>${s.total}</td><td>${s.submetidas}</td><td>${s.aprovadas}</td><td>${s.reprovadas}</td><td>${s.oportunidades}</td></tr>`;
  });
  html += `</table>`;
  document.getElementById('simulacoes-por-segmento').innerHTML = html;
}
let simulacoesSegmentoChart = null;
function renderSimulacoesSegmentoChart() {
  const dados = getSimulacoesPorSegmento();
  const labels = segmentLabels;
  const submetidas = labels.map(seg => dados[seg].submetidas);
  const aprovadas = labels.map(seg => dados[seg].aprovadas);
  const reprovadas = labels.map(seg => dados[seg].reprovadas);
  const oportunidades = labels.map(seg => dados[seg].oportunidades);
  if (simulacoesSegmentoChart) simulacoesSegmentoChart.destroy();
  simulacoesSegmentoChart = new Chart(document.getElementById('simulacoesSegmentoChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Submetidas', data: submetidas, backgroundColor: '#bde1fa' },
        { label: 'Aprovadas', data: aprovadas, backgroundColor: '#7fc97f' },
        { label: 'Reprovadas', data: reprovadas, backgroundColor: '#fdc086' },
        { label: 'Oportunidades', data: oportunidades, backgroundColor: '#beaed4' }
      ]
    },
    options: {
      plugins: { legend: { position: 'bottom' } },
      responsive: true,
      scales: { x: { stacked: true }, y: { beginAtZero: true, stacked: true } }
    }
  });
}
function updateSimulacoesView() {
  renderSimulacoesResumo();
  renderSimulacoesPorSegmento();
  renderSimulacoesSegmentoChart();
}

// =================== BOTÕES & FILTROS DASHBOARD ===================
document.querySelectorAll(".filters select")[0].addEventListener("change", function() {
  filtroAno = this.value === "Filtrar Ano" ? null : this.value;
  renderTable();
  updateSummaryCards();
  updateCharts();
  updateSimulacoesView();
});
document.querySelectorAll(".filters select")[1].addEventListener("change", function() {
  filtroSegmento = this.value === "Segmento" ? null : this.value;
  document.querySelectorAll(".chip").forEach(b => b.classList.remove("chip-active"));
  renderTable();
  updateSummaryCards();
  updateCharts();
  updateSimulacoesView();
});
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("chip-active"));
    btn.classList.add("chip-active");
    filtroSegmento = btn.textContent;
    document.querySelectorAll(".filters select")[1].selectedIndex = 0;
    renderTable();
    updateSummaryCards();
    updateCharts();
    updateSimulacoesView();
  });
});

// =================== TABLEA INICIAL E GRÁFICOS ===================
renderTable();
updateSummaryCards();
updateCharts();
updateSimulacoesView();

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
document.querySelector('.feedback-list-card select').addEventListener('change', function() {
  const segment = this.value;
  renderFeedbacks(segment === "Filtrar por Segmento" ? null : segment);
});
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
const style = document.createElement('style');
style.textContent = `
.chip-active {
  outline: 2px solid #2a739e;
  box-shadow: 0 0 0 2px #b8d8f1;
}
`;
document.head.appendChild(style);