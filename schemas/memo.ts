import { z } from 'zod';

export const memoSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().min(1, '내용은 필수입니다.'),
    startDate: z.date({ required_error: '시작일을 선택해주세요.' }),
    endDate: z.date({ required_error: '종료일을 선택해주세요.' }),
  })
  .refine((data) => data.startDate < data.endDate, {
    path: ['endDate'],
    message: '종료일은 시작일 이후여야 합니다.',
  });

export type MemoFormData = z.infer<typeof memoSchema>;
