import Image from 'next/image';
// import { projectsData } from "@/lib/projectsData";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Project, ResponseInterface } from '@/lib/interface';

export interface ProjectGridInterface {
	projectsData: Project[] | null;
}

export default function ProjectsGrid({ projectsData: data }: ProjectGridInterface) {
	return (
		<section>
			<div className="grid grid-cols-1 gap-7 md:grid-cols-11 mx-7">
				{data &&
					data.length > 0 &&
					data.map((project) => {
						const { title, slug, images, stack, span } = project;
						return (
							<Link
								href={`/projects/${slug}`}
								className={cn(
									'cursor-pointer text-center',
									span === 7 && 'col-span-7',
									span === 4 && 'col-span-4'
								)}
							>
								<div className="relative h-[460px] transition-all duration-300 hover:opacity-80">
									<Image
										src={images && images[images.length - 1].imageUrl}
										fill
										alt="chatmeow"
										style={{ objectFit: 'cover' }}
									/>
								</div>
								<h3 className="transition-all duration-300 text-gray-900 hover:text-gray-400 mt-7 mb-1 text-xl font-normal leading-8 no-underline">
									{title}
								</h3>
								<h4 className="text-gray-500 text-base font-normal leading-7">
									{stack}
								</h4>
							</Link>
						);
					})}
			</div>
		</section>
	);
}
