// Obter referências para os elementos da página
const opcao1 = document.querySelector('#opcao1');
const conteudo = document.querySelector('#conteudo');

// Adicionar evento de clique na opção 1 do menu lateral
opcao1.addEventListener('click', function() {
	// Atualizar o conteúdo principal com campos de entrada de números e porcentagens
	conteudo.innerHTML =`
	<div class="resposta">
		<h2>Aumento Salarial</h2>

		<input type="number" placeholder='Digite seu salario bruto' id="numero">

		<input type="number" placeholder='Digite o aumento (%)' id="porcentagem">
		<button id="calcular">CALCULAR</button>
		<div id="resultado">
	</div>
	`;

	// Obter referências para os elementos de entrada e saída de dados
	const numero = document.querySelector('#numero');
	const porcentagem = document.querySelector('#porcentagem');
	const resultado = document.querySelector('#resultado');

	// Adicionar evento de clique no botão de cálculo
	const calcular = document.querySelector('#calcular');
	calcular.addEventListener('click', function() {
		// Obter o valor dos campos de entrada
		const valorNumero = parseFloat(numero.value);
		const valorPorcentagem = parseFloat(porcentagem.value);

		// Validar se os valores são numéricos
		if (isNaN(valorNumero) || isNaN(valorPorcentagem)) {
			resultado.innerText = 'Por favor, digite números válidos.';
			return;
		}

		// Calcular a multiplicação e exibir o resultado
		const resultadoMultiplicacao = valorNumero * (valorPorcentagem / 100);
		resultado.innerHTML = `
		<div class='container-resp'>
			<span class='texto-resposta'>Novo Salário <b>R$ ${(resultadoMultiplicacao + valorNumero).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'BRL' })}</b></span>
			<span class='texto-resposta'>Salário Atual: R$ ${valorNumero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'BRL' })}</span>
			<span class='texto-resposta'>Reajuste: R$ ${resultadoMultiplicacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'BRL' })} (${valorPorcentagem}%) </span>
		</div>`
	});
});

// Adicionar evento de clique na opção 2 do menu lateral
opcao2.addEventListener('click', function() {
	// Atualizar o conteúdo principal com campos de entrada de números e porcentagens
	conteudo.innerHTML = `
	<div class="resposta">
		<h2>Saldo Salarial</h2>
		
		<input type="number" placeholder='Digite o Salario Bruto' id="sal_brut">
		
		<input type="number" placeholder='Dias Trabalhados' id="d_trab">
		<button id="calcular">CALCULAR</button>
		<div id="resultado"></div>
	</div>
	`;

	// Obter referências para os elementos de entrada e saída de dados
	const sal_brut = document.querySelector('#sal_brut');
	const d_trab = document.querySelector('#d_trab');
	const resultado = document.querySelector('#resultado');

	// Adicionar evento de clique no botão de cálculo
	const calcular = document.querySelector('#calcular');
	calcular.addEventListener('click', function() {
			// Obter o valor dos campos de entrada
			const valorsal_brut = parseFloat(sal_brut.value);
			const valord_trab = parseFloat(d_trab.value);
			// Calcular a divisao e exibir o resultado
			const resultadodivisao = (valorsal_brut / 30) * valord_trab;
			resultado.innerHTML = `
			<div class='container-resp'>
				<span class='texto-resposta'>Saldo: R$ <b>${resultadodivisao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'BRL' })}.</b></span>
				<span class='texto-resposta'>Salário bruto: R$ ${valorsal_brut.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: 'BRL' })}</span>
				<span class='texto-resposta'>Dias trabalhados: ${valord_trab}</span> 
			</div>`;
			});
});

