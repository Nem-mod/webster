import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

export function CustomNavBar() {
	const [_, setIsMenuOpen] = useState(false);
	const user = useAppSelector((state) => state.auth.data);
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
								href={'/events'}
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
