import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAuthMe } from '../../redux/slices/auth/auth-slice.service';

export function CustomNavBar() {
	const dispatch = useAppDispatch();
	const [_, setIsMenuOpen] = useState(false);
	const user = useAppSelector((state) => state.auth.data);
	useEffect(() => {
		dispatch(fetchAuthMe(null))
	}, [])
	
	return (
		<Navbar
			className={'bg-accent'}
			shouldHideOnScroll={true}
			onMenuOpenChange={setIsMenuOpen}
			isBordered
			maxWidth={'xl'}
		>
			<NavbarContent>
				<NavbarMenuToggle className={'sm:hidden'} />
				<NavbarBrand className={'flex gap-12'}>
					<NavbarItem>
						<Link href={'/'} className='font-bold text-inherit text-white'>
							MULTIVERSE
						</Link>
					</NavbarItem>
					{user && (
						<NavbarItem isActive>
							<Link
								href={'/home'}
								aria-current='page'
								className={'text-white'}
							>
								Home
							</Link>
						</NavbarItem>
					)}
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent
				className='hidden gap-4 sm:flex'
				justify='center'
			></NavbarContent>
			<NavbarContent justify='end'>
				{user ? (
					<NavbarItem className='hidden lg:flex'>
						<Link href={'/profile'} className={'text-white'}>
							{user?.email}
						</Link>
					</NavbarItem>
				) : (
					<>
						<NavbarItem className='hidden lg:flex'>
							<Link href={'/signin'} className={'text-white'}>
								Login
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Button
								as={Link}
								className={'text-white'}
								href='/signup'
								variant='flat'
							>
								Sign Up
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
