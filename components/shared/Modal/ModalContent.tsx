type Props = {
  children: React.ReactNode;
};

export const ModalContent = ({ children }: Props) => {
  return <div className="py-4 px-2">{children}</div>;
};
