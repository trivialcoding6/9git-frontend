import MemoCard from './MemoCard';

const memoList = [
  {
    title: 'PCCE 자격증 시험',
    description: '한강 공원 오후 5시',
  },
  {
    title: '영어스터디',
    description: '3월 30일 오전 10시 영어 00과 영어 스터디 일정 있음 줌으로',
  },
  {
    title: '러닝 동호회 모임',
    description: '한강 공원 오후 5시',
  },
];

export default function MemoList() {
  return (
    <div className="p-6">
      {memoList.map((memo, index) => (
        <MemoCard key={index} title={memo.title} description={memo.description} />
      ))}
    </div>
  );
}
