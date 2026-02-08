import { test, expect } from '@playwright/test'
import { AuthorsService } from '../../features/services/authorsService'
import { validateAuthorList, validateAuthor} from '../../features/validators/authorValidator'

test.describe('Get Authors - GET /api/v1/Authors', () => {
    let authorsService: AuthorsService

    test.beforeEach(async ({ request }) => {
        authorsService = new AuthorsService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios - Response 200
    // ──────────────────────────────────────────────

    test('Get All Authors', async () => {
        const response = await authorsService.getAllAuthors()
        expect(response.status()).toBe(200)

        const authors = await response.json()
        validateAuthorList(authors)
    })

    test('Get Single Author - Author Id is Valid', async () => {
        const response = await authorsService.getAuthorById(1)
        expect(response.status()).toBe(200)

        const author = await response.json()
        validateAuthor(author)
        expect(author.id).toBe(1)
        expect(author.idBook).toBeGreaterThanOrEqual(1)
        expect(author.firstName).toBeTruthy()
        expect(author.lastName).toBeTruthy()
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 404
    // ──────────────────────────────────────────────

    test('Get Single Author - Author Id is Not Found', async () => {
        const response = await authorsService.getAuthorById(0)
        expect(response.status()).toBe(404)

        const responseBody = await response.json()
        expect(responseBody.type).toBe(
            'https://tools.ietf.org/html/rfc7231#section-6.5.4'
        )
        expect(responseBody.title).toBe('Not Found')
        expect(responseBody.status).toBe(404)
        expect(responseBody.traceId).toBeTruthy()
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 400
    // ──────────────────────────────────────────────

    test('Get Single Author - Author Id is Invalid', async () => {
        const response = await authorsService.getAuthorById(10000000000)
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
        expect(responseBody.errors.id[0]).toBe(
            "The value '10000000000' is not valid."
        )
    })
})