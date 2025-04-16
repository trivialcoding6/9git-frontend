import Image from 'next/image';

export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Image src="/start-logo.webp" alt="logo" width={296} height={240} className="animate-pulse" />
    </main>
  );
}
