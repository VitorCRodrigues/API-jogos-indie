fetch('/api/jogos')
.then(res => res.json())
.then(jogos => {
  const container = document.getElementById('lista-jogos');
  jogos.forEach(jogo => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>${jogo.nome}</h2>
      <p><strong>Gênero:</strong> ${jogo.genero}</p>
      <p><strong>Plataforma:</strong> ${jogo.plataforma}</p>
      <p><strong>Lançamento:</strong> ${jogo.lancamento}</p>
      <p><strong>Dev:</strong> ${jogo.desenvolvedor}</p>
    `;
    container.appendChild(div);
  });
})