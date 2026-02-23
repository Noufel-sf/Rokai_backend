import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher"]),
  profileimg: z.string().optional().default("https://via.placeholder.com/150"),
  FavouriteCourses: z.array(z.string()).optional().default([]),
  Courses: z.array(z.string()).optional().default([]),
  bio: z.string().optional().default(""),
  Experiences: z.string().optional().default(""),
  domain: z.string().optional().default("")
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
