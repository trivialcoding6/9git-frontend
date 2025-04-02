import Image from "next/image";

//NOTE: 로딩은 스타일 수정될수도 있음
export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Image
        src="/start-logo.webp"
        alt="logo"
        width={296}
        height={240}
        className="animate-pulse"
      />
    </main>
  );
}
