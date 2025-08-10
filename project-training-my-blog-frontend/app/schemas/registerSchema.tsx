import z from 'zod';

export const registerSchema = z
  .object({
    account: z
      .string()
      .min(4, '帳號需為 4 碼以上的英數字')
      .regex(/^[A-Za-z0-9]+$/, '帳號需為 4 碼以上的英數字'),
    password: z
      .string()
      .min(6, '密碼需 6 碼以上，需包含至少一個英文與數字')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        '密碼需 6 碼以上，需包含至少一個英文與數字'
      ),
    confirmPassword: z.string().min(6, '密碼需 6 碼以上'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
