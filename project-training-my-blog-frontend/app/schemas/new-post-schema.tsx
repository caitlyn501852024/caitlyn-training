import z from 'zod';

export const newPostSchema = z.object({
  title: z.string().min(1, '請輸入標題'),
  content: z.string().min(1, '請輸入內容'),
});

export type newPostFormData = z.infer<typeof newPostSchema>;