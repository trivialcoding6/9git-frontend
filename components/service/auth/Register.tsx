import { AuthTabs } from './AuthTabs';
import { RegisterForm } from './RegisterForm';

export const Register = () => {
  return (
    <div
      className="mt-8 w-[90%] max-w-sm rounded-lg shadow-xl bg-white
    bg-[url('/auth-bg-img.webp')]
    bg-cover
    bg-no-repeat
    bg-center
    "
    >
      <AuthTabs />
      <RegisterForm />
    </div>
  );
};
