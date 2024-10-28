"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"


interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  
  const{fieldType,iconSrc,iconAlt,placeholder,dateFormat,showTimeSelect ,children,renderSkeleton}=props

  switch (fieldType) {
    
    case FormFieldType.INPUT:
      
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    
    case FormFieldType.TEXTAREA:
      return(
        <FormControl> 

          <Textarea placeholder={placeholder} 
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="TW"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    
      case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value}
                  onCheckedChange={field.onChange}/>
              <label
                htmlFor={props.name} className="checkbox-label"
                >
 {props.label}     
  </label>
    </div>
          </FormControl>
        );
      // case FormFieldType.CHECKBOX:
    //   return (
    //     <FormControl>
    //       <div className="flex items-center gap-4">
    //         <Checkbox
    //           id={props.name}
    //           checked={field.value}
    //           onCheckedChange={field.onChange}
    //         />
    //         <label htmlFor={props.name} className="checkbox-label">
    //           {props.label}
    //         </label>
    //       </div>
    //     </FormControl>
    //   );
    case FormFieldType.DATE_PICKER:

      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            
              <DatePicker
                  popperPlacement="top-end"
                timeInputLabel="Time:"
                showTimeSelect={props.showTimeSelect ?? false}
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                timeInputLabel="Time:"
                dateFormat={props.dateFormat ?? "yyyy/MM/dd"}
                wrapperClassName="date-picker"
              />
          
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return(
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="shad-select-trigger">
             <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {children}
           </SelectContent>
          </Select>
        </FormControl>
      );
      
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      return null;
  }
};
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
