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
			<div className="grid grid-cols-1 gap-6 md:gap-7 md:grid-cols-11 md:mx-[30px]">
				{data &&
					data.length > 0 &&
					data.map((project) => {
						const { title, slug, images, stack, span } = project;
						return (
							<Link
								href={`/projects/${slug}`}
								className={cn(
									'cursor-pointer text-center',
									span === 7 && 'md:col-span-7',
									span === 4 && 'md:col-span-4'
								)}
							>
								<div className="relative h-[180px] md:h-[460px] transition-all duration-300 hover:opacity-80">
									<Image
										src={images && images[images.length - 1].imageUrl}
										fill
										alt="chatmeow"
										style={{ objectFit: 'cover' }}
									/>
								</div>
								<h3 className="transition-all duration-300 text-gray-900 hover:text-gray-400 mt-2 md:mt-7 sm:mb-1 text-l md:text-xl font-normal leading-8 no-underline">
									{title}
								</h3>
								<h4 className="text-gray-500 text-sm md:text-base font-normal md:leading-7">
									{stack}
								</h4>
							</Link>
						);
					})}
			</div>
		</section>
	);
}
