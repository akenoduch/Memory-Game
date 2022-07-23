let game = {
    
    champions: [
        'amumu',
        'annie',
        'lulu',
        'seraphine',
        'shaco',
        'teemo',
        'veigar',
        'vi',
        'ziggs',
        'zoe'
    ],

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || this.secondCard) {
            return this.firstCard.icon === this.secondCard.icon;
        }
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;

    },

    cards: null,

    createCardsFromChampions: function () {
        this.cards = [];

        this.champions.forEach(champion => {
            this.cards.push(this.createPairFromChampion(champion));
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromChampion: function (champion) {
        return [{
            id: this.createIdWithChampion(champion),
            icon: champion,
            flipped: false,
        }, {
            id: this.createIdWithChampion(champion),
            icon: champion,
            flipped: false,
        }]
    },

    createIdWithChampion: function (champion) {
        return champion + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },
}