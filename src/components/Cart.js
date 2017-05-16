import React from 'react'
import { observer, inject } from 'mobx-react'
import './Cart.css'

const Cart = inject('cartStore', 'bookStore')(observer(({cartStore, bookStore}) => (
  <section className="Page-cart">
    <h2>Your cart</h2>
    <section className="Page-cart-items">
      {
        cartStore.orders.entries().map(entry => {
          const book = bookStore.books.get(entry[0])
          const amount = entry[1]
          return (
             <div className="Page-cart-item" key={book.id}>
                <p><a href="#">{book.name}</a></p>
                <div className="Page-cart-item-details">
                  <p>Amount: <input value={amount} onChange={cartStore.changeBookAmount.bind(this, book)}/> total: <b>{amount * book.price} €</b></p>
                </div>
              </div>
          )
        })
      }
    </section>
    <p>Subtotal: {cartStore.total} €</p>
    <p><i>Large order discount: {cartStore.discount} €</i></p>
    <p><b>Total: {cartStore.total - cartStore.discount} €</b></p>
    <button disabled={cartStore.total <= 0} onClick={cartStore.checkout}>Submit order</button>
  </section>
)))

export default Cart
