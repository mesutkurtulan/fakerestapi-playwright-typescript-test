import { expect } from '@playwright/test'
import { BooksService } from '../features/services/booksService'
import { validateBook } from '../features/validators/bookValidator'

/**
 * Helper: Creates a new book, expects 200 status, and performs validation
 * @param service - Instance of BooksService
 * @param newBook - The book data to be created
 * @returns The response and the created book object
 */
export async function createAndValidateBook(
    service: BooksService,
    newBook: any
) {
    const response = await service.createBook(newBook);
    
    expect(response.status()).toBe(200);

    const created = await response.json();
    validateBook(created);

    return { response, created };
}