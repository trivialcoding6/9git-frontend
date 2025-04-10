import { z } from 'zod';

const memoSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다.'),
  startDate: z.date({ required_error: '시작일을 선택해주세요.' }),
  endDate: z.date({ required_error: '종료일을 선택해주세요.' }),
});
