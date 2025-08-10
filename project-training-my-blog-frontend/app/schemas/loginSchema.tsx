import z from 'zod';

export const loginSchema = z.object({
  account: z.string().min(1, '請輸入帳號'),
  password: z.string().min(1, '請輸入密碼'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
