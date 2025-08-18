import z from 'zod';

export const newPostSchema = z.object({
  title: z.string().trim().min(1, '標題不可為空白'),
  content: z.string().refine(
    (value) => {
      // 檢查是否為空字串或 Quill 的預設空內容
      const strippedValue = value.replace(/<p><br><\/p>/g, '').trim();
      return strippedValue.length > 0;
    },
    {
      message: '內容不可為空白'
    }
  )
});

export type newPostFormData = z.infer<typeof newPostSchema>;