import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionUser } from "./auth";

export type ChatGPTUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

const USER_ID_HEADER = "oai-authenticated-user-id";
const USER_EMAIL_HEADER = "oai-authenticated-user-email";
const USER_FULL_NAME_HEADER = "oai-authenticated-user-full-name";
const USER_FULL_NAME_ENCODING_HEADER =
  "oai-authenticated-user-full-name-encoding";
const PERCENT_ENCODED_UTF8 = "percent-encoded-utf-8";

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  // First check if user is authenticated via Studio Session (Passcode or Google OAuth)
  const sessionUser = await getSessionUser();
  if (sessionUser) {
    return {
      userId: sessionUser.email,
      displayName: sessionUser.name,
      email: sessionUser.email,
      fullName: sessionUser.name,
    };
  }

  // Fallback to ChatGPT headers if in ChatGPT iframe/site
  try {
    const requestHeaders = await headers();
    const userId = requestHeaders.get(USER_ID_HEADER);
    const email = requestHeaders.get(USER_EMAIL_HEADER);
    if (!userId || !email) return null;

    const encodedFullName = requestHeaders.get(USER_FULL_NAME_HEADER);
    const fullName =
      encodedFullName &&
      requestHeaders.get(USER_FULL_NAME_ENCODING_HEADER) === PERCENT_ENCODED_UTF8
        ? safeDecodeURIComponent(encodedFullName)
        : null;

    return {
      userId,
      displayName: fullName ?? email,
      email,
      fullName,
    };
  } catch {
    return null;
  }
}

export async function requireChatGPTUser(
  returnTo: string,
): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;

  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  return `/?signin=1`;
}

export function chatGPTSignOutPath(returnTo = "/"): string {
  return `/`;
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
