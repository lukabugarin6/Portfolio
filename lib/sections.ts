import { ResponseInterface, Section } from './interface';

export async function getSectionByIdentifier(
	identifier: string
): Promise<ResponseInterface<Section>> {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sections/${identifier}`;

	try {
		const response = await fetch(backendEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch sections data. Status: ${response.status}`);
		}

		const data: Section = await response.json();
		return {
			data,
			error: null
		};
	} catch (error: any) {
		console.error(`Error fetching sections data for identifier ${identifier}:`, error);
		return {
			data: null,
			error
		};
	}
}
