import { observable, action } from 'mobx'
import { fromPromise } from 'mobx-utils'

class BookStore {
	@observable books

	constructor() {
		// Ensure that books is always fromPromise
		this.requestBooks()
	}

	@action.bound requestBooks() {
		this.books = fromPromise(
        window.fetch("books.json")
            .then(r => r.json())
            .then(data => data)
    )
	}
}

const store = new BookStore()
export default store