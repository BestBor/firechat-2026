import { z } from "zod";

export const loginZodSchema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format")),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>

export const registerZodSchema = z.object({
    email: z.string().trim().pipe(z.email()),
    displayName: z.string()
        .min(1, "Display name is required")
        .max(50, "Display anme must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirmed password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
})

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>

export const profileZodSchema = z.object({
    displayName: z
        .string()
        .min(1, "Display name is required")
        .max(50, "Display name must be at most 50 characters long"),
    photoUrl: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
})

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>