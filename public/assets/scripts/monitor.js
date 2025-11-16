
document.addEventListener('DOMContentLoaded', () => {
  // Tenta buscar os dados da API
  fetch('http://localhost:3000/videos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Se deu tudo certo, chama a função para criar os gráficos com os dados
      criarGraficos(data);
    })
    .catch(error => {
      // Se falhar (API fora do ar, etc.), mostra um erro no console e na página
      console.error('Falha ao buscar dados:', error);
      document.body.innerHTML = `<h1 style="color: red; text-align: center;">Erro ao carregar dados.</h1><p style="text-align: center;">Verifique se o JSON Server está rodando em ${API_URL}</p>`;
    });
});


function criarGraficos(videos) {
  const ctx1 = document.getElementById('graficoVisualizacoes').getContext('2d');
  const labels1 = videos.map(video => video.titulo);
  const data1 = videos.map(video => video.visualizacoes);

  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: labels1,
      datasets: [{
        label: 'Visualizações',
        data: data1,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      indexAxis: 'y', 
      responsive: true
    }
  });

  const ctx2 = document.getElementById('graficoEngajamento').getContext('2d');
  const labels2 = videos.map(video => video.titulo);
  const dataLikes = videos.map(video => video.likes);
  const dataComentarios = videos.map(video => video.comentarios.length);

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labels2,
      datasets: [
        {
          label: 'Likes 👍',
          data: dataLikes,
          backgroundColor: 'rgba(54, 162, 235, 0.6)' // Azul
        },
        {
          label: 'Comentários 💬',
          data: dataComentarios,
          backgroundColor: 'rgba(255, 99, 132, 0.6)' // Vermelho
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}