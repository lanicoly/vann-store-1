//carrossel

var radio = document.querySelector('.botao-manual');
var qtd = 1;
document.getElementById('radio1').checked = true;
setInterval(() => {
    proximaImg()
}, 5000);

function proximaImg(){
    qtd+=1;

    if (qtd > 3){
        qtd = 1;
    };

    document.getElementById('radio'+qtd).checked = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuOpenner = document.querySelector('.menu-openner');
    const janelaVenda = document.querySelector('.janela-venda');
    const botaoCancelar = document.querySelector('#botao-cancelar');

    // Abrir o menu do carrinho ao clicar no ícone
    menuOpenner.addEventListener('click', function() {
        janelaVenda.style.display = 'block'; // Ou outra lógica para mostrar o menu
    });

    // Fechar o menu do carrinho ao clicar no botão cancelar
    botaoCancelar.addEventListener('click', function(event) {
        event.preventDefault();
        janelaVenda.style.display = 'none'; // Ou outra lógica para esconder o menu
    });
});


// Variáveis globais
let modalKey = 0;
let quantRoupas = 1;
let carrinho = [];

// Funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);
const formatoReal = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatoMonetario = (valor) => valor.toFixed(2);

// Funções da aula 05 e 06 adaptadas
const abrirModal = () => {
    seleciona('.carrinho-item').style.display = 'flex';
};

const fecharModal = () => {
    seleciona('.carrinho-item').style.display = 'none';
};

const pegarKey = (e) => {
    let key = e.currentTarget.closest('.card').getAttribute('data-key');
    console.log('roupa clicada ' + key);
    console.log(roupaJson[key]);

    quantRoupas = 1;
    modalKey = key;

    document.querySelectorAll('.roupa-info-tamanho').forEach((size) => {
        size.addEventListener('click', (e) => {
            document.querySelectorAll('.roupa-info-tamanho').forEach((el) => {
                el.classList.remove('selected');
            });
            size.classList.add('selected');
        });
    });

    return key;
};

const adicionarNoCarrinho = () => {
    document.querySelector('#botao-carrinho').addEventListener('click', () => {
        console.log('Adicionar no carrinho');

        console.log('Roupa ' + modalKey);

        let size = document.querySelector('.roupa-info-tamanho.selected').getAttribute('data-key');
        console.log('Tamanho ' + size);

        console.log('Quantidade ' + quantRoupas);

        let price = document.querySelector('.modal-roupa-valor .valor').innerHTML.replace('R$ ', '');

        let identificador = roupaJson[modalKey].id + 't' + size;

        let key = carrinho.findIndex((item) => item.identificador == identificador);

        console.log(key);

        if (key > -1) {
            carrinho[key].qt += quantRoupas;
        } else {
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

        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    });
};

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + carrinho.length);
    if (carrinho.length > 0) {
        document.querySelector('aside').classList.add('show');
    }

    document.querySelector('.menu-openner').addEventListener('click', () => {
        if (carrinho.length > 0) {
            document.querySelector('aside').classList.add('show');
            document.querySelector('aside').style.left = '0';
        }
    });
};

const fecharCarrinho = () => {
    document.querySelector('.menu-closer').addEventListener('click', () => {
        document.querySelector('aside').style.left = '100vw';
    });
};

const atualizarCarrinho = () => {
    document.querySelector('.menu-openner span').innerHTML = carrinho.length;

    if (carrinho.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in carrinho) {
            let roupaItem = roupaJson.find((item) => item.id == carrinho[i].id);
            console.log(roupaItem);

            subtotal += carrinho[i].price * carrinho[i].qt;

            let carrinhoItem = document.querySelector(".models .cart--item").cloneNode(true);

            document.querySelector('.cart').append(carrinhoItem);

            let roupaSizeName = carrinho[i].size;
            let roupaName = `${roupaItem.nome} (${roupaSizeName})`;

            carrinhoItem.querySelector('img').src = roupaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = roupaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais');
                carrinho[i].qt++;
                atualizarCarrinho();
            });

            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos');
                if (carrinho[i].qt > 1) {
                    carrinho[i].qt--;
                } else {
                    carrinho.splice(i, 1);
                }

                atualizarCarrinho();
            });

            document.querySelector('.cart').append(carrinhoItem);
        }

        document.querySelector('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        document.querySelector('.desconto span:last-child').innerHTML = formatoReal(desconto);
        document.querySelector('.total span:last-child').innerHTML = formatoReal(total);

    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
};

const finalizarCompra = () => {
    document.querySelector('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra');
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    });
};

// Eventos e funções da aula 05 e 06
roupaJson.map((item, index) => {
    let roupaItem = document.querySelector('.all-cards .card').cloneNode(true);
    document.querySelector('.looks-disponiveis').append(roupaItem);
    roupaItem.setAttribute('data-key', index);
    roupaItem.querySelector('.card--img img').src = item.img;
    roupaItem.querySelector('.card-nome').innerHTML = item.nome;
    roupaItem.querySelector('.desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
    roupaItem.querySelector('.valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;

    roupaItem.querySelector('.card a').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.carrinho-item').style.display = 'flex';
        document.querySelector('.carrinho-item .foto-roupa-modal img').src = item.img;
        document.querySelector('.modal-roupa-info h1').innerHTML = item.nome;
        document.querySelector('.modal-roupa-valor .desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
        document.querySelector('.modal-roupa-valor .valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;

        document.querySelector('#botao-cancelar').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.carrinho-item').style.display = 'none';
        });

        let key = e.currentTarget.closest('.card').getAttribute('data-key');
        console.log('roupa clicada ' + key);
        console.log(roupaJson[key]);

        quantRoupas = 1;
        modalKey = key;

        document.querySelectorAll('.roupa-info-tamanho').forEach((size) => {
            size.addEventListener('click', (e) => {
                document.querySelectorAll('.roupa-info-tamanho').forEach((el) => {
                    el.classList.remove('selected');
                });
                size.classList.add('selected');
            });
        });

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

        return key;
    });
});

// Chamadas das funções principais
adicionarNoCarrinho();
abrirCarrinho();
fecharCarrinho();
finalizarCompra();
