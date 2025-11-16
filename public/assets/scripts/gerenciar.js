document.addEventListener('DOMContentLoaded', () => {
    
    const listaVideosContainer = document.getElementById('lista-videos-gerenciar');
    const loadingState = document.getElementById('loading-state');

    if (listaVideosContainer && loadingState) {
        carregarVideosParaGerenciar(listaVideosContainer, loadingState);
    }

});


async function carregarVideosParaGerenciar(container, loadingEl) {
    const url = 'http://localhost:3000/videos';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar vídeos: ${response.statusText}`);
        }
        const videos = await response.json();

        loadingEl.style.display = 'none';

        if (videos.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Você ainda não publicou nenhum vídeo.</p>';
            return;
        }

        container.innerHTML = '';

        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item-gerenciar';
            videoItem.innerHTML = `
                <img src="${video.thumbnail}" alt="Thumbnail do vídeo" class="video-item-thumbnail" onerror="this.src='https://placehold.co/120x67/eee/ccc?text=Erro'">
                <div class="video-item-info">
                    <h5 title="${video.titulo}">${video.titulo}</h5>
                    <p title="${video.canal}">${video.canal}</p>
                </div>
                <div class="video-item-acoes">
                    <button class="btn btn-sm btn-outline-danger btn-deletar">
                        <i class="bi bi-trash-fill"></i> Deletar
                    </button>
                    <!-- Você pode adicionar um botão de editar aqui no futuro -->
                </div>
            `;

            const btnDeletar = videoItem.querySelector('.btn-deletar');
            btnDeletar.addEventListener('click', () => {

                const querDeletar = confirm(`Tem certeza que deseja deletar o vídeo "${video.titulo}"?`);
                if (querDeletar) {
                    deletarVideo(video.id, videoItem);
                }
            });

            container.appendChild(videoItem);
        });

    } catch (error) {
        console.error(error);
        loadingEl.style.display = 'none';
        container.innerHTML = `<div class="alert alert-danger">Falha ao carregar vídeos. Verifique se o json-server está rodando.</div>`;
    }
}

async function deletarVideo(id, elementoVideo) {
    const url = `http://localhost:3000/videos/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Falha ao deletar o vídeo.');
        }

        console.log(`Vídeo ${id} deletado com sucesso.`);

        elementoVideo.style.opacity = '0';
        setTimeout(() => {
            elementoVideo.remove();
        }, 300);

    } catch (error) {
        console.error(error);
        alert(`Erro ao deletar o vídeo: ${error.message}`);
    }
}

