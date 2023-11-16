import { MailFormData } from './interface';

export async function sendEmail(formData: MailFormData) {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/mail/send-email`;

    const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // You may need to include additional headers, such as authorization headers, if required
        },
        body: JSON.stringify(formData)
    });

    return response;
}
