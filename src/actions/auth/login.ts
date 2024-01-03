"use server";
import { signIn } from "@/auth.config";
import { sleep } from "@/utils";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false
    });

    return "Success";
  } catch (error) {
    console.log(error);

    return "CredentialsSignin";
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo iniciar sesion" };
  }
}
