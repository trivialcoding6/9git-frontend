'use client';
import { Badge } from '@/components/ui/badge';

type Props = {
  label?: string;
  color?: string;
};

export default function CustomBadge({ label = 'Badge', color = '#FCAA2B' }: Props) {
  return <Badge className={`rounded-sm font-semibold text-white ${color}`}>{label}</Badge>;
}
