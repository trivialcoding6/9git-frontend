type Props = {
  title: string;
  description: string;
};

export default function MemoCard({ title, description }: Props) {
  return (
    <div
      className="p-4 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.2)] mb-3 transition"
      style={{
        backgroundColor: 'var(--beige-light)',
      }}
    >
      <h3 className="text-base font-bold text-secondary">{title}</h3> {/* text-lg → text-base */}
      <p className="mt-1 text-sm font-medium text-primary truncate">{description}</p>{' '}
    </div>
  );
}
