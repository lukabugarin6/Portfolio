export interface ResponseInterface<T> {
	data: T | null;
	error: Error | null;
}

export interface IExternalUrls {
	spotify: string;
}
export interface IFollowers {
	href?: null;
	total: number;
}
export interface IImagesEntity {
	height: number;
	url: string;
	width: number;
}

export interface IArtistsAPIResponse {
	external_urls: IExternalUrls;
	followers: IFollowers;
	genres?: string[] | null;
	href: string;
	id: string;
	images?: IImagesEntity[] | null;
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface ISpotifyAlbum {
	album_type: string;
	artists: ISpotifyAlbum[];
	available_markets: string[];
	external_urls: IExternalUrls;
	href: string;
	id: string;
	images: IImagesEntity[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface ITracksAPIResponse {
	album: ISpotifyAlbum;
	artists: ISpotifyAlbum[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: IExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url?: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface ProjectImage {
	id: number;
	imageUrl: string;
	publicId: string;
}

export interface Project {
	id: number;
	title: string;
	slug: string;
	overview: string;
	span: number;
	stack: string;
	contributions: string;
	githubUrl: string;
	liveUrl: string;
	images: ProjectImage[];
}

export interface Experience {
	id: number;
	company: string;
	title: string;
	fromDate: Date;
	toDate: Date | string;
	createdAt: Date;
	experience_parts: ExperiencePart[];
}

export interface ExperiencePart {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
}

export interface Section {
	id: number;
	title: string;
	subtitle: string;
	paragraph: string;
	identifier: string;
	createdAt: Date;
	image: SectionImage;
}

export interface SectionImage {
	id: number;
	imageUrl: string;
	publicId: string;
	section: Section;
}

export interface Skill {
  id: number;
  title: string;
  order: number;
  createdAt: Date;
}

export interface MailFormData {
  name: string;
  email: string;
  message: string;
}