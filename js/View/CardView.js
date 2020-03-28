import EventAggregator from '../Event/EventAggregator.js';

class CardView {
  constructor(card) {
    this.card = card;
  }
  create() {
    //формируем все элементы
    this.element = document.createElement("div");
    this.element.classList.add("place-card");

    const imgCard = document.createElement("div");
    imgCard.classList.add("place-card__image");
    imgCard.style.backgroundImage = `url(${this.card.imageSrc})`;

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("place-card__delete-icon");
    btnRemove.addEventListener('click', this.handleBtnRemoveClick.bind(this));

    const descCard = document.createElement("div");
    descCard.classList.add("place-card__description");

    const h3Card = document.createElement("h3");
    h3Card.classList.add("place-card__name");
    h3Card.textContent = this.card.name;

    const btnLike = document.createElement("button");
    btnLike.classList.add("place-card__like-icon");

    //сливаем их в один
    this.element.appendChild(imgCard);
        imgCard.appendChild(btnRemove);
    this.element.appendChild(descCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(btnLike);

    return this.element;
  }

  handleBtnRemoveClick() {
    EventAggregator.publish('CardView.remove', this.card);
  }
}

export default CardView;