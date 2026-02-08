import { test, expect } from '@playwright/test'
import { BooksService } from '../../features/services/booksService'
import { validateBook } from '../../features/validators/bookValidator'

test.describe('Update Books - PUT /api/v1/Books', () => {
    let booksService: BooksService

    test.beforeEach(async ({ request }) => {
        booksService = new BooksService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios- Response 200
    // ──────────────────────────────────────────────

    test('Update Book - All Data is Valid', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updatedBook.description)
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - Id is Missing', async () => {
        const updatedBook = {
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(1, updatedBook)
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(0)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updatedBook.description)
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - Title is Missing', async () => {
        const updatedBook = {
            id: 1,
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBeNull()
        expect(updateBook.description).toBe(updatedBook.description)
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - Description is Missing', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBeNull()
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - PageCount is Missing', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updateBook.description)
        expect(updateBook.pageCount).toBe(0)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - Excerpt is Missing', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updateBook.description)
        expect(updateBook.pageCount).toBe(updateBook.pageCount)
        expect(updateBook.excerpt).toBeNull()
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - PublishDate is Missing', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updateBook.description)
        expect(updateBook.pageCount).toBe(updateBook.pageCount)
        expect(updateBook.excerpt).toBe(updateBook.excerpt)
        expect(updateBook.publishDate).toBe('0001-01-01T00:00:00')
    })

    test('Update Book - Id is Negative Number', async () => {
        const updatedBook = {
            id: -1,
            title: 'Book -1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updatedBook.description)
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - PageCount is Negative Number', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: -1,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBe(updatedBook.title)
        expect(updateBook.description).toBe(updatedBook.description)
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBe(updatedBook.excerpt)
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    test('Update Book - Empty Request Body', async () => {
        const updatedBook = {}

        const response = await booksService.updateBook(1, updatedBook)
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(0)
        expect(updateBook.title).toBeNull()
        expect(updateBook.description).toBeNull()
        expect(updateBook.pageCount).toBe(0)
        expect(updateBook.excerpt).toBeNull()
        expect(updateBook.publishDate).toBe('0001-01-01T00:00:00')
    })

    test('Update Book - Null instead of String', async () => {
        const updatedBook = {
            id: 1,
            title: null,
            description: null,
            pageCount: 100,
            excerpt: null,
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
        )
        expect(response.status()).toBe(200)

        const updateBook = await response.json()
        validateBook(updateBook)

        expect(updateBook.id).toBe(updatedBook.id)
        expect(updateBook.title).toBeNull()
        expect(updateBook.description).toBeNull()
        expect(updateBook.pageCount).toBe(updatedBook.pageCount)
        expect(updateBook.excerpt).toBeNull()
        expect(updateBook.publishDate.slice(0, 19)).toBe(
            updatedBook.publishDate.slice(0, 19)
        )
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios- Response 400
    // ──────────────────────────────────────────────

    test('Update Book - Id is Invalid Number', async () => {
        const updatedBook = {
            id: 10000000000,
            title: 'Book 10000000000',
            description: 'Lorem lorem lorem',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
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
        expect(responseBody.traceId).toBeTruthy
        expect(responseBody.errors['id'][0]).toBe(
            "The value '10000000000' is not valid."
        )
        expect(responseBody.errors['$.id'][0]).toBe(
            'The JSON value could not be converted to System.Int32. Path: $.id | LineNumber: 0 | BytePositionInLine: 17.'
        )
    })

    test('Update Book - No Request Body', async () => {
        const response = await booksService.updateBook(1)
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
        expect(responseBody.errors[''][0]).toBe(
            'A non-empty request body is required.'
        )
    })

    test('Update Book - PublishDate is Invalid Date', async () => {
        const updatedBook = {
            id: 1,
            title: 'Book 1',
            description: 'Lorem lorem lorem.',
            pageCount: 100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: '123456789',
        }

        const response = await booksService.updateBook(
            updatedBook.id,
            updatedBook
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
        expect(responseBody.traceId).toBeTruthy
        expect(responseBody.errors['$.publishDate'][0]).toBe(
            'The JSON value could not be converted to System.DateTime. Path: $.publishDate | LineNumber: 0 | BytePositionInLine: 132.'
        )
    })
})
