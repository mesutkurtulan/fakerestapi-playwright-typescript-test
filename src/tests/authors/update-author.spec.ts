import { test, expect } from '@playwright/test'
import { AuthorsService } from '../../features/services/authorsService'
import { validateAuthor } from '../../features/validators/authorValidator'

test.describe('Update Authors - PUT /api/v1/Authors', () => {
    let authorsService: AuthorsService

    test.beforeEach(async ({ request }) => {
        authorsService = new AuthorsService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios - Response 200
    // ──────────────────────────────────────────────

    test('Update Author - All Data is Valid', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: 1,
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - Id is Missing', async () => {
        const updatedAuthor = {
            idBook: 1,
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        }

        const response = await authorsService.updateAuthor(1, updatedAuthor)
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(0) // genelde otomatik 0 döner
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - IdBook is Missing', async () => {
        const updatedAuthor = {
            id: 1,
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(0) // genelde 0 döner
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - FirstName is Missing', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: 1,
            lastName: 'UpdatedLastName',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBeNull()
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - LastName is Missing', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: 1,
            firstName: 'UpdatedFirstName',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBeNull()
    })

    test('Update Author - Id is Negative Number', async () => {
        const updatedAuthor = {
            id: -1,
            idBook: 1,
            firstName: 'NegativeIdAuthor',
            lastName: 'UpdatedLast',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - IdBook is Negative Number', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: -1,
            firstName: 'NegativeBookAuthor',
            lastName: 'UpdatedLast',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBe(updatedAuthor.firstName)
        expect(updated.lastName).toBe(updatedAuthor.lastName)
    })

    test('Update Author - Empty Request Body', async () => {
        const updatedAuthor = {}

        const response = await authorsService.updateAuthor(1, updatedAuthor)
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(0)
        expect(updated.idBook).toBe(0)
        expect(updated.firstName).toBeNull()
        expect(updated.lastName).toBeNull()
    })

    test('Update Author - Null instead of String', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: 1,
            firstName: null,
            lastName: null,
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
        expect(response.status()).toBe(200)

        const updated = await response.json()
        validateAuthor(updated)

        expect(updated.id).toBe(updatedAuthor.id)
        expect(updated.idBook).toBe(updatedAuthor.idBook)
        expect(updated.firstName).toBeNull()
        expect(updated.lastName).toBeNull()
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 400
    // ──────────────────────────────────────────────

    test('Update Author - Id is Invalid Number', async () => {
        const updatedAuthor = {
            id: 10000000000,
            idBook: 1,
            firstName: 'InvalidIdAuthor',
            lastName: 'UpdatedLast',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
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

    test('Update Author - No Request Body', async () => {
        const response = await authorsService.updateAuthor(1)
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
        expect(responseBody.errors[''][0]).toBe(
            'A non-empty request body is required.'
        )
    })

    test('Update Author - IdBook is Invalid Number', async () => {
        const updatedAuthor = {
            id: 1,
            idBook: 10000000000,
            firstName: 'InvalidBookAuthor',
            lastName: 'UpdatedLast',
        }

        const response = await authorsService.updateAuthor(
            updatedAuthor.id,
            updatedAuthor
        )
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
        expect(responseBody.errors['$.idBook'][0]).toContain(
            'The JSON value could not be converted to System.Int32'
        )
    })
})