import { Header } from "@/components/shared/Header";
import { Menu } from "lucide-react";

export const Chatbot = () => {
  return (
    <>
      <Header>
        <Menu width={28} height={28} className="cursor-pointer m-2" />
      </Header>
    </>
  );
};
