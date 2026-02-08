import { expect } from '@playwright/test'
import { AuthorsService } from '../features/services/authorsService'
import { validateAuthor } from '../features/validators/authorValidator'

/**
 * Helper: Creates a new author, expects 200 status, and performs validation
 * @param service - Instance of AuthorsService
 * @param newAuthor - The author data to be created
 * @returns The response and the created author object
 */
 export async function createAndValidateAuthor(
    service: AuthorsService,
    newAuthor: any
) {
    const response = await service.createAuthor(newAuthor);
    
    expect(response.status()).toBe(200);

    const created = await response.json();
    validateAuthor(created);

    return { response, created };
}