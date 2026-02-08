import { expect } from '@playwright/test'
import type { Book } from '../models/book'

export function validateBook(book: unknown): asserts book is Book {
    expect(book).toBeTruthy()
    expect(typeof book).toBe('object')
    const b = book as Book
    expect(typeof b.id).toBe('number')
    expect(b.title === null || typeof b.title === 'string').toBe(true)
    expect(b.description === null || typeof b.description === 'string').toBe(
        true
    )
    expect(typeof b.pageCount).toBe('number')
    expect(b.excerpt === null || typeof b.excerpt === 'string').toBe(true)
    expect(typeof b.publishDate).toBe('string')
    expect(b.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}T/)
}

export function validateBookList(books: unknown): asserts books is Book[] {
    expect(Array.isArray(books)).toBe(true)
    expect(books).toHaveLength(200)

    ;(books as Book[]).forEach((book, index) => {
        validateBook(book)
        expect(book.id).toBe(index + 1)
    })
}
