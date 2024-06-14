import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";

export default function SignUpPage() {
    return (
        <>
      <div className={'flex flex-col h-screen'}>
        <CustomNavBar/>
        <div className={'flex justify-center items-center grow w-screen bg-gradient-to-bl from-accent/50 to-light/50'}>
            <div className={'flex gap-10 max-w-screen-xl'}>
                <div className={'pt-6 pl-4 flex-grow flex flex-col gap-6 basis-1/2 border-2 border-r-0 border-primary/30 rounded-s-xl text-justify'}>
                    <h1 className={'text-4xl font-semibold text-black'}>Join MetaGraphics Today!</h1>
                    <p className={'text-2xl text-black'}>
                        Unlock a universe of creativity with MetaGraphics, the ultimate online canvas editor. Whether you're an experienced designer or just starting out, MetaGraphics provides everything you need to create stunning visuals.
                    </p>
                    <div className="flex flex-col gap-2 items-stretch">
                    
                        <div className={'flex flex-row gap-1 h-16 justify-items-stretch items-stretch'}>
                            <svg 
                                fill='#000000'
                                width='40px'
                                height='40px'
                                viewBox='0 0 6 6'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <circle cx={3} cy={3} r={'1'} fill="#000000"/>
                            </svg>
                            <p className="text-2xl text-black">
                                Intuitive Design Tools: Easily create beautiful designs with our user-friendly platform.
                            </p>
                        </div>
                
                    
                        <div className={'flex flex-row gap-1 h-16 justify-items-stretch items-stretch'}>
                            <svg 
                                fill='#000000'
                                width='40px'
                                height='40px'
                                viewBox='0 0 6 6'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <circle cx={3} cy={3} r={'1'} fill="#000000"/>
                            </svg>
                            <p className="text-2xl text-black">
                                Extensive Asset Library: Access a wide array of images and fonts to elevate your projects.
                            </p>
                        </div>

                        <div className={'flex flex-row gap-1 h-16 justify-items-stretch items-stretch'}>
                            <svg 
                                fill='#000000'
                                width='40px'
                                height='40px'
                                viewBox='0 0 6 6'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <circle cx={3} cy={3} r={'1'} fill="#000000"/>
                            </svg>
                            <p className="text-2xl text-black">
                                Secure Save and Share: Save your creations safely and share them with ease.
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div className={'flex flex-col flex-grow basis-1/2 justify-center bg-secondary/30 rounded-e-xl max-h shadow-xl'}>
                    <RegistrationForm />
                </div>
            </div>
        </div>
      </div>
      </>
    );
}

