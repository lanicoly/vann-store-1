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

//cartões e carrinho

let modalKey = 0;

let quantRoupas = 1;

let carrinho = [];

roupaJson.map((item, index) => {

    let roupaItem = document.querySelector(".all-cards .card").cloneNode(true);

    document.querySelector('.looks-disponiveis').append(roupaItem);

    roupaItem.setAttribute('data-key', index);

    roupaItem.querySelector('.card--img img').src = item.img;

    roupaItem.querySelector('.card-nome').innerHTML = item.nome;

    roupaItem.querySelector('.desconto').innerHTML = `R$ ${item.desconto.toFixed(2)}`;

    roupaItem.querySelector('.valor').innerHTML = `R$ ${item.valor.toFixed(2)}`;


    //preencher modal

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
            if (quantRoupas >1){
                quantRoupas--;
                document.querySelector('.item--qtd').innerHTML = quantRoupas;
            }
        });
        
    
        return key; // Movido para o final do evento de clique
    });
})