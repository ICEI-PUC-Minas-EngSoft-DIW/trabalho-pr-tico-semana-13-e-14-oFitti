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

async function renderizarPaginaIndex() {
    dadosVideos = await getVideos();
    const bannerContainer = document.getElementById('bannerCarouselInner');
    const gradeVideosContainer = document.getElementById('grade-videos');

    if (bannerContainer && gradeVideosContainer) {
        bannerContainer.innerHTML = '';
        gradeVideosContainer.innerHTML = '';

        dadosVideos.videos.slice(0, 3).forEach((video, index) => {
            const bannerItem = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <a href="detalhe.html?id=${video.id}">
                        <img src="${video.banner}" class="d-block w-100" alt="Banner para ${video.titulo}">
                    </a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${video.titulo}</h5>
                        <p>${video.canal}</p>
                    </div>
                </div>
            `;
            bannerContainer.innerHTML += bannerItem;
        });

        dadosVideos.videos.forEach(video => {
            const videoCard = `
                <div class="col">
                    <article class="card-video h-100">
                        <a href="detalhe.html?id=${video.id}">
                            <img src="${video.thumbnail}" alt="Miniatura do vídeo ${video.titulo}" class="miniatura-video">
                            <div class="informacoes-video">
                                <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="nome-canal">${video.canal}</p>
                                <div class="metadados-video">
                                    <span class="visualizacoes-video">${video.visualizacoes}</span>
                                    <span class="tempo-video">${video.postadoHa}</span>
                                </div>
                            </div>
                        </a>
                    </article>
                </div>
            `;
            gradeVideosContainer.innerHTML += videoCard;
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    renderizarPaginaIndex();
});