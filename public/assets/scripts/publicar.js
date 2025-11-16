document.addEventListener('DOMContentLoaded', () => {

    const formPublicar = document.getElementById('form-publicar-video');

    if (formPublicar) {
        
        formPublicar.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const titulo = document.getElementById('titulo').value;
            const canal = document.getElementById('canal').value;
            const descricao = document.getElementById('descricao').value;
            const videoUrl = document.getElementById('videoUrl').value;
            const thumbnail = document.getElementById('thumbnail').value;
            const banner = document.getElementById('banner').value;

            const novoVideo = {
                titulo: titulo,
                canal: canal,
                descricao: descricao,
                videoUrl: videoUrl,
                thumbnail: thumbnail,
                banner: banner || "https://picsum.photos/id/10/2000/400", 
                
                visualizacoes: "0 visualizações",
                postadoHa: "agora mesmo",
                likes: "0",
                comentarios: []
            };

            await enviarVideoParaAPI(novoVideo);
        });
    }


});


async function enviarVideoParaAPI(video) {
    const url = 'http://localhost:3000/videos'; 

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(video), 
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const videoCriado = await response.json();
        console.log('Vídeo publicado com sucesso:', videoCriado);

        const containerUpload = document.querySelector('.container-upload');
        if (containerUpload) {
            containerUpload.innerHTML = `
                <div class="alert alert-success text-center" role="alert">
                    <h4 class="alert-heading">Publicado com Sucesso!</h4>
                    <p>Seu vídeo já está no CloneTube.</p>
                    <hr>
                    <p class="mb-0">Você será redirecionado para a página inicial em 3 segundos...</p>
                </div>
            `;
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }

    } catch (error) {
        console.error('Falha ao publicar o vídeo:', error);

        const containerUpload = document.querySelector('.container-upload');
        if (containerUpload) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger mt-3';
            errorAlert.setAttribute('role', 'alert');
            errorAlert.textContent = `Erro ao publicar. Verifique se o json-server está rodando na porta 3000. (Erro: ${error.message})`;
                        containerUpload.prepend(errorAlert);
        }
    }
}
