import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import InputFormText from '../../components/Auth/InputFormText/InputFormText';
import { IUserUpdate } from '../../redux/slices/auth/auth-slice.types';
import { Button, Link } from '@nextui-org/react';
import { fetchUpdateProfile } from '../../redux/slices/auth/auth-slice.service';
import { useNavigate } from 'react-router-dom';

const schema: ZodType<IUserUpdate> = z.object({
	username: z.string(),
});

export default function EditProfilePage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.data);
	const {
		register,
		handleSubmit,
		formState: {},
	} = useForm<IUserUpdate>({ resolver: zodResolver(schema) });

	// TODO: ADD LOGIC
	const submitEdit = async (data: IUserUpdate) => {
		try {
			dispatch(fetchUpdateProfile(data)).then(() => {
				navigate('/profile');
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={'p-10 grid place-items-center'}>
			<span className={'text-6xl font-extrabold text-black pt-4'}>
				Edit Profile
			</span>
			<div className={'flex w-2/5 my-6'}>
				<form
					onSubmit={handleSubmit(submitEdit)}
					className={'w-full flex flex-col gap-4 p-8 py-14'}
				>
					<InputFormText
						type={'text'}
						register={register}
						name={'username'}
						label={'Username'}
						defaultValue={user?.username}
					/>
					<div className={'flex flex-row gap-2 mt-8'}>
						<Button
							type={'submit'}
							className={
								'mt-auto mr-auto h-12 border border-primary bg-accent text-white hover:bg-accent ' +
								'w-fit text-lg font-semibold hover:border-accent hover:text-white'
							}
						>
							Save changes
						</Button>
						<Button
							href={'/profile'}
							as={Link}
							className={
								'mt-auto ml-auto h-12 border border-primary bg-red-800 text-white hover:bg-red-800/80 ' +
								'w-fit text-lg font-semibold hover:border-accent hover:text-white'
							}
						>
							Discard changes
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
