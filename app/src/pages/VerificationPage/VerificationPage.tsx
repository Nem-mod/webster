import { useSearchParams } from 'react-router-dom';
import ResendVerificationLink from '../../components/Auth/ResendVerificationLink/ResendVerificationLink';
import ClippingMask from "../../components/Auth/ClippingMask.tsx";

export default function VerificationPage() {
	const [searchParams] = useSearchParams();

	const email = searchParams.get('email');
	if(!email) {
		return <></>
	}
	
	return (
		<div className={'flex justify-center items-center h-screen w-screen bg-gradient-to-bl from-accent/50 to-light/50'}>
			<div className={'max-w-screen-xl p-20 text-black flex flex-col gap-8 justify-center items-center'}>
				{/*<ClippingMask>*/}
					<h1 className='text-6xl font-bold'>Confirm registration</h1>
				{/*</ClippingMask>*/}
				<p>
					We have send you an email to verify account. Follow the link in the
					mail to continue
				</p>
				<p className='text-slate-400 cursor-pointer'>
					<ResendVerificationLink email={email} />
				</p>
			</div>
		</div>
	);
}
