import { ChatbotHeader } from './ChatbotHeader';
import { Chat } from '@/types/chat';
import { ChatbotIntro } from './ChatbotIntro';
import { ChatbotSelection } from './ChatbotSelection';
import { Chating } from './Chating';

type Props = {
  initialChats?: Chat[];
};

export const Chatbot = ({ initialChats }: Props) => {
  return (
    <div>
      <ChatbotIntro showSelectBox={initialChats?.length !== 0} />
      {!initialChats || initialChats?.length === 0 ? <ChatbotSelection /> : <></>}
    </div>
  );
};
