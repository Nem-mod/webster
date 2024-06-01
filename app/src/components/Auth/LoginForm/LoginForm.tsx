import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '../InputFormText/InputFormText';
import { Link } from '@nextui-org/react';
import { IUserAuthForm } from '../../../redux/slices/auth/auth-slice.types';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchAuth } from '../../../redux/slices/auth/auth-slice.service';
import { useNavigate } from 'react-router-dom';

const schema: ZodType<IUserAuthForm> = z.object({
	email: z.string().email(),
	password: z.string(),
});

function LoginForm() {
	const dispatch = useAppDispatch();
    const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IUserAuthForm>({ resolver: zodResolver(schema) });

	const action: () => void = handleSubmit(async (data: IUserAuthForm) => {
		const { error } = await dispatch(fetchAuth(data));
		if (error) {
			setError('root', { type: 'custom', message: error.message });
			return;
		}
        navigate('/')

	});

	return (
		<form
			onSubmit={action}
			className={
				'w-fill flex flex-col items-center justify-center gap-4 bg-transparent p-4 [&>*]:shadow-sm'
			}
		>
			<h1 className={'text-3xl font-bold text-black'}> Sign in </h1>

			<InputFormText
				register={register}
				name={'email'}
				type={'text'}
				label={'Email'}
				errorMessage={errors.email?.message}
			/>
			<InputFormText
				name={'password'}
				register={register}
				type={'password'}
				label={'Password'}
				errorMessage={errors.password?.message}
			/>

			<Link href={'/recovery'} underline={'hover'} className={'ml-auto'}>
				Forgot password?
			</Link>

			<Link href={'/signup'} underline={'hover'} className={'ml-auto'}>
				Create new account
			</Link>
			{errors.root?.message && (
				<h1 className={'text-red-600'}>{errors.root.message}</h1>
			)}
			<Button
				type={'submit'}
				className={
					'mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
					'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
				}
			>
				Submit
			</Button>
		</form>
	);
}

export default LoginForm;
