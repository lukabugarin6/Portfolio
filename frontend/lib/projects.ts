import { Project, ResponseInterface } from './interface';

export async function getProjects(): Promise<ResponseInterface<Project[]>> {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects`;

	try {
		const response = await fetch(backendEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch projects data. Status: ${response.status}`);
		}

		const data: Project[] = await response.json();
		return {
			data,
			error: null
		};
	} catch (error: any) {
		console.error('Error fetching projects data:', error);
		return {
			data: null,
			error
		};
	}
}

export async function getProjectBySlug(slug: string): Promise<ResponseInterface<Project>> {
	const backendEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects/${slug}`;

	try {
		const response = await fetch(backendEndpoint);

		if (!response.ok) {
			throw new Error(`Failed to fetch project data. Status: ${response.status}`);
		}

		const data: Project = await response.json();
		return {
			data,
			error: null
		};
	} catch (error: any) {
		console.error(`Error fetching project data for slug ${slug}:`, error);
		return {
			data: null,
			error
		};
	}
}
