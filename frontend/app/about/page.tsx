import Contact from '@/components/contact';
import { getSectionByIdentifier } from '@/lib/sections';
import { getSkills } from '@/lib/skills';
import Image from 'next/image';

const skills = [
	'React',
	'React-native',
	'Vue.js',
	'Flutter',
	'Next.js',
	'Laravel',
	'Node.js',
	'Wordpress',
	'Nest.js',
	'.NET'
];

export default async function AboutPage() {
	const { data: aboutHeroData } = await getSectionByIdentifier('about-hero');
	const { data: myCareerData } = await getSectionByIdentifier('my-career');
	const { data: skillsData } = await getSkills();

	return (
		<>
			<section className="max-w-[1140px] mx-auto mb-[140px]">
				<div className="grid grid-cols-3 gap-[80px] min-h-[450px]">
					<div>
						<h3 className="uppercase mb-2 text-xs leading-5 tracking-wider text-gray-400 font-serif-medium font-medium">
							{aboutHeroData?.subtitle}
						</h3>
						<h2 className="mt-2 mb-5 text-3xl text-gray-900">{aboutHeroData?.title}</h2>
						<p className="text-base font-normal leading-[28px] text-gray-400">
							{aboutHeroData?.paragraph}
						</p>
					</div>
					<div className="col-span-2 relative">
						{aboutHeroData?.image && (
							<Image
								style={{ objectFit: 'cover' }}
								fill
								src={aboutHeroData.image.imageUrl}
								alt="<3"
							/>
						)}
					</div>
				</div>
			</section>
			<section className="max-w-[1140px] mx-auto mb-[140px]">
				<div className="grid grid-cols-2 gap-[80px]">
					<div>
						<h3 className="mt-2 mb-2 text-3xl font-normal leading-[46px]">
							{myCareerData?.title}
						</h3>
						<p className="text-base font-normal leading-[28px] text-gray-400">
							{myCareerData?.paragraph}
						</p>
					</div>
					<div className="grid grid-cols-2 pt-4 gap-x-[30px]">
						{skillsData &&
							skillsData.length > 0 &&
							skillsData
								.sort((a, b) => a.order - b.order)
								.map((skill) => (
									<h4 className="mb-2 text-3xl text-gray-400 leading-[46px]">
										{skill.title}
									</h4>
								))}
					</div>
				</div>
			</section>
			<Contact />
		</>
	);
}
