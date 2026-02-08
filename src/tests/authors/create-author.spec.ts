import { test, expect } from '@playwright/test'
import { AuthorsService } from '../../features/services/authorsService'
import { createAndValidateAuthor } from '../../utils/author-helpers'

test.describe('Create Authors - POST /api/v1/Authors', () => {
    let authorsService: AuthorsService

    test.beforeEach(async ({ request }) => {
        authorsService = new AuthorsService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios - Response 200
    // ──────────────────────────────────────────────

    test('Create Author - All Data is Valid', async () => {
        const newAuthor = {
            id: 201,
            idBook: 1,
            firstName: 'AuthorFirst201',
            lastName: 'AuthorLast201',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - Id is Missing', async () => {
        const newAuthor = {
            idBook: 1,
            firstName: 'AuthorFirst201',
            lastName: 'AuthorLast201',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(0)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - IdBook is Missing', async () => {
        const newAuthor = {
            id: 201,
            firstName: 'AuthorFirst201',
            lastName: 'AuthorLast201',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(0)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - FirstName is Missing', async () => {
        const newAuthor = {
            id: 201,
            idBook: 1,
            lastName: 'AuthorLast201',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBeNull()
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - LastName is Missing', async () => {
        const newAuthor = {
            id: 201,
            idBook: 1,
            firstName: 'AuthorFirst201',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBeNull()
    })

    test('Create Author - Id is Negative Number', async () => {
        const newAuthor = {
            id: -1,
            idBook: 1,
            firstName: 'NegativeIdAuthor',
            lastName: 'TestLast',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - IdBook is Negative Number', async () => {
        const newAuthor = {
            id: 201,
            idBook: -1,
            firstName: 'NegativeBookAuthor',
            lastName: 'TestLast',
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBe(newAuthor.firstName)
        expect(created.lastName).toBe(newAuthor.lastName)
    })

    test('Create Author - Empty Request Body', async () => {
        const newAuthor = {}

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(0)
        expect(created.idBook).toBe(0)
        expect(created.firstName).toBeNull()
        expect(created.lastName).toBeNull()
    })

    test('Create Author - Null instead of String', async () => {
        const newAuthor = {
            id: 201,
            idBook: 1,
            firstName: null,
            lastName: null,
        }

        const { created } = await createAndValidateAuthor(authorsService, newAuthor)

        expect(created.id).toBe(newAuthor.id)
        expect(created.idBook).toBe(newAuthor.idBook)
        expect(created.firstName).toBeNull()
        expect(created.lastName).toBeNull()
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios - Response 400
    // ──────────────────────────────────────────────

    test('Create Author - Id is Invalid Number', async () => {
        const newAuthor = {
            id: 10000000000,
            idBook: 1,
            firstName: 'InvalidIdAuthor',
            lastName: 'TestLast',
        }

        const response = await authorsService.createAuthor(newAuthor)
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
        expect(responseBody.errors['$.id'][0]).toContain(
            'The JSON value could not be converted to System.Int32'
        )
    })

    test('Create Author - No Request Body', async () => {
        const response = await authorsService.createAuthor()
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

    test('Create Author - IdBook is Invalid Number', async () => {
        const newAuthor = {
            id: 201,
            idBook: 10000000000,
            firstName: 'InvalidBookAuthor',
            lastName: 'TestLast',
        }

        const response = await authorsService.createAuthor(newAuthor)
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