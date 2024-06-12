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
	const [hover, setHover] = useState(true);
	useEffect(() => {
		dispatch(fetchAuthMe(null))
	}, [])

	useEffect(() => {
		console.log('hover', hover)
	}, [hover])

	const path = 'M0,0 20,20 0,0';
	
	return (
		<>
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
						<Link 
							href={'/'} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(true)}}
							className='font-bold text-inherit text-white my-auto'
						>
							<div className='flex gap-0.5 h-full items-center'>
								<svg
									// fill='#000000'
									width='40px'
									height='40px'
									viewBox='0 0 75 75'
									xmlns='http://www.w3.org/2000/svg'
									className='mr-2'
								>
									<rect x='5' y='5' width={40} height={40} className='fill-black'>
										{hover && (
											// <>
											// 	<animate attributeName='x' values='5;20' dur='1s' repeatCount="indefinite"/>
											// 	<animate attributeName='y' values= '5;20' dur='1s' repeatCount="indefinite"/>
											// </>
											<animateMotion path={'M0,0 q-5,-5 0,0'} begin='0.1s' dur='2s' repeatCount={hover ? 'indefinite' : 0} />
										)}
									</rect>
									<rect x='20' y='20' width={40} height={40} rx={10} className='fill-secondary'>
										{hover && (
											<>
												<animate attributeName='x' values='20;17.5;20' dur='2s' repeatCount={hover ? 'indefinite' : 0}/>
												<animate attributeName='y' values= '20;17.5;20' dur='2s' repeatCount={hover ? 'indefinite' : 0}/>
												<animate attributeName='width' values= '40;42.5;40' dur='2s' repeatCount={hover ? 'indefinite' : 0}/>
												<animate attributeName='height' values= '40;42.5;40' dur='2s' repeatCount={hover ? 'indefinite' : 0}/>
											</>
											// <animateMotion path={path} begin='0s' dur='1.5s' repeatCount={'indefinite'} fill='freeze'/>
										)}
									</rect>
									<circle cx='55' cy='55' r={20} className='fill-white'>
										{hover && (
											// <>
											// 	<animate attributeName='cx' values='55;70' dur='1s' repeatCount="indefinite"/>
											// 	<animate attributeName='cy' values= '55;70' dur='1s' repeatCount="indefinite"/>
											// </>
											<animateMotion path={'M0,0 q5,5 0,0'} begin='0.1s' dur='2s' repeatCount={hover ? 'indefinite' : 0} />
										)}
									</circle>
								</svg>
								<span>
									META
								</span>
								<span>
									GRAPHICS
								</span>
							</div>
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
		</>
	);
}
