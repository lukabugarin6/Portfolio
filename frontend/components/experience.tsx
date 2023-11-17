import { Experience } from '@/lib/interface';
import moment from 'moment';

export interface ExperienceInterface {
	experiencesData: Experience[] | null;
}

export default function Experience({ experiencesData }: ExperienceInterface) {
	return (
		<section>
			<div className="max-w-6xl mx-auto md:px-[30px] mb-[80px] mt-[80px] md:mb-[140px] md:mt-[140px]">
				<h2 className="mt-2 mb-2 text-[30px] md:text-4xl font-normal leading-[50px] md:mb-[50px]">
					My experience
				</h2>
				<div className="grid grid-cols-4">
					{experiencesData &&
						experiencesData.length > 0 &&
						experiencesData.map((exp) => (
							<div className="col-span-4 md:col-span-3">
								<h3 className="normal-case mb-2 text-xl font-normal leading-8">
									{exp.company}
								</h3>
								<h4 className="text-gray-500 text-base font-normal leading-7 mb-1">
									{exp.title}
								</h4>
								{/* Aug 2020 - Present */}
								<h5 className="text-gray-400 text-xs leading-5">
									{moment(exp.fromDate).format('MMM YYYY')} -{' '}
									{typeof exp.toDate === 'string'
										? exp.toDate
										: moment(exp.toDate).format('MMM YYYY')}
								</h5>
								<p className="text-gray-900 text-base font-normal leading-7">
									{exp.experience_parts &&
										exp.experience_parts.length > 0 &&
										exp.experience_parts.reverse().map((exp_part) => (
											<span className='block mb-2 md:mb-0'>
												<strong>
													{exp_part.title}
													<br />
													&zwj;
												</strong>
												{exp_part.description}
												<br />
											</span>
										))}
								</p>
							</div>
						))}
				</div>
			</div>
		</section>
	);
}
