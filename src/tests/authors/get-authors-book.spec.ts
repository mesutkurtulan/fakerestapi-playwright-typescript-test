import { test, expect } from '@playwright/test'
import { AuthorsService } from '../../features/services/authorsService'
import {
    validateAuthorList,
    validateAuthor,
} from '../../features/validators/authorValidator'

test.describe('Get Authors by Book - GET /api/v1/Authors/books/{bookId}', () => {
    let authorsService: AuthorsService

    test.beforeEach(async ({ request }) => {
        authorsService = new AuthorsService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios - Response 200
    // ──────────────────────────────────────────────

    test('Get Authors by Book - Book Id is Valid (In range)', async () => {
        const bookId = 1
        const response = await authorsService.getAuthorsByBookId(bookId)

        expect(response.status()).toBe(200)

        const authors = await response.json()
        validateAuthorList(authors)

        authors.forEach(author => {
            expect(author.idBook).toBe(bookId)
        })
    })

    test('Get Authors by Book - Book Id is Valid (Out of range)', async () => {
        const bookId = 999
        const response = await authorsService.getAuthorsByBookId(bookId)

        expect(response.status()).toBe(200)

        const authors = await response.json()
        expect(Array.isArray(authors)).toBe(true)
        expect(authors).toHaveLength(0)
    })

    test('Get Authors by Book - Book Id is Not Found', async () => {
        const bookId = 0
        const response = await authorsService.getAuthorsByBookId(bookId)

        expect(response.status()).toBe(200)

        const authors = await response.json()
        expect(Array.isArray(authors)).toBe(true)
        expect(authors).toHaveLength(0)
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 400
    // ──────────────────────────────────────────────

    test('Get Authors by Book - Book Id is Invalid', async () => {
        const bookId = 10000000000
        const response = await authorsService.getAuthorsByBookId(bookId)

        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody.type).toBe(
            'https://tools.ietf.org/html/rfc7231#section-6.5.1'
        )
        expect(responseBody.title).toBe(
            'One or more validation errors occurred.'
        )
        expect(responseBody.status).toBe(400)
        expect(responseBody.traceId).toBeTruthy()
        expect(responseBody.errors.idBook?.[0]).toBe("The value '10000000000' is not valid.")
    })
})