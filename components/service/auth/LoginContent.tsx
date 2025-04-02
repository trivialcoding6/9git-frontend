import { AuthTabs } from "./AuthTabs";
import { LoginForm } from "./LoginForm";

export const LoginContent = () => {
  return (
    <div
      className="mt-8 w-[90%] max-w-sm rounded-lg shadow-xl bg-white
    bg-[url('/auth-bg-img.webp')]
    bg-cover
    bg-no-repeat
    bg-center"
    >
      <AuthTabs />
      <LoginForm />
    </div>
  );
};
