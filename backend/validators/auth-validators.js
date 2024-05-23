import {z} from 'zod';
export const loginSchema = z.object({
  email:z
  .string({ required_error: "Email is incorrect" })
  .trim()
  .min(3, { message: "Email must be atleast 3 letters" })
  .max(255),

  password : z
  .string({ required_error: "Password or email is a incorrect" })
  .trim()
  .min(3, { message: "Password must be atleast 3 letters" })
  .max(255),
})
export const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is a required" })
    .trim()
    .min(3, { message: "name must be atleast 3 letters" })
    .max(255),
    phone : z
    .string({ required_error: "Phone is a required" })
    .trim()
    .min(3, { message: "phone must be atleast 3 letters" })
    .max(255),
});