// API client for making requests to backend
// Implementation by Codex

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint: string, options?: RequestInit) {
    // Make API request
    // Implementation by Codex
  }
}

export const apiClient = new ApiClient();

