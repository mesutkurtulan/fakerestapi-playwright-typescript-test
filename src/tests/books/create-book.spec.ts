import { test, expect } from '@playwright/test'
import { BooksService } from '../../features/services/booksService'
import { validateBook } from '../../features/validators/bookValidator'

test.describe('Create Books - POST /api/v1/Books', () => {
    let booksService: BooksService

    test.beforeEach(async ({ request }) => {
        booksService = new BooksService(request)
    })

    // ──────────────────────────────────────────────
    // Positive Scenarios- Response 200
    // ──────────────────────────────────────────────

    test('Create Book - All Data is Valid', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - Id is Missing', async () => {
        const newBook = {
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)
        expect(createdBook.id).toBe(0)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - Title is Missing', async () => {
        const newBook = {
            id: 201,
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBeNull()
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - Description is Missing', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBeNull()
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - PageCount is Missing', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(0)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - Excerpt is Missing', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBeNull()
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - PublishDate is Missing', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate).toBe('0001-01-01T00:00:00')
    })

    test('Create Book - Id is Negative Number', async () => {
        const newBook = {
            id: -1,
            title: 'Book -1',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - PageCount is Negative Number', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: -1,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBe(newBook.title)
        expect(createdBook.description).toBe(newBook.description)
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBe(newBook.excerpt)
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    test('Create Book - Empty Request Body', async () => {
        const newBook = {}
        const response = await booksService.createBook(newBook)
        expect(response.status()).toBe(200)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(0)
        expect(createdBook.title).toBeNull()
        expect(createdBook.description).toBeNull()
        expect(createdBook.pageCount).toBe(0)
        expect(createdBook.excerpt).toBeNull()
        expect(createdBook.publishDate).toBe('0001-01-01T00:00:00')
    })

    test('Create Book - Null instead of String', async () => {
        const newBook = {
            id: 201,
            title: null,
            description: null,
            pageCount: 20100,
            excerpt: null,
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)

        const createdBook = await response.json()
        validateBook(createdBook)

        expect(createdBook.id).toBe(newBook.id)
        expect(createdBook.title).toBeNull()
        expect(createdBook.description).toBeNull()
        expect(createdBook.pageCount).toBe(newBook.pageCount)
        expect(createdBook.excerpt).toBeNull()
        expect(createdBook.publishDate.slice(0, 19)).toBe(
            newBook.publishDate.slice(0, 19)
        )
    })

    // ──────────────────────────────────────────────
    // Negative Scenarios- Response 400
    // ──────────────────────────────────────────────

    test('Create Book - Id is Invalid Number', async () => {
        const newBook = {
            id: 10000000000,
            title: 'Book 10000000000',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: new Date().toISOString(),
        }

        const response = await booksService.createBook(newBook)
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
        expect(responseBody.errors['$.id'][0]).toBe(
            'The JSON value could not be converted to System.Int32. Path: $.id | LineNumber: 0 | BytePositionInLine: 17.'
        )
    })

    test('Create Book - No Request Body', async () => {
        const response = await booksService.createBook()
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

    test('Create Book - PublishDate is Invalid Date', async () => {
        const newBook = {
            id: 201,
            title: 'Book 201',
            description:
                'Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n',
            pageCount: 20100,
            excerpt: 'Lorem lorem lorem.',
            publishDate: '123456789',
        }

        const response = await booksService.createBook(newBook)
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
            'The JSON value could not be converted to System.DateTime. Path: $.publishDate | LineNumber: 0 | BytePositionInLine: 178.'
        )
    })
})
