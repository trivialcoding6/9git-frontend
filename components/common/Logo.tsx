import Image from "next/image";

type Props = {
  width: number;
  height: number;
};

export const Logo = ({ width, height }: Props) => {
  return <Image src="/logo.webp" alt="logo" width={width} height={height} />;
};
