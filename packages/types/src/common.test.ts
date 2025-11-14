import { describe, it, expect } from 'vitest';
import { PaginationSchema, IdSchema } from './common';

describe('Common Schemas', () => {
  describe('PaginationSchema', () => {
    it('should validate valid pagination', () => {
      const result = PaginationSchema.parse({ page: 1, limit: 10 });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should use default values', () => {
      const result = PaginationSchema.parse({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });
  });

  describe('IdSchema', () => {
    it('should validate UUID', () => {
      const validId = '123e4567-e89b-12d3-a456-426614174000';
      expect(() => IdSchema.parse(validId)).not.toThrow();
    });

    it('should reject invalid UUID', () => {
      expect(() => IdSchema.parse('invalid')).toThrow();
    });
  });
});

