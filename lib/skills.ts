import { ResponseInterface, Skill } from './interface';

export async function getSkills(): Promise<ResponseInterface<Skill[]>> {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/skills`;

	try {
		const response = await fetch(backendEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch skills data. Status: ${response.status}`);
		}

		const data: Skill[] = await response.json();
		return {
			data,
			error: null
		};
	} catch (error: any) {
		console.error('Error fetching skills data:', error);
		return {
			data: null,
			error
		};
	}
}
