import { observable, action } from 'mobx'
import { fromPromise } from 'mobx-utils'
import { types, onSnapshot } from "mobx-state-tree"

const Book = types.model('Book', {
	id: types.string,
	name: types.string
})

const BookStore = types.model('BookStore', {
	books: types.array(Book),
	loading: types.boolean
}, {
	afterCreate() {
		this.setLoading(true)
		window.fetch("books.json")
      .then(r => r.json())
      .then(data => {
      	this.addBooks(data)
      	this.setLoading(false)
      })
	},
	addBooks(books) {
		const arr = books.map(book => Book.create(book))
		this.books.replace(arr)
	},
	setLoading(state) {
		this.loading = state
	}
})

const store = BookStore.create({
	books: [],
	loading: false
})
export default store