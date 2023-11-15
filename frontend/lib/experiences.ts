import { Experience, ResponseInterface } from './interface';

export async function getExperiences(): Promise<ResponseInterface<Experience[]>> {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/experiences`;

	try {
		const response = await fetch(backendEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch experiences data. Status: ${response.status}`);
		}

		const data: Experience[] = await response.json();
		return {
			data,
			error: null
		};
	} catch (error: any) {
		console.error('Error fetching experiences data:', error);
		return {
			data: null,
			error
		};
	}
}