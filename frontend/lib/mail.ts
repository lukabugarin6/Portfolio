import { MailFormData } from "./interface";

export async function sendEmail(formData: MailFormData) {
  const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mail/send-email`;

  const response = await fetch(backendEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
}
