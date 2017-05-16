import React from 'react'
import { observer } from 'mobx-react'

const Books = observer(({openBookPage, books}) => (
  <section className="Page-books">
    <h1>Available books</h1>
    <ol>
      { 
        books.case({
          "pending":   () => "loading",
          "rejected":  (e) => "error: " + e,
          "fulfilled": (books) => books.map(book =>
            <BookEntry
              key={book.id}
              book={book}
              onClickEntry={openBookPage} />
          )
        }) 
      }
    </ol>
  </section>
))

const BookEntry = observer(({onClickEntry, book}) => (
  <li>
    <a onClick={() => onClickEntry(book)}>{book.name}</a>
  </li>
))

export default Books