"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import {  useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Doctors, IdentificationTypes } from "@/constants";
import {  SelectGroup,SelectItem,} from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import {DevTool} from '@hookform/devtools'
import { PatientFormDefaultValues } from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
const RegisterForm = ({user}:{user:User}) => {
  const router = useRouter();
  //TODO: user不存在時要redirect
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name:  user.name,
      email : user.email,
      phone: user.phone

    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values:z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(data)
    setIsLoading(true);
    
    let formData

    if (values.identificationDocument &&
      values.identificationDocument?.length > 0){
        // console.log(values.identificationDocument)
        const blobFile=new Blob([values.identificationDocument[0]],{
          type:values.identificationDocument[0].type
        })
        //console.log(blobFile)
        formData=new FormData()
        formData.append("blobFile",blobFile)
        formData.append("fileName",values.identificationDocument[0].name)
      }
    try {
      const patientData={
        ...values,
        userId:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument:formData
      }
      console.log(patientData)
      //@ts-ignore
      const patient=await registerPatient(patientData)
      if (patient) router.push(`new-appointment`) // 修正路徑
      // const ww=form.getValues()
      // console.log(ww)
      //console.log(gender)

      //const newUser = await createUser({ username, email, phone });
      //console.log(newUser);
      //if (newUser) {
        // TODO: 處理成功情況，例如重定向或顯示成功消息
      //   router.push(`/patients/${newUser.$id}/register`);
      //   console.log(newUser);
      //   console.log(primaryPhysician)
      // }
    } catch (error) {
      // TODO: 顯示錯誤消息給用戶
      console.error('error from here',error);

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
          name="name"
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
          renderSkeleton={(field) => {
          return(
          <FormControl>
            <RadioGroup  className="flex h-11 gap-6 xl:justify-between" 
            onValueChange={field.onChange}
            defaultValue={field.value}
            >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female"className="cursor-pointer">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other"className="cursor-pointer">其他</Label>
            </div>
          </RadioGroup></FormControl>)}
          }
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="地址"
          placeholder="嘉義市西區XX路"
          
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label="職位"
          placeholder="工程師"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergencyContactName"
          label="緊急聯絡人"
          placeholder="家人姓名"
          
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="緊急聯絡人電話"
          placeholder="(886)9444444"
        />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information </h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="primary Physician"
          placeholder="選擇一名醫師"
          
        >
          {Doctors.map((doctor)=>(
            <SelectItem key={doctor.name} value={doctor.name} className="hover:bg-gray-800">
              <div className="flex cursor-pointer item-center gap-2">
                <Image src={doctor.image} alt={doctor.name} width={32} height={32} className="rounded-full border border-dark-500"/>
                <p>{doctor.name}</p>
                </div>
              </SelectItem>
          ))}
          </CustomFormField>


        
        </div>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insuranceProvider"
          label="保險公司"
          placeholder="全民健康保險"
          
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insurancePolicyNumber"
          label="保單號碼"
          placeholder="ABC12345678"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="allergies"
          label="過敏原"
          placeholder="對什麼物質過敏,EX:蝦"
          
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="現在使用的藥品"
          placeholder="ACT 500mg QID"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="familyMedicalHistory"
          label="家族史"
          placeholder="家族疾病:EX 阿公:糖尿病"
          
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="passMedicalHistory"
          label="過去病史"
          placeholder="糖尿病"
        />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Identification and Verfication </h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row ">
        
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="身分證照類型"
          placeholder="選擇一種證件"
        >
          <SelectGroup>
              <SelectItem key={"身分證"} value={"身分證"} className="hover:bg-gray-800">
                <div className="flex cursor-pointer item-center gap-2 ">
                <p>身分證</p>
                </div>
              </SelectItem>
              <SelectItem key={"健保卡"} value={"健保卡"} className="hover:bg-gray-800">
              <div className="flex cursor-pointer item-center gap-2">
                <p>健保卡</p>
                </div>
              </SelectItem>
              <SelectItem key={"護照"} value={"護照"} className="hover:bg-gray-800">
              <div className="flex cursor-pointer item-center gap-2">
                <p>護照</p>
                </div>
              </SelectItem>
              {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type} className="hover:bg-gray-800">{type}</SelectItem>
              ))}
              </SelectGroup>
              
               
          </CustomFormField>
          </div>

          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="身分證號碼"
          placeholder="IXXXXXX"
          
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="上傳證件"
          renderSkeleton={(field )=>{
            //console.log(field.onChange.target)
            return(
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
            )}
          }
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">隱私權須知</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
    
        />
         <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
    
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
    
        />

        <SubmitButton isLoading={isLoading} >提交</SubmitButton>
      </form>
      {/* <DevTool control={form.control} /> */}

    </Form>
  );
};

export default RegisterForm;
