(function () {
	
	var paginaAtual;
	var quantidadeDePaginas;
	
	function inicializar() {
		paginaAtual = obterIdentificadorNumerico(Linda.localizacao().hash);
		adicionarIdentificadores();
		adicionarTratadores();
		irParaPaginaAtual();
	}
	
	function adicionarIdentificadores() {
		var paginas = Linda.selecionarTodos("body > section");
		quantidadeDePaginas = paginas.length;
		var pagina;
		var indice;
		for (indice = 0; indice < paginas.length; ) {
			pagina = paginas[indice];
			indice += 1;
			pagina.setAttribute("id", obterIdentificador(indice));
		}
	}
	
	function irParaPaginaAtual() {
		var identificador = obterIdentificador(paginaAtual);
		Linda.localizacao().hash = identificador;
		tornarPaginaAtualVisivel();
		Linda.selecionar("input.paginaAtual").setAttribute("value", Linda.concatenarComEspaco(paginaAtual, "de", quantidadeDePaginas));
	}
	
	function irParaPaginaPosterior() {
		tornarPaginaAtualInvisivel()
		paginaAtual = (paginaAtual < quantidadeDePaginas) ? paginaAtual + 1 : paginaAtual;
		irParaPaginaAtual();
	}
	
	function irParaPaginaAnterior() {
		tornarPaginaAtualInvisivel();
		paginaAtual = (paginaAtual > 1) ? paginaAtual - 1 : paginaAtual;
		irParaPaginaAtual();
	}
	
	function tornarPaginaAtualInvisivel() {
		var paginas = Linda.selecionarTodos("section.paginaAtual");
		var indice;
		for (indice = 0; indice < paginas.length; indice += 1) {
			paginas[indice].classList.remove("paginaAtual");
		}
	}
	
	function tornarPaginaAtualVisivel() {
		var paginaExibida = Linda.selecionar("#" + obterIdentificador(paginaAtual));
		if (!Linda.nulo(paginaExibida)) {
			paginaExibida.classList.add("paginaAtual");
		}
	}
	
	function obterIdentificador(identificadorNumerico) {
		return Linda.concatenar("pagina", identificadorNumerico);
	}
	
	function obterIdentificadorNumerico(identificador) {
		var numero = Linda.paraInteiro(identificador.replace("pagina", "").replace("#", ""));
		return (Linda.naoNumero(numero)) ? 1 : numero;
	}
	
	function telaCheia() {
		Linda.habilitarTelaCheia();
	}
	
	function telaNormal() {
		Linda.desabilitarTelaCheia();
	}
	
	function adicionarTratadores() {
		new TratadorDeMouse(Linda.selecionar("button.telaCheia")).paraClique(telaCheia);
		new TratadorDeMouse(Linda.selecionar("button.telaNormal")).paraClique(telaNormal);
		new TratadorDeMouse(Linda.selecionar("button.paginaAnterior")).paraClique(irParaPaginaAnterior);
		new TratadorDeMouse(Linda.selecionar("button.paginaPosterior")).paraClique(irParaPaginaPosterior);
		new TratadorDeTeclado(Tecla.DIREITA).paraTeclaPressionada(irParaPaginaPosterior);
		new TratadorDeTeclado(Tecla.ESQUERDA).paraTeclaPressionada(irParaPaginaAnterior);
	}
	
	new TratadorDePagina().paraCarregada(inicializar);
}());

