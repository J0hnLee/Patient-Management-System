"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { Suspense, useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
}
const PatientForm = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,

  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted with values:", { name, email, phone }); // 添加日誌
    setIsLoading(true);
    try {
      const ww=form.getValues()
      console.log(ww)
      const newUser = await createUser({ name, email, phone });
      console.log(newUser);
      if (newUser) {
        // TODO: 處理成功情況，例如重定向或顯示成功消息
        router.push(`/patients/${newUser.$id}/register`);
        console.log(newUser);
      }
    } catch (error) {
      // TODO: 顯示錯誤消息給用戶
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(form.getValues())
  
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There!</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="全名"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="leadwayrx@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="電話"
          placeholder=""
        />

   
        <SubmitButton isLoading={isLoading}>提交</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
