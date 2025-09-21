import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = loginSchema.extend({
  email: z.email('Please enter a valid email'),
})

export const getErrorMessage = (error) => {
  return error.message || 'Validation failed'
}

export function validateLogin(input) {
  return loginSchema.safeParse(input)
}

export function validatePartialLogin(input) {
  return loginSchema.partial().safeParse(input)
}

export function validateRegister(input) {
  return registerSchema.safeParse(input)
}

export function validatePartialRegister(input) {
  return registerSchema.partial().safeParse(input)
}
