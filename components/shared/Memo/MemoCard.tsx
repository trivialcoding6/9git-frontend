type Props = {
  title: string;
  description: string;
};

export default function MemoCard({ title, description }: Props) {
  return (
    <div className="border border-beige-deco rounded-[12px] px-4 py-3 bg-beige-light flex flex-col gap-1 text-sm mt-2">
      <h3 className="text-lg text-primary">{title}</h3>
      <p className="text-sm text-secondary truncate">{description}</p>
    </div>
  );
}
