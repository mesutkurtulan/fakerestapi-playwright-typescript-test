import { APIRequestContext, APIResponse } from '@playwright/test'
import { Book } from '../models/book'

export class BooksService {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getAllBooks(): Promise<APIResponse> {
        return this.request.get('/api/v1/Books')
    }

    async getBookById(id: number): Promise<APIResponse> {
        return this.request.get(`/api/v1/Books/${id}`)
    }

    async createBook(book?: Partial<Book> | null): Promise<APIResponse> {
        const options = book != null ? { data: book } : {}

        return this.request.post('/api/v1/Books', options)
    }

    async updateBook(
        id: number,
        book?: Partial<Book> | null
    ): Promise<APIResponse> {
        const options = book != null ? { data: book } : {}

        return this.request.put(`/api/v1/Books/${id}`, options)
    }

    async deleteBook(id?: number): Promise<APIResponse> {
        return this.request.delete(`/api/v1/Books/${id}`)
    }
}
