const cards = [
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

// barajamos las cartas al iniciar el juego para que el orden sea aleatorio
memoryGame.shuffleCards();

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      // evitamos seleccionar más de dos cartas o clicar cartas ya bloqueadas
      if (
        card.classList.contains('turned') ||
        card.classList.contains('blocked') ||
        memoryGame.pickedCards.length === 2
      )
        return;

      // mostramos la carta volteándola
      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      // cuando hay dos cartas seleccionadas comprobamos si forman pareja
      if (memoryGame.pickedCards.length === 2) {
        const card1 = memoryGame.pickedCards[0];
        const card2 = memoryGame.pickedCards[1];
        const cardName1 = card1.getAttribute('data-card-name');
        const cardName2 = card2.getAttribute('data-card-name');

        const isPair = memoryGame.checkIfPair(cardName1, cardName2);

        // actualizamos el marcador de intentos
        document.querySelector('#pairs-clicked').innerText =
          memoryGame.pairsClicked;

        if (isPair) {
          // si hay pareja, bloqueamos las cartas para mantenerlas visibles
          card1.classList.add('blocked');
          card2.classList.add('blocked');
          memoryGame.pickedCards = [];
          // actualizamos el marcador de parejas acertadas
          document.querySelector('#pairs-guessed').innerText =
            memoryGame.pairsGuessed;

          // comprobamos si se ha terminado el juego
          if (memoryGame.checkIfFinished()) {
            alert('¡Has ganado!');
          }
        } else {
          // si no hay pareja, ocultamos las cartas tras un breve tiempo
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
            memoryGame.pickedCards = [];
          }, 1000);
        }
      }
      console.log(`Card clicked: ${card}`);
    });
  });
});