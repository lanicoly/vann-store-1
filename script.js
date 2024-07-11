//barra de pesquisa
function search() {
    
    // vai pegar tudo o que for escrito no input da pesquisa, ignorar espaços e deixar minusculo
    let input = document.getElementById('search-input').value.trim().toLowerCase();
    
    // pega o campo dos looks onde é inserido cada cartão
    let looksDisponiveis = document.querySelector('.looks-disponiveis');


    // deixa como padrão o campo dos cartões vazio, sem card nenhum
    looksDisponiveis.innerHTML = '';

    // para cada item que estiver na lista roupajson
    roupaJson.forEach((item, index) => {

        // vai pegar o nome do item e deixar minusculo
        let titulo = item.nome.toLowerCase();

        // vai pegar a descricao do item e deixar minusculo
        let descricao = item.descricao.toLowerCase();

        // verifica se o input está em alguma parte do nome ou da descrição do item
        if (titulo.includes(input) || descricao.includes(input)) {

            // se tiver, vai preencher a estrutura do cartão e cloná-lo no campo de roupas disponíveis
            let roupaItem = document.querySelector('.all-cards .base-card .card').cloneNode(true);

            // chama a função que preenche toda a estrutura do card
            preencheDadosRoupas(roupaItem, item, index);
            
            // adiciona ao campo da página o cartão criado
            looksDisponiveis.appendChild(roupaItem);

            // para cada clique em "comprar" no cartão ele impede de submeter e preenche modal

            // essa parte foi inserida em pesquisar pois sem ela, ao filtrar o item desejado, não ocorreria nada pois o padrão de abrir modal é quando não tem pesquisa feita
            roupaItem.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Clicou na roupa');
        
                // vai pegar o indice que se refere a roupa
                let chave = pegarKey(e);

                // abre o modal
                abrirModal();
        
                // preenche a estrutura do modal daquele item que clicou
                preencheDadosModal(item);
        
                // atribui a quantidade de roupas a quantidade selecionada pelo usuario
                document.querySelector('.item--qtd').innerHTML = quantRoupas;
        
                // vai pegar o tamanho selecionado da roupa daquele indice
                escolherTamanho(chave);
        
                });
                // após isso, vai deixar habilitado essas duas funções para caso clicar em cancelar
                botoesFechar();
                fecharModal();
        
        }
    });
}

// essa parte impede que a página mova para cima quando clicar no input. antes de existir, se eu estivesse no final da página e fosse pesquisar, ele arrastava lá para o topo e não queremos isSecureContext. então preveninos o comportamento padrão

let searchInput = document.getElementById('search-input');

searchInput.addEventListener('click', function(event) {
    event.preventDefault();
});


//carrossel

// essa parte serve para deixar sempre a primeira foto selecionada ao inicializar a página e o carrossel
var radio = document.querySelector('.botao-manual');
var qtd = 1;
document.getElementById('radio1').checked = true;
setInterval(() => {
    proximaImg()

    // de tempos em tempos ele avança sozinho para a próxima imagem
}, 5000);

function proximaImg(){
    qtd+=1;

    // vai incrementando o slide em que está e se chegar no ultimo retorna ao primeiro

    if (qtd > 3){
        qtd = 1;
    };

    // deixa como selecionado o input que estiver sendo passado no momento
    document.getElementById('radio'+qtd).checked = true;
}

// a mágica está no CSS, que deixa todas as fotos alinhadas lado a lado mas só mostra na tela a que estiver passando. ele pega a primeira e vai jogando para trás conforme o passar do tempo e depois retorna a ela


//carrinho

// a chave padrão de uma roupa colocada no carrinho é 0
let modalKey = 0;

// quantidade de roupas colocada no carrinho. padrão é 1
let quantRoupas = 1;

// lista de itens dentro do carrinho
let carrinho = [];

