import { expect } from '@playwright/test'
import type { Author } from '../models/author'

export function validateAuthor(author: unknown): asserts author is Author {
    expect(author).toBeTruthy()
    expect(typeof author).toBe('object')

    const a = author as Author

    expect(typeof a.id).toBe('number')
    expect(typeof a.idBook).toBe('number')

    expect(a.firstName === null || typeof a.firstName === 'string').toBe(true)
    expect(a.lastName === null || typeof a.lastName === 'string').toBe(true)
}

export function validateAuthorList(authors: unknown): asserts authors is Author[] {
    expect(Array.isArray(authors)).toBe(true)

    ;(authors as Author[]).forEach((author, index) => {
        validateAuthor(author)
        expect(author.id).toBe(index + 1)
        expect(author.idBook).toBeGreaterThanOrEqual(1)
        expect(author.idBook).toBeLessThanOrEqual(200)
    })
}