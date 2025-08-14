import z from 'zod';

export const newPostSchema = z.object({
  title: z.string().trim().min(1, '標題不可為空白'),
  content: z.string().trim().min(1, '內容不可為空白'),
});

export type newPostFormData = z.infer<typeof newPostSchema>;