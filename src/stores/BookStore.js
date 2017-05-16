import { observable, action } from 'mobx'
import { fromPromise } from 'mobx-utils'
import { types, onSnapshot } from "mobx-state-tree"

const Book = types.model('Book', {
	id: types.string,
	name: types.string
})

const parseMap = (collection, model, data) => {
	collection.clear()
	data.forEach(item => {
		collection.set(item.id, model.create(item))
	})
}

const BookStore = types.model('BookStore', {
	books: types.map(Book),
	loading: types.boolean,

	get sorted() {
    return this.books.values().sort((a, b) =>
        a.name > b.name
            ? 1
            : a.name === b.name
                ? 0
                : -1
    )
  }
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
		parseMap(this.books, Book, books)
	},
	setLoading(state) {
		this.loading = state
	}
})

const store = BookStore.create({
	books: {},
	loading: false
})
export default store