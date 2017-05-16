import { observable, action, computed } from 'mobx'
import { fromPromise } from 'mobx-utils'

export default class CartStore {
	@observable orders = observable.map()

	constructor(bookStore) {
		this.bookStore = bookStore
	}

	@action.bound addBook(book) {
		const value = this.orders.get(book.id)
		if (value) {
			this.orders.set(book.id, value + 1)
		} else {
			this.orders.set(book.id, 1)
		}
	}

	@action removeBook(book) {
		const value = this.orders.get(book.id)
		if (value) {
			this.orders.set(book.id, value - 1)
		}
	}

	@action.bound changeBookAmount(book, e) {
		this.orders.set(book.id, e.target.value)
	}

	@computed get total() {
		let total = 0
		this.orders.entries().forEach(entry => {
			total += (this.bookStore.books.get([entry[0]]).price * entry[1])
		})
		return total
	}

	@computed get discount() {
		return this.total > 100 ? this.total * .10 : 0
	}

	@action.bound checkout() {
		alert('Checked out!')
		this.orders.clear()
	}
}