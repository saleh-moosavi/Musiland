import { FormSchemaKey } from "@/constants/zodSchema";
import { UseFormRegisterReturn, FieldValues, FieldPath } from "react-hook-form";

export interface GenericFormData {
  _id: string;
  name: string;
}

export interface CustomInputProps<TFieldValues extends FieldValues> {
  name: string;
  register: UseFormRegisterReturn<FieldPath<TFieldValues>>;
  icon: React.ReactNode;
  error?: React.ReactNode | string;
  classes?: string;
}

export interface CustomOptionProps<TFieldValues extends FieldValues> {
  title: string;
  register: UseFormRegisterReturn<FieldPath<TFieldValues>>;
  data: GenericFormData[];
  error?: React.ReactNode | string;
  icon?: React.ReactNode;
  multiple?: boolean;
  classes?: string;
}

export interface GenericFormProps {
  mode: "add" | "edit";
  schemaKey: FormSchemaKey;
  baseUrl: string;
  redirectPath: string;
  itemName: string;
  idParamKey: string;
  nameParamKey: string;
  onSuccess?: () => void;
}
