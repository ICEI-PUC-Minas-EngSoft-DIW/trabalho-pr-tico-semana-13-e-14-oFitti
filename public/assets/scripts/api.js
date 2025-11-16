
let { videos } = require('../../../db/db.json');

app.get('/videos', (req, res) => {
  res.json(videos);
});

app.get('/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === parseInt(req.params.id));
  if (video) {
    res.json(video);
  } else {
    res.status(404).send('Vídeo não encontrado');
  }
});

app.post('/videos', (req, res) => {
  const novoVideo = req.body;
  novoVideo.id = videos.length + 1; 
  videos.push(novoVideo);
  res.status(201).json(novoVideo);
});


app.put('/videos/:id', (req, res) => {
  const idParaAtualizar = parseInt(req.params.id);
  const index = videos.findIndex(v => v.id === idParaAtualizar);

  if (index === -1) {
    return res.status(404).send('Vídeo não encontrado');
  }

  const videoAtualizado = req.body;
  videoAtualizado.id = idParaAtualizar; 

  videos[index] = videoAtualizado;


  res.json(videoAtualizado);
});

app.delete('/videos/:id', (req, res) => {
  const idParaDeletar = parseInt(req.params.id);
  const index = videos.findIndex(v => v.id === idParaDeletar);

  if (index === -1) {
    return res.status(404).send('Vídeo não encontrado');
  }

  const videoDeletado = videos.splice(index, 1);
  
  res.status(200).json(videoDeletado[0]); 
});


app.listen(3000, () => {
  console.log('Servidor Express rodando na porta 3000');
});