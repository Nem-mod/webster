import { useEffect, useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CustomNavBar } from '../../components/NavBar/CustomNavBar';
import { fetchLogout } from '../../redux/slices/auth/auth-slice.service';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/instance';

export default function UserProfilePage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.data);
	const [sentResetPass, setSentResetPass] = useState(false);

	const handleLogOut = async () => {
		dispatch(fetchLogout(null)).then(() => {
			navigate('/');
		});
	};

	const handleResetPassword = async () => {
		const redirectURL = `${window.location.origin}/reset-password?token=replaceToken&email=${user?.email}`;
		axios.post('auth/resetpsw/send', {
			email: user?.email,
			returnLink: redirectURL,
		});
		setSentResetPass(true);
	};

	return (
		<>
			<CustomNavBar />
			<div className={'p-10 grid place-items-center'}>
				<span className={'text-6xl font-extrabold text-black m-auto pt-4 mb-6'}>
					Profile
				</span>
				{user && (
					<div className='w-4/6 gap-4 p-8 py-14 border-1 border-accent rounded-xl'>
						<div className={'flex flex-col '}>
							<div className={'flex w-4/6 flex-col gap-4'}>
								<span className={'text-3xl font-extrabold text-black'}>
									{user.username}
								</span>
								<span className={'text-2xl font-bold text-gray-700'}>
									{user.email}
								</span>
							</div>
							<div className={'flex ml-auto gap-2'}>
								<Button
									href={'/profile/edit'}
									as={Link}
									className={
										'mt-auto ml-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
										'w-fit text-lg font-semibold hover:border-accent hover:text-white'
									}
								>
									Edit profile
								</Button>

								<Button
									onClick={handleLogOut}
									color={'danger'}
									className={
										'mt-auto ml-auto h-12 text-white ' +
										'w-fit text-lg font-semibold hover:border-accent hover:text-white'
									}
								>
									Log out
								</Button>
							</div>
							<div>
								<Button
									onPress={handleResetPassword}
									color={'danger'}
									className={
										'mt-auto ml-auto mr-5 h-12 text-white ' +
										'w-fit text-lg font-semibold hover:border-accent hover:text-white'
									}
								>
									Reset Password
								</Button>
								{sentResetPass && (
									<span className={'text-black text-xl'}>
										We sent reset password link to your email
									</span>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
