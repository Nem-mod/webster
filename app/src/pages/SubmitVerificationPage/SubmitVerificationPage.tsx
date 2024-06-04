import { Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResendVerificationLink from '../../components/Auth/ResendVerificationLink/ResendVerificationLink';
import { useAppDispatch } from '../../hooks/redux';
import { fetchVerifyRegistration } from '../../redux/slices/auth/auth-slice.service';
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";

export default function SubmitVerificationPage() {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams();
	const [verificationStatus, setVerificationStatus] = useState<boolean>();
	const token = searchParams.get('token');
	const email = searchParams.get('email')
	useEffect(() => {
		if (!token) return;
		// TODO: fix type error
		const { error } = dispatch(fetchVerifyRegistration({ token: token }));
		if(!error) {
			setVerificationStatus(true);
		}
	}, [])
	if (!email) {
		return <div></div>;
	}

	return verificationStatus ? (
			<div className={'flex flex-col h-screen'}>
				<CustomNavBar/>
				<div className='flex flex-col gap-8 justify-center items-center grow'>
					<h1 className='text-4xl font-bold'>Success!</h1>
					<p>You verified account. Gratz!</p>
					<p className='text-slate-400'>
						<i>
							<Link href={'/signin'}>Follow the link to log in.</Link>
						</i>
					</p>
				</div>
			</div>
		) : (
			<div className={'flex flex-col h-screen'}>
				<CustomNavBar/>
				<div className='flex flex-col gap-8 justify-center items-center grow'>
					<h1 className='text-4xl font-bold'>Error</h1>
					<p>Verification token has expired</p>
					<p className='text-slate-400 cursor-pointer'>
						<ResendVerificationLink email={email} />
					</p>
				</div>
			</div>
	);
}
