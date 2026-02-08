import { test, expect } from '@playwright/test'
import { BooksService } from '../../features/services/booksService'

test.describe('Delete Books - POST /api/v1/Books', () => {
    let booksService: BooksService

    test.beforeEach(async ({ request }) => {
        booksService = new BooksService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios- Response 200
    // ──────────────────────────────────────────────

    test('Delete Book - All Data is Valid', async () => {
        const response = await booksService.deleteBook(1)
        expect(response.status()).toBe(200)
    })

    test('Delete Book - Id is Negative Number', async () => {
        const response = await booksService.deleteBook(-1)
        expect(response.status()).toBe(200)
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios- Response 400
    // ──────────────────────────────────────────────

    test('Delete Book - Id is Invalid Number', async () => {
        const response = await booksService.deleteBook(10000000000)
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
        expect(responseBody.errors['id'][0]).toBe(
            "The value '10000000000' is not valid."
        )
    })

    test('Delete Book - Id is Missing', async () => {
        const response = await booksService.deleteBook()
        expect(response.status()).toBe(400)
    })
})
