import z from 'zod';

export const newCommentSchema = z.object({
  content: z.string().trim().min(1, '內容不可為空白')
});

export type newCommentFormData = z.infer<typeof newCommentSchema>;