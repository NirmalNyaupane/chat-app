import { loginFormValidation, registerValidation } from '@/lib/formvalidation/authvalidation';
import { z } from 'zod';
type RegisterUserType = z.infer<typeof registerValidation>


type LoginUserType = z.infer<typeof loginFormValidation>
type LoginResponse = {
  id: string,
  isVerified: boolean,
  accessToken: string
}
export type { RegisterUserType, LoginUserType, LoginResponse}