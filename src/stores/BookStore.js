import { observable, action } from 'mobx'
import { fromPromise } from 'mobx-utils'
import { types, onSnapshot } from "mobx-state-tree"

const Book = types.model('Book', {
	id: types.string,
	name: types.string
})

const BookStore = types.model('BookStore', {
	books: types.array(Book)
}, {
	afterCreate() {
		window.fetch("books.json")
      .then(r => r.json())
      .then(data => {
      	this.addBooks(data)
      })
	},
	addBooks(books) {
		const arr = books.map(book => Book.create(book))
		this.books.replace(arr)
	}
})

const store = BookStore.create({
	books: []
})
export default store