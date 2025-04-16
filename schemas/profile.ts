import { z } from 'zod';

export const profileFormSchema = z.object({
  age: z
    .string()
    .min(1, '나이를 입력해주세요.')
    .regex(/^[0-9]+$/, '숫자만 입력 가능하며 최대 3자리까지 입력할 수 있어요.')
    .max(3, '숫자만 입력 가능하며 최대 3자리까지 입력할 수 있어요.')
    .refine(
      (val) => {
        const num = Number(val);
        return num >= 0 && num <= 130;
      },
      {
        message: '나이는 0세 이상 130세 이하로 입력해주세요.',
      }
    ),
  job: z.string().min(1, '직업을 선택해주세요.'),
  gender: z.enum(['M', 'F']),
  isConsent: z.literal(true, {
    errorMap: () => ({ message: '개인정보 수집 동의가 필요합니다.' }),
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
