import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const BlogCategories = [
  "Art and Design",
  "Business",
  "Lifestyle",
  "News",
  "Technology",
] as const;

export const postSchema = z.object({
  // file: z.object({
  //   image: z
  //     .any()
  //     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //     .refine(
  //       (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //       "Only .jpg, .jpeg, .png and .webp formats are supported."
  //     ),
  // }),
  body: z.object({
    title: z.string().trim().min(2).max(500),
    content: z.string().trim().min(2),
    category: z.enum(BlogCategories),
  }),
});

export type TPostSchema = z.infer<typeof postSchema>;
