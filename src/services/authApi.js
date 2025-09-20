import { API_CONFIG } from '../config'

export const authApi = {
  login: async (credentials) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }
    )

    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  register: async (userData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    )

    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },
}
