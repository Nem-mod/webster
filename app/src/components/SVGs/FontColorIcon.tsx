export default function FontColorIcon({color}) {
	return (
		<svg
			fill='#000000'
			width='30px'
			height='30px'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M5 18H5zm7.5-14h-1c-.401 0-.764.24-.921.609L5.745 16h2.173l1.273-3h5.604l1.268 3h2.171L13.421 4.61A1 1 0 0 0 12.5 4zm-2.46 7 1.959-4.616L13.95 11h-3.91z' />
			{/* <path d='M5 18H5 h14v10'/> */}
			<rect x='5' y='20' width={14} height={11} fill={color}/>
		</svg>
	);
}
