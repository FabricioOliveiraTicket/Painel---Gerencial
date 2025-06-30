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
      "#6dcf9e", "#97b6ed", "#ec89b9", "#f6c177", "#83ccc9", "#f78383", "#b59edc", "#a8e063"
    ]
  }]
};
// Aplique segmentLabels em todos os outros gráficos seguindo o mesmo padrão.