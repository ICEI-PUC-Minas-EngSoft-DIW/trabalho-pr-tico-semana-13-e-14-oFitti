async function getVideos() {
    try {
        const response = await fetch('http://localhost:3000/videos');
        if (!response.ok) {
            throw new Error('Erro ao buscar vídeos');
        }
        const videos = await response.json();
        return { videos };
    } catch (error) {
        console.error('Erro:', error);
        return { videos: [] };
    }
}

async function renderizarPaginaDetalhe() {
    dadosVideos = await getVideos();

    const videoId = getUrlParameter('id');
    const video = dadosVideos.videos.find(v => v.id == videoId);

    const container = document.getElementById('detalhe-container');

    if (video) {
        document.title = video.titulo;

        let comentariosHtml = '';
        video.comentarios.forEach(comentario => {
            comentariosHtml += `
                <div class="comentario">
                    <strong class="comentario-autor">${comentario.autor}</strong>
                    <p class="comentario-texto">${comentario.texto}</p>
                </div>
            `;
        });

        container.innerHTML = `
            <!-- 1. Player de Vídeo -->
            <section class="video-player-section mb-4">
                <div class="ratio ratio-16x9">
                    <iframe src="${video.videoUrl}" title="${video.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </section>

            <!-- 2. Título e Informações -->
            <section class="video-info-section">
                <h1 class="titulo-detalhe">${video.titulo}</h1>
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="info-canal my-2">
                        <strong>Canal:</strong> ${video.canal} <br>
                        <span>${video.visualizacoes} • ${video.postadoHa}</span>
                    </div>
                    <div class="info-likes my-2">
                        <i class="bi bi-hand-thumbs-up-fill"></i> ${video.likes}
                    </div>
                </div>
            </section>

            <!-- 3. Descrição -->
            <section class="video-descricao-section my-4">
                <h3>Descrição</h3>
                <p>${video.descricao}</p>
            </section>

            <!-- 4. Comentários -->
            <section class="video-comentarios-section">
                <h3>Comentários</h3>
                ${comentariosHtml}
            </section>
        `;
    } else {
        container.innerHTML = `<h1 class="text-center text-danger">Vídeo não encontrado!</h1>`;
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', async () => {
    renderizarPaginaDetalhe();
});