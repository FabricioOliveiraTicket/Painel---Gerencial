// Simulação de atualização em tempo real
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Segmentos de exemplo
const segmentos = [
    "Indústria", "Varejo", "Serviços", "Agronegócio", "Saúde", "Educação", "Financeiro"
];

// Estado simulado
let stats = {
    onlineUsers: randomInt(3, 15),
    simulations: randomInt(20, 60),
    followed: randomInt(10, 35),
    segmentos: segmentos.map(nome => ({
        nome,
        simulacoes: randomInt(2, 14)
    })),
    apiOnline: true,
    apiPing: 120 // ms
};

// Atualiza cards principais
function updateStats() {
    document.getElementById('online-users').innerText = stats.onlineUsers;
    document.getElementById('simulations').innerText = stats.simulations;
    document.getElementById('followed').innerText = stats.followed;
}

// Atualiza informações por segmento
function updateSegmentos() {
    const container = document.getElementById('segmentos-list');
    container.innerHTML = "";
    stats.segmentos.forEach(seg => {
        const div = document.createElement("div");
        div.className = "segmento-card";
        div.innerHTML = `<h3>${seg.nome}</h3><p>${seg.simulacoes}</p>`;
        container.appendChild(div);
    });
}

// Atualiza status da API
function updateApiStatus() {
    const statusDiv = document.getElementById('api-status');
    statusDiv.innerHTML = `Status API: <span class="badge ${stats.apiOnline ? 'online' : 'offline'}">${stats.apiOnline ? 'Online' : 'Offline'}</span> <span style="font-size:0.92em;color:#252">${stats.apiOnline ? `${stats.apiPing}ms` : ''}</span>`;
}

// Simula atualização em tempo real (substitua por fetch/ws na integração real)
function simulateRealtime() {
    setInterval(() => {
        // Simule mudanças nos dados
        stats.onlineUsers = randomInt(3, 17);
        stats.simulations += randomInt(0, 3);
        stats.followed += randomInt(0, 2);
        stats.segmentos.forEach(seg => seg.simulacoes += randomInt(0, 1));
        // Simula API oscilando
        stats.apiOnline = Math.random() > 0.04;
        stats.apiPing = stats.apiOnline ? randomInt(90, 210) : 0;
        updateStats();
        updateApiStatus();
        updateSegmentos();
    }, 4000);
}

// Feedback
const feedbackForm = document.getElementById('feedback-form');
const feedbackMsg = document.getElementById('feedback-msg');
feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const txt = document.getElementById('feedback-text').value.trim();
    if (txt.length < 5) {
        feedbackMsg.style.color = "#d32f2f";
        feedbackMsg.textContent = "Por favor, escreva um feedback mais detalhado.";
        return;
    }
    // Aqui você pode fazer um fetch para enviar para sua API de feedback
    feedbackMsg.style.color = "#31b74a";
    feedbackMsg.textContent = "Obrigado pelo feedback! Sua mensagem foi enviada.";
    feedbackForm.reset();
    setTimeout(() => feedbackMsg.textContent = "", 5000);
});

// Inicialização
updateStats();
updateApiStatus();
updateSegmentos();
simulateRealtime();