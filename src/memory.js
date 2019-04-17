class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    // almacenamos las cartas seleccionadas por el jugador
    this.pickedCards = [];
    // contador de intentos realizados
    this.pairsClicked = 0;
    // contador de parejas acertadas
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    // ... write your code here
    // si no hay cartas, no hay nada que barajar
    if (!this.cards) return undefined;
    // algoritmo de Fisher-Yates para mezclar el array de cartas
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    // devolvemos las cartas barajadas
    return this.cards;
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    // cada comprobación incrementa el contador de intentos
    this.pairsClicked++;
    // si las cartas coinciden sumamos una pareja acertada
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    }
    // si no coinciden, devolvemos false
    return false;
  }

  checkIfFinished() {
    // ... write your code here
    // si no hay cartas el juego no puede estar terminado
    if (!this.cards) return false;
    // el juego termina cuando se aciertan todas las parejas
    return this.pairsGuessed === this.cards.length / 2;
  }
}

// exportamos la clase cuando se ejecuta en entorno Node (tests)
if (typeof module !== 'undefined') {
  module.exports = MemoryGame;
}