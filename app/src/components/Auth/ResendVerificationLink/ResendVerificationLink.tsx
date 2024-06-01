import { Link } from '@nextui-org/react';
import { sendVerificationLink } from '../../../redux/slices/auth/auth-slice.service';

interface Props {
	email: string;
}
function ResendVerificationLink({ email }: Props) {
	const handleClick = async () => {
		if (!email) return;
		sendVerificationLink(email);
	};
	return <Link onClick={handleClick}>Click to resend.</Link>;
}

export default ResendVerificationLink;
