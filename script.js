function search() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    
    for (let i = 0; i < cards.length; i++) {
        let h4 = cards[i].getElementsByTagName('h4')[0];
        if (h4 && h4.innerHTML.toLowerCase().includes(input)) {
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}


$('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    });