// vai formatar o valor com base no tipo, caso o tipo nao seja o desejado para o valor, ele retorna vazio
const formatoReal = (valor) => {
    if (typeof valor !== 'number' || isNaN(valor)) {
        return ''; 
    }
    
    // caso não, ele deixa em formato de dinheiro real
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// o padrão do modal é none, quando essa função é chamada ele exibe com base no que foi preenchido antes de chamar a função
const abrirModal = () => {
 document.querySelector('.carrinho-item').style.display = 'flex';
}

// deixa none novamente
// o modal ele pode ser fechado ao abrir carrinho ou se clicar em um botao
const fecharModal = () => {
    document.querySelector('.carrinho-item').style.display = 'none';
};

// clicando no botao cancelar do modal aberto, ele fecha
const botoesFechar = () => {
        document.querySelector('#botao-cancelar').addEventListener('click', (e) => {

            // prevent default para ele não executar o comportamento de recarregar a pagina
            e.preventDefault();
            fecharModal();
        });
}

// preenche aquilo que vai ser exibido no cartão com base no valor inserido no item respectivo
const preencheDadosRoupas = (roupaItem, item, index) => {
    roupaItem.setAttribute('data-key', index);
    roupaItem.querySelector('.card--img img').src = item.img;
    roupaItem.querySelector('.card-nome').innerHTML = item.nome;
    roupaItem.querySelector('.desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
    roupaItem.querySelector('.valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;
}

// preenche aquilo que vai ser exibido no modal com base no valor inserido no item respectivo
const preencheDadosModal = (item) => {
    document.querySelector('.foto-roupa-modal img').src = item.img;
    document.querySelector('.modal-roupa-info h1').innerHTML = item.nome;
    document.querySelector('.modal-roupa-valor .desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
    document.querySelector('.modal-roupa-valor .valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class passada, ele vai pegar o valor do atributo data-key
    let key = e.currentTarget.closest('.card').getAttribute('data-key');

    console.log('roupa clicada ' + key);
    console.log(roupaJson[key]);

    // garantir que a quantidade iniciar de itens no carrinho daquela peça é 1
    quantRoupas = 1;

    // Para manter a informação de qual pizza foi clicada
    modalKey = key;

    return key;
}

// aqui ele vai pegar o tamanho selecionado pelo usuario no modal. ao clicar em um tamanho ele adquire a classe selected e o que estava antes tem a classe removida
const escolherTamanho = () => {
    document.querySelectorAll('.roupa-info-tamanho').forEach((size) => {
        size.addEventListener('click', () => {
            document.querySelectorAll('.roupa-info-tamanho.selected').forEach((selectedSize) => {
                selectedSize.classList.remove('selected');
            });
            size.classList.add('selected');
        });
    });
};


// essa parte se refere ao botão de + e - que fica ao lado da peça para mudar a quantidade. o padrão é 1
const mudarQuantidade = () => {
    document.querySelector('.item--qtdmais').addEventListener('click', () => {
        quantRoupas++;
        document.querySelector('.item--qtd').innerHTML = quantRoupas;
    });

    document.querySelector('.item--qtdmenos').addEventListener('click', () => {
        if (quantRoupas > 1) {
            quantRoupas--;
            document.querySelector('.item--qtd').innerHTML = quantRoupas;
        }
    });
}

// aqui ao clicar em "adicionar ao carrinho" no modal, ele preenche os dados necessarios para enviar ao carrinho 
const adicionarNoCarrinho = () => {
    document.querySelector('#botao-carrinho').addEventListener('click', (e) => {
        // impede o botao recarregar a pagina
        e.preventDefault();

        // nesses consoles.log ele informa os dados da peça selecionada apenas a fim de controle se está funcionando
        console.log('Adicionar no carrinho');

        console.log('Roupa ' + modalKey);

        // pega o tamanho selecionado da roupa e puxa o data-key dela (PP, P, M, G, GG)
        let size = document.querySelector('.roupa-info-tamanho.selected').getAttribute('data-key');
        console.log('Tamanho ' + size);

        // quantidade de roupas escolhida vai para o carrinho
        console.log('Quantidade ' + quantRoupas);

        // armazena o preço da roupa que estava no modal sendo exibido
        let price = document.querySelector('.modal-roupa-valor .valor').innerHTML.replace('R$ ', '');

        // crie um identificador que junte id e tamanho concatene as duas informacoes separadas por um símbolo
        let identificador = roupaJson[modalKey].id + 't' + size;

        // antes de adicionar verifica se ja tem aquele codigo e tamanho para adicionarmos a quantidade
        let key = carrinho.findIndex((item) => item.identificador == identificador);

        console.log(key);

        // se encontrar aumente a quantidade
        if (key > -1) {
            carrinho[key].qt += quantRoupas;
            console.log(carrinho[key].qt);
        } else {
            // adicionar objeto roupa no carrinho
            let roupa = {
                identificador,
                id: roupaJson[modalKey].id,
                size,
                qt: quantRoupas,
                price: parseFloat(price),
            };
            carrinho.push(roupa);
            console.log(roupa);
            console.log('Sub total R$ ' + (roupa.qt * roupa.price).toFixed(2));
        }

        // quando adiciona ao carrinho ele fecha o modalKey, abre e atualiza o carrinho
        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    })
}

const abrirCarrinho = () => {

// só abre o carrinho se tiver pelo menos 1 item adicionado
if (carrinho.length > 0) {
    document.querySelector('.cart--item').style.display = 'flex';
    document.querySelector('aside').style.display = 'block';
    document.querySelector('main').style.width = '80%';
    document.querySelector('main').style.marginRight = '30%';
}

// ao clicar no icone de carrinho, caso tenha itens no carrinho ele abre
document.querySelector('.menu-openner').addEventListener('click', () => {
    if (carrinho.length > 0) {
        // se o aside estiver aberto, ele fecha clicando no mesmo icone
        if (document.querySelector('aside').style.display == 'block'){
            document.querySelector('aside').style.display = 'none';
            document.querySelector('main').style.width = '100%';
            document.querySelector('main').style.marginRight = '0%';
        } else {
            // se estiver fechado ele abre
            document.querySelector('.cart--item').style.display = 'flex';
            document.querySelector('aside').style.display = 'block';
            document.querySelector('main').style.width = '80%';
            document.querySelector('main').style.marginRight = '30%';
        }
    }
})
    // quando abre o carrinho fecha o modal
    fecharModal();
};
// fecha o carrinho deixando o main completinho e o carrinho oculto
const fecharCarrinho = () => {
    document.querySelector('aside').style.display = 'none';
    document.querySelector('main').style.width = '100%';
    document.querySelector('main').style.marginRight = '0%';

};

const atualizarCarrinho = () => {
    
// se tiver item no carrinho ele toma o cuidado de não duplicar e abre o carrinho
    if (carrinho.length > 0) {
        document.querySelector('.cart--item').style.display = 'flex';
        document.querySelector('aside').display = 'block';
        document.querySelector('main').style.width = '80%';
        document.querySelector('main').style.marginRight = '30%';
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        // vai pegar a quantidade total dos itens
        let quantidadeCarrinho = 0;

        // para todos os itens do carrinho ele vai fazer mudança no que vai ser exibido de valores
        for (let i in carrinho) {

            // vai atribuir à variavel a roupa que ele encontra no json que se refira ao id da roupa atual do loop
            let roupaItem = roupaJson.find((item) => item.id == carrinho[i].id);
            console.log(roupaItem);

            // o subtotal é o valor vezes a quantidade da roupa selecionada no carrinho
            subtotal += (carrinho[i].price * carrinho[i].qt);

            // a quantidade vai ser incrementada a cada item no carrinho
            quantidadeCarrinho += carrinho[i].qt;

            // vai colocar do lado do emoji de carrinho a quantidade de itens que tem atualmente
            document.querySelector('.menu-openner span').innerHTML = quantidadeCarrinho;

            // vai adicionar as informações do item adicionado na estrutura existente
            let carrinhoItem = document.querySelector(".all-cards .cart--item").cloneNode(true);

            // vai colocar dentro do carrinho a estrutura preenchida
            document.querySelector('.cart').append(carrinhoItem);

            // vai pegar o tamanho do item para moder exibir o nome do item e entre parentesis o tamanho selecionadi
            let roupaSizeName = carrinho[i].size;
            let roupaName = `${roupaItem.nome} (${roupaSizeName})`;

            // vai colocar a imagem dele pequenininha o nome e a quantidade
            carrinhoItem.querySelector('img').src = roupaItem.img;
			carrinhoItem.querySelector('.cart--item-nome').innerHTML = roupaName;
			carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

            // posso aumentar a quantidade da roupa clicando em + e atualizar a quantidade de itens no carrinho
			carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				carrinho[i].qt++
				atualizarCarrinho()
			})


            // posso aumentar a quantidade da roupa clicando em - e atualizar a quantidade de itens no carrinho
			carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(carrinho[i].qt > 1) {
                    // so diminui a quantidade se for maior q um
					carrinho[i].qt--
				} else {
                    // remover do carrinho se for zero
					carrinho.splice(i, 1)
				}

                // quando tem nenhum item no carrinho ele fecha
                if (carrinho.length < 1) {
                    document.querySelector('aside').style.display = 'none';
                    document.querySelector('main').style.width = '100%';
                    document.querySelector('main').style.marginRight = '0%';
                }

				atualizarCarrinho();
                // fecharCarrinho();
			})

			document.querySelector('.cart').append(carrinhoItem)
        }

        // fim do for

        desconto = subtotal * 0;
        total = subtotal - desconto;

// aqui vai preencher o valor obtido após somar em todos os cartões e deixar como real
        document.querySelector('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        document.querySelector('.desconto span:last-child').innerHTML = formatoReal(desconto);
        document.querySelector('.total span:last-child').innerHTML = formatoReal(total);

    } else {
        // se n tiver item no carrinho ele fecha e deixa zerado o emoji de carrinho
        document.querySelector('aside').style.display = 'none';
        document.querySelector('main').style.width = '100%';
        document.querySelector('main').style.marginRight = '0%';

        quantidadeCarrinho = 0;
        document.querySelector('.menu-openner span').innerHTML = quantidadeCarrinho;
    }
};

// ao clicar em finalizar compra no carrinho, ele fecha o carrinho e impede o botao de recarregar a pagina
const finalizarCompra = () => {
    document.querySelector('.cart--finalizar').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Finalizar compra');
        document.querySelector('aside').style.display = 'none';
        document.querySelector('main').style.width = '100%';
        document.querySelector('main').style.marginRight = '0%';
    });
};

// aqui ele vai mapear todos os itens da lista json
roupaJson.map((item, index) => {

    // vai clonar todos e inserir no campo de looks disponiveis
    let roupaItem = document.querySelector('.all-cards .base-card .card').cloneNode(true);
    document.querySelector('.looks-disponiveis').append(roupaItem);

    preencheDadosRoupas(roupaItem, item, index);

    // essa parte se refere ao botao de compra que abre o modal
    roupaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Clicou na roupa');

        let chave = pegarKey(e);
        abrirModal();

        preencheDadosModal(item);


        document.querySelector('.item--qtd').innerHTML = quantRoupas;

        escolherTamanho(chave);

        });

        // se selecionar cancelar ele vai fechar modal
        botoesFechar();
        fecharModal();

    });

// fim do mapear as roupas

mudarQuantidade();
adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho();
finalizarCompra();
