import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchAuthMe } from './redux/slices/auth/auth-slice.service';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';

function App() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const auth = useAppSelector((state) => state.auth);
	useEffect(() => {
		dispatch(fetchAuthMe(null));
	}, []);

	if (auth.loading) {
		return (
			<div className='h-screen flex items-center justify-center'>
				<Spinner
					classNames={{
						base: 'w-36 h-32',
					}}
				/>
			</div>
		);
	}

	if (auth.success) {
		navigate('/home');
	}

	return <div>Pls Login</div>;
}

export default App;
