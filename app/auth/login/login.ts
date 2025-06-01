"use server";

import { API_URL } from "@/app/common/constants/api";
import { FormError } from "@/app/common/interfaces/form-error.interface";
import { getErrorMessage } from "@/app/common/util/errors";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export default async function login(
    _prevState: FormError,
    formData: FormData
) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }
    await setAuthCookie(res);
    redirect("/");
}

const setAuthCookie = async (response: Response) => {
    const setCookiesHeader = response.headers.get("Set-Cookie");
    if (setCookiesHeader) {
        const token = setCookiesHeader.split(';')[0].split('=')[1];
        (await cookies()).set({
            name: AUTHENTICATION_COOKIE,
            value: token,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        })
    }
}