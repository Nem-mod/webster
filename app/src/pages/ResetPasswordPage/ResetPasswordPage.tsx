import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import InputFormText from '../../components/Auth/InputFormText/InputFormText';

type FormValues = {
	password: string;
	repeatPassword: string;
};

const schema: ZodType<FormValues> = z
	.object({
		password: z.string(),
		repeatPassword: z.string(),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Password do not match',
		path: ['repeatPassword'],
	});

export default function ResetPasswordPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	if (!token) {
		navigate('/');
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const submitReset = (data: FormValues) => {
		if (!token) return;
		axios.post(`auth/resetpsw/validate?token=${token}`, {
			password: data.password,
		});
		navigate('/');
	};

	return (
		<div className={'flex max-w-screen mt-10'}>
			<div className={'flex flex-col mx-auto mt-unit-4xl p-12 w-2/5'}>
				<h1 className={'text-black font-bold text-4xl mb-4'}>Reset password</h1>
				<form
					className={'flex flex-col gap-4'}
					onSubmit={handleSubmit(submitReset)}
				>
					<InputFormText
						className={'w-4/5 mr-auto'}
						type={'password'}
						register={register}
						name={'password'}
						label={'New password'}
					/>

					<InputFormText
						className={'w-4/5 mr-auto'}
						type={'password'}
						register={register}
						name={'repeatPassword'}
						label={'Repeat password'}
						errorMessage={errors.repeatPassword?.message}
					/>

					<Button
						className={
							'm-auto mt-4 h-12 border border-primary bg-accent text-white hover:bg-accent ' +
							'w-2/5 text-lg font-semibold hover:border-accent hover:text-white'
						}
						type='submit'
					>
						Continue
					</Button>
				</form>
			</div>
		</div>
	);
}
