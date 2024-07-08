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

function search() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    
    for (let i = 0; i < cards.length; i++) {
        let h4 = cards[i].getElementsByTagName('h4')[0];
        if (h4 && h4.innerHTML.toLowerCase().includes(input)) {
            cards[i].style.visibility = "visible";
            cards[i].style.display = "flex";
        } else {
            cards[i].style.visibility = "hidden";
            cards[i].style.display = "none";
        }
    }
}

//carrinho

let modalKey = 0;
let quantRoupas = 1;
let carrinho = [];

const formatoReal = (valor) => {
    if (typeof valor !== 'number' || isNaN(valor)) {
        return ''; 
    }
    
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


const abrirModal = () => {
 document.querySelector('.carrinho-item').style.display = 'flex';
}


const fecharModal = () => {
    document.querySelector('.carrinho-item').style.display = 'none';
};

const botoesFechar = () => {
        document.querySelector('#botao-cancelar').addEventListener('click', (fecharModal)
    );
}


const preencheDadosRoupas = (roupaItem, item, index) => {
    roupaItem.setAttribute('data-key', index);
    roupaItem.querySelector('.card--img img').src = item.img;
    roupaItem.querySelector('.card-nome').innerHTML = item.nome;
    roupaItem.querySelector('.desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
    roupaItem.querySelector('.valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;
}

const preencheDadosModal = (item) => {
    document.querySelector('.foto-roupa-modal img').src = item.img;
    document.querySelector('.modal-roupa-info h1').innerHTML = item.nome;
    document.querySelector('.modal-roupa-valor .desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;
    document.querySelector('.modal-roupa-valor .valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;
}

const pegarKey = (e) => {
    let key = e.currentTarget.closest('.card').getAttribute('data-key');

    console.log('roupa clicada ' + key);
    console.log(roupaJson[key]);

    quantRoupas = 1;
    modalKey = key;

    return key;
}


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

const adicionarNoCarrinho = () => {
    document.querySelector('#botao-carrinho').addEventListener('click', (e) => {
        e.preventDefault();
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
            console.log(carrinho[key].qt);
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
    })
}

const abrirCarrinho = () => {


if (carrinho.length > 0) {
    document.querySelector('.cart--item').style.display = 'flex';
    document.querySelector('aside').style.display = 'block';
    document.querySelector('main').style.width = '80%';
    document.querySelector('main').style.marginRight = '30%';
}

document.querySelector('.menu-openner').addEventListener('click', () => {
    if (carrinho.length > 0) {
        if (document.querySelector('aside').style.display == 'block'){
            document.querySelector('aside').style.display = 'none';
            document.querySelector('main').style.width = '100%';
            document.querySelector('main').style.marginRight = '0%';
        } else {
            document.querySelector('.cart--item').style.display = 'flex';
            document.querySelector('aside').style.display = 'block';
            document.querySelector('main').style.width = '80%';
            document.querySelector('main').style.marginRight = '30%';
        }
    }
})

    fecharModal();
};

const fecharCarrinho = () => {
    document.querySelector('aside').style.display = 'none';
    document.querySelector('main').style.width = '100%';
    document.querySelector('main').style.marginRight = '0%';

};

const atualizarCarrinho = () => {
    document.querySelector('.menu-openner span').innerHTML = carrinho.length;

    if (carrinho.length > 0) {
        document.querySelector('.cart--item').style.display = 'flex';
        document.querySelector('aside').display = 'block';
        document.querySelector('main').style.width = '80%';
        document.querySelector('main').style.marginRight = '30%';
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in carrinho) {
            let roupaItem = roupaJson.find((item) => item.id == carrinho[i].id);
            console.log(roupaItem);

            subtotal += (carrinho[i].price * carrinho[i].qt);
            // valor = subtotal - desconto;

            let carrinhoItem = document.querySelector(".all-cards .cart--item").cloneNode(true);

            document.querySelector('.cart').append(carrinhoItem);

            let roupaSizeName = carrinho[i].size;
            let roupaName = `${roupaItem.nome} (${roupaSizeName})`;

            carrinhoItem.querySelector('img').src = roupaItem.img;
			carrinhoItem.querySelector('.cart--item-nome').innerHTML = roupaName;
			carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

			carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				carrinho[i].qt++
				atualizarCarrinho()
			})

			carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(carrinho[i].qt > 1) {
					carrinho[i].qt--
				} else {
					carrinho.splice(i, 1)
				}

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

        desconto = subtotal * 0;
        total = subtotal - desconto;

        document.querySelector('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        document.querySelector('.desconto span:last-child').innerHTML = formatoReal(desconto);
        document.querySelector('.total span:last-child').innerHTML = formatoReal(total);

    } else {
        document.querySelector('aside').style.display = 'none';
        document.querySelector('main').style.width = '100%';
        document.querySelector('main').style.marginRight = '0%';
    }
};

const finalizarCompra = () => {
    document.querySelector('.cart--finalizar').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Finalizar compra');
        document.querySelector('aside').style.display = 'none';
        document.querySelector('main').style.width = '100%';
        document.querySelector('main').style.marginRight = '0%';
    });
};

roupaJson.map((item, index) => {
    let roupaItem = document.querySelector('.all-cards .base-card .card').cloneNode(true);
    document.querySelector('.looks-disponiveis').append(roupaItem);

    preencheDadosRoupas(roupaItem, item, index);


    roupaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Clicou na roupa');

        let chave = pegarKey(e);
        abrirModal();

        preencheDadosModal(item);


        document.querySelector('.item--qtd').innerHTML = quantRoupas;

        escolherTamanho(chave);

        });

        botoesFechar();
        fecharModal();

    });

mudarQuantidade();

adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho();
finalizarCompra();
