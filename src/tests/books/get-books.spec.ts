import { test, expect } from '@playwright/test'
import { BooksService } from '../../features/services/booksService'
import {
    validateBookList,
    validateBook,
} from '../../features/validators/bookValidator'

test.describe('Get Books - GET /api/v1/Books', () => {
    let booksService: BooksService

    test.beforeEach(async ({ request }) => {
        booksService = new BooksService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios- Response 200
    // ──────────────────────────────────────────────

    test('Get All Books', async () => {
        const response = await booksService.getAllBooks()
        expect(response.status()).toBe(200)
        const books = await response.json()
        validateBookList(books)
    })

    test('Get Single Book - Book Id is Valid', async () => {
        const response = await booksService.getBookById(1)
        expect(response.status()).toBe(200)

        const book = await response.json()
        validateBook(book)
        expect(book.id).toBe(1)
        expect(book.title).toBe('Book 1')
        expect(book.description).toBe(
            'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n'
        )
        expect(book.pageCount).toBe(100)
        expect(book.excerpt).toContain('Lorem lorem lorem.')
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios- Response 404
    // ──────────────────────────────────────────────

    test('Get Single Book - Book Id is Not Found', async () => {
        const response = await booksService.getBookById(0)
        expect(response.status()).toBe(404)

        const responseBody = await response.json()
        expect(responseBody.type).toBe(
            'https://tools.ietf.org/html/rfc7231#section-6.5.4'
        )
        expect(responseBody.title).toBe('Not Found')
        expect(responseBody.status).toBe(404)
        expect(responseBody.traceId).toBeTruthy
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios- Response 400
    // ──────────────────────────────────────────────

    test('Get Single Book - Book Id is Invalid', async () => {
        const response = await booksService.getBookById(10000000000)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody.type).toBe(
            'https://tools.ietf.org/html/rfc7231#section-6.5.1'
        )
        expect(responseBody.title).toBe(
            'One or more validation errors occurred.'
        )
        expect(responseBody.status).toBe(400)
        expect(responseBody.traceId).toBeTruthy
        expect(responseBody.errors.id[0]).toBe(
            "The value '10000000000' is not valid."
        )
    })
})
