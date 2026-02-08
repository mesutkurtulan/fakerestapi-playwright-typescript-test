import { test, expect } from '@playwright/test'
import { AuthorsService } from '../../features/services/authorsService'

test.describe('Delete Authors - DELETE /api/v1/Authors', () => {
    let authorsService: AuthorsService

    test.beforeEach(async ({ request }) => {
        authorsService = new AuthorsService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios - Response 200
    // ──────────────────────────────────────────────

    test('Delete Author - All Data is Valid', async () => {
        const response = await authorsService.deleteAuthor(1)
        expect(response.status()).toBe(200)
    })

    test('Delete Author - Id is Negative Number', async () => {
        const response = await authorsService.deleteAuthor(-1)
        expect(response.status()).toBe(200)
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 400
    // ──────────────────────────────────────────────

    test('Delete Author - Id is Invalid Number', async () => {
        const response = await authorsService.deleteAuthor(10000000000)
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
        expect(responseBody.errors['id'][0]).toBe(
            "The value '10000000000' is not valid."
        )
    })

    test('Delete Author - Id is Missing', async () => {
        const response = await authorsService.deleteAuthor()
        expect(response.status()).toBe(400)
    })
})