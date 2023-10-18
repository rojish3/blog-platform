import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".webp"];
const BlogCategories = [
  "Art and Design",
  "Business",
  "Lifestyle",
  "News",
  "Technology",
] as const;

export const postSchema = z.object({
  image: z.any().refine((file) => {
    if (!file) {
      return false;
    }
    // Check the file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return false;
    }

    // Check the file size, compare it with the maximum allowed size
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }

    return true; // The file is valid
  }, "Invalid file format or file size exceeds 5MB."),

  title: z.string().trim().min(2).max(500),
  content: z.string().trim().min(2),
  category: z.enum(BlogCategories),
});

export type TPostSchema = z.infer<typeof postSchema>;
