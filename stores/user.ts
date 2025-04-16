import { TUser } from '@/types/user';
import { create } from 'zustand';

type State = {
  user: Partial<TUser>;
};

type Action = {
  updateUser: (user: State['user']) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: {
    id: '',
    email: '',
    name: '',
    sex: '',
    age: 0,
    job: '',
    level: 0,
    exp: 0,
  },
  updateUser: (user) => set(() => ({ user: user })),
}));

export { useUserStore };
