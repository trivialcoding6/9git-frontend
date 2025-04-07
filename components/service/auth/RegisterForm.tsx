"use client";
import { AuthForm } from "@/components/shared/AuthForm";
import { registerFormSchema } from "@/schemas/auth";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
    // 회원가입 로직 처리
  });

  const fields = [
    {
      name: "name",
      placeholder: "이름",
    },
    {
      name: "email",
      placeholder: "이메일",
      type: "email",
    },
    {
      name: "password",
      placeholder: "비밀번호",
      isPassword: true,
    },
  ];

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <AuthForm fields={fields} submitButtonText="회원가입" />
        </form>
      </Form>
    </FormProvider>
  );
};
