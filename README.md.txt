# Dashboard de Validação da API Comercial

Dashboard para acompanhamento em tempo real do uso e validação da API comercial.

## Funcionalidades

- Quantidade de pessoas online (real time)
- Negociações simuladas e seguidas
- Informações por 7 segmentos (cards)
- Status da API em tempo real (online/offline, ping)
- Formulário de feedback para o time comercial

## Como rodar localmente

1. Clone este repositório:
   ```
   git clone https://github.com/FabricioOliveiraTicket/Comercial---Insights.git
   ```
2. Entre na pasta do projeto:
   ```
   cd Comercial---Insights
   ```
3. Abra o arquivo `index.html` no navegador.

## Como publicar no GitHub Pages

1. Faça push dos arquivos para a branch `main` na raiz do repositório.
2. No GitHub, vá em **Settings > Pages**.
3. Em **Source**, escolha `main` e `/ (root)` e salve.
4. Acesse:  
   [https://fabriciooliveiraticket.github.io/Comercial---Insights/](https://fabriciooliveiraticket.github.io/Comercial---Insights/)

---

*Para integração real com API (WebSocket/HTTP), troque os pontos do código JS onde está o comentário de simulação por fetch ou socket conforme sua stack.*