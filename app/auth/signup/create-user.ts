"use server";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";
import { FormError } from "@/app/common/interfaces/form-error.interface";

export default async function createUser(
    _prevState: FormError,
    formData: FormData
) {
  const { error } = await post("users", formData);
  if (error) {
    return { error };
  }
  redirect("/");
}