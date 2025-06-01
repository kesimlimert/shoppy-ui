"use server";

import { get } from "@/app/common/util/fetch";

export async function getMe() {
    return get("users/me");
}
        