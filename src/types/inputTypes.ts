import { FormSchemaKey } from "@/constants/zodSchema";
import { UseFormRegisterReturn, FieldValues, FieldPath } from "react-hook-form";
import { ApiResponse, IGeneralRes } from "./generalItems";

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

interface IAddFn {
  mode: "add";
  submitFn: (name: string) => Promise<ApiResponse<IGeneralRes>>;
}
interface IEditFn {
  mode: "edit";
  submitFn: (name: string, id: string) => Promise<ApiResponse<IGeneralRes>>;
}

export interface GenericAddFormProps extends IAddFn {
  title: string;
  schemaKey: FormSchemaKey;
  redirectPath: string;
}

export interface GenericEditFormProps extends IEditFn {
  title: string;
  schemaKey: FormSchemaKey;
  redirectPath: string;
}
