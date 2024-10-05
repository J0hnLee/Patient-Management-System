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
import { FormFieldType } from "./PatientForm";
import { FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RegisterForm = ({user}:{user:User}) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: ""
    }
  });

  // 2. Define a submit handler.
  async function onSubmit({
    username,
    email,
    phone
  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const newUser = await createUser({ username, email, phone });
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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-12 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome! </h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information </h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username"
          label="全名"
          placeholder="John Doe" 
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row ">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="出生日期"
          
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="性別"
          renderSkeleton={(field) => (<FormControl><RadioGroup  className="flex h-11 gap-6 xl:justify-between" 
            onValueChange={field.onChange}
            defaultValue={field.value}
            >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="male" />
              <Label htmlFor="male" className="cursor-pointer">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="female" />
              <Label htmlFor="female"className="cursor-pointer">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="other" />
              <Label htmlFor="other"className="cursor-pointer">其他</Label>
            </div>
          </RadioGroup></FormControl>)}
        />
        </div>


        <SubmitButton isLoading={isLoading}>提交</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
