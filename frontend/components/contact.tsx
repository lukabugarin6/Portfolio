'use client';

import { useState } from 'react';
import { MailFormData } from '@/lib/interface';
import { sendEmail } from '@/lib/mail';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
	const [formData, setFormData] = useState<MailFormData>({
		name: '',
		email: '',
		message: ''
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const response = await sendEmail(formData);
			toast.success('Email sent successfully');

			setFormData({
				name: '',
				email: '',
				message: ''
			});
		} catch (error) {
			toast.error('Error sending email');
		} finally {
			setLoading(false);
		}
	};
	return (
		<section>
			<div className="bg-[#f4f4f4] py-[80px]">
				<div className="max-w-6xl mx-auto mx-8">
					<div className="w-[70%]">
						<h3 className="mt-2 mb-2 text-3xl font-normal leading-[46px] mb-[40px]">
							Want to get in touch?
							<br />
							Drop me a line!
						</h3>
						<form>
							<div className="grid grid-cols-2 gap-x-7 gap-y-2.5">
								<div>
									<label
										className="block uppercase mb-2.5 text-xs font-serif-medium font-medium leading-5"
										htmlFor="name"
									>
										Name
									</label>
									<input
										name="name"
										id="name"
										className="transition-all duration-300 w-full h-[38px] bg-white mb-4 text-sm block leading-6 py-6 px-4 outline-0 border-[1px] focus:border-gray-800"
										placeholder="Enter your name"
										onChange={handleChange}
									/>
								</div>
								<div>
									<label
										className="block uppercase mb-2.5 text-xs font-serif-medium font-medium leading-5"
										htmlFor="email"
									>
										Email
									</label>
									<input
										name="email"
										id="email"
										className="transition-all duration-300 w-full h-[38px] bg-white mb-4 text-sm block leading-6 py-6 px-4 outline-0 border-[1px] focus:border-gray-800"
										placeholder="Enter your email"
										onChange={handleChange}
									/>
								</div>
								<div className="col-span-2">
									<label
										className="block uppercase mb-2.5 text-xs font-serif-medium font-medium leading-5"
										htmlFor="message"
									>
										Message
									</label>
									<textarea
										name="message"
										id="message"
										className="font-serif min-h-[200px] transition-all duration-300 w-full bg-white mb-4 text-sm block leading-6 p-4 outline-0 border-[1px] focus:border-gray-800"
										placeholder="Enter your message"
										onChange={handleChange}
									/>
								</div>
							</div>
							<button
								className="transition-all duration-300 bg-gray-900 text-gray-100 uppercase h-[44px] px-6 font-serif text-xs hover:bg-slate-800 tracking-wider relative"
								type="button"
								onClick={handleSubmit}
							>
								{loading && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-100"></div>
									</div>
								)}
								{/* Use utility classes to control visibility and opacity */}
								<span className={`${loading ? 'invisible' : 'visible'}`}>Send</span>
							</button>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
			/>
		</section>
	);
}
