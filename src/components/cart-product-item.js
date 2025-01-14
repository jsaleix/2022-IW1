import { html } from 'lit';
import { Base } from '../Base';
import { editProduct, removeItemFromCart } from '../helpers/cartHelper';

export class CartProductItem extends Base {
  constructor() {
    super();

    this.product = {};
    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  async firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', async () => {
      this.loaded = true;
    });
  }

  async removeFromCartAction(e){
    e.preventDefault();
    await removeItemFromCart(this.product.id);
    window.location.reload();
  }

  async incrementQty(e){
    e.preventDefault();
    await editProduct(this.product.id, 'inc'); 
  }

  async decrementQty(e){
    e.preventDefault();
    await editProduct(this.product.id, 'dec'); 
  }

  render() {
    return html`
      <a href="/product/${this.product.id}" class="card">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? "fade": ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <div style="display: flex">
            <button @click="${this.removeFromCartAction}" >Remove from Cart</button>
            <button @click="${this.decrementQty}">-</button>
            <button @click="${this.incrementQty}">+</button>
            <p style="margin-left: 10px">${this.product.quantity} in cart</p>
          </div>
        </main>
      </a>
    `;
  }
}
customElements.define('cart-product-item', CartProductItem);