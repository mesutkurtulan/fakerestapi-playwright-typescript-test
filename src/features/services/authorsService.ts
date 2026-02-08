import { APIRequestContext, APIResponse } from '@playwright/test'
import { Author } from '../models/author'

export class AuthorService {
    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getAllAuthors(): Promise<APIResponse> {
        return this.request.get('/api/v1/Authors')
    }

    async getAuthorById(id: number): Promise<APIResponse> {
        return this.request.get(`/api/v1/Authors/${id}`)
    }

    async createAuthor(author?: Partial<Author> | null): Promise<APIResponse> {
        const options: { data?: any } = {}

        if (author !== undefined && author !== null) {
            options.data = author
        }

        return this.request.post('/api/v1/Authors', options)
    }

    async updateAuthor(
        id: number,
        book?: Partial<Author> | null
    ): Promise<APIResponse> {
        const options: { data?: any } = {}

        if (book !== undefined && book !== null) {
            options.data = book
        }

        return this.request.put(`/api/v1/Authors/${id}`, options)
    }

    async deleteAuthor(id?: number): Promise<APIResponse> {
        return this.request.delete(`/api/v1/Authors/${id}`)
    }

    async getAuthorsByBookId(bookId: number): Promise<APIResponse> {
        return this.request.get(`api/v1/Authors/books/${bookId}`)
    }
}