// Adicionar evento de clique na opção 3 do menu lateral
opcao3.addEventListener('click', function() {
	// Atualizar o conteúdo principal com campos de entrada de números e porcentagens
	conteudo.innerHTML = `
	<div class="resposta">
	  <h2>Descontos da Folha</h2>

	  <input type="number" placeholder='Salario Bruto' id="sal_brut">

	  <input type="number" placeholder='N° de Dependentes' id="nDependentes">

	  <input type="number" placeholder='Pensao Alimenticia (R$)' id="pensaoAlimenticia">
  
	  <button id="calcular">CALCULAR</button>
	  <div id="resultado"></div>
	</div>
	`;
  
	const calcularButton = document.getElementById("calcular");
	const resultadoDiv = document.getElementById("resultado");
  
	calcularButton.addEventListener("click", function() {
	  const salarioBruto = parseFloat(document.getElementById("sal_brut").value);
	  const numDependentes = parseInt(document.getElementById("nDependentes").value);
	  const pensaoAlimenticia = parseFloat(document.getElementById("pensaoAlimenticia").value);
  
	  // tabela de aliquotas do inss
	  const aliq_1 = [0.00, 1302.00, 0.075, 0];
	  const aliq_2 = [1302.01, 2571.29 , 0.090, 19.53];
	  const aliq_3 = [2571.30, 3856.94, 0.120, 96.67];
	  const aliq_4 = [3856.95, 7507.49, 0.140, 173.81];
  
	  // tabela de aliquotas de IR
	  const alir_0 = [0000, 1903.98, 0.000, 000]
	  const alir_1 = [1903.99, 2826.65, 0.075, 142.80];
	  const alir_2 = [2826.66, 3751.05, 0.150, 354.80];
	  const alir_3 = [3751.06, 4664.68, 0.225, 636.13];
	  const alir_4 = [4664.68, Infinity, 0.275, 869.36];
  
	  // valor de desconto por dependente
	  const Vdepend = 189.59;
  
	  // Inicio do calculo de INSS
	  let r_inss = '';
	  if (salarioBruto <= aliq_1[1]) {
		r_inss = salarioBruto * aliq_1[2];
	  } else if (salarioBruto <= aliq_2[1]) {
		r_inss = salarioBruto * aliq_2[2] - aliq_2[3];
	  } else if (salarioBruto <= aliq_3[1]) {
		r_inss = salarioBruto * aliq_3[2] - aliq_3[3];
	  } else if (salarioBruto <= aliq_4[1]) {
		r_inss = salarioBruto * aliq_4[2] - aliq_4[3];
	  } else {
		r_inss = 877.23;
	  }

	  // Inicio do calculo de IR
var SalBrut = salarioBruto - r_inss - pensaoAlimenticia - (numDependentes * Vdepend);

if (SalBrut <= alir_0[1]) {
  r_ir = SalBrut * alir_0[2] - alir_0[3];
} else if (SalBrut <= alir_1[1]) {
  r_ir = SalBrut * alir_1[2] - alir_1[3];
} else if (SalBrut <= alir_2[1]) {
  r_ir = SalBrut * alir_2[2] - alir_2[3];
} else if (SalBrut <= alir_3[1]) {
	r_ir = SalBrut * alir_3[2] - alir_3[3];
} else {
  r_ir = SalBrut * alir_4[2] - alir_4[3];
}
// Fim do calculo de IR

// Resultado final
var Sliq = salarioBruto - r_ir - r_inss -pensaoAlimenticia;

// Exibir o resultado
resultadoDiv.innerHTML = `
	<div class='container-resp'>
		<span class='texto-resposta'>Salário Liquido: <b>R$: ${Sliq.toFixed(2)} </b></span>
		<span class='texto-resposta'>Salário Bruto: R$ ${salarioBruto.toFixed(2)}</span>
		<span class='texto-resposta'>Desconto Inss: R$ ${r_inss.toFixed(2)}</span>
		<span class='texto-resposta'>Desconto de Pensão: R$ ${pensaoAlimenticia.toFixed(2)}</span>
		<span class='texto-resposta'>Desconto de IR: ${r_ir.toFixed(2)}</span>
</div>`;
})})

// Adicionar evento de clique na opção 4 do menu lateral
opcao4.addEventListener('click', function() {
	// Atualizar o conteúdo principal com campos de entrada de números e porcentagens
	conteudo.innerHTML = `
	<div class='container-resp'>
		<span class='texto-resposta'>Essa opção ainda não esta diponivel, retorne em breve...</span>
	</div>`
})
// Adicionar evento de clique na opção 4 do menu lateral
opcao5.addEventListener('click', function() {
	// Atualizar o conteúdo principal com campos de entrada de números e porcentagens
	conteudo.innerHTML = `
	<div class='container-resp'>
		<span class='texto-resposta'>Essa opção ainda não esta diponivel, retorne em breve...</span>
	</div>`
})