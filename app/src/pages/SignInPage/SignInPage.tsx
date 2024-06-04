import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import {CustomNavBar} from "../../components/NavBar/CustomNavBar.tsx";

export default function SignInPage() {
    return (
        <div className={'flex flex-col h-screen'}>
          <CustomNavBar/>
          <div className={'flex justify-center items-center grow w-screen bg-gradient-to-bl from-accent/50 to-light/50'}>
            <div className={'flex gap-10 max-w-screen-xl'}>
                <div className={'relative flex flex-col flex-grow basis-1/2 justify-center rounded-s-xl bg-secondary/30 max-h shadow-xl'}>
                    <div className={'z-20'}>
                        <LoginForm />
                    </div>
                    {/*<div className={'absolute -inset-1  rounded-s-xl blur-sm z-10 '}></div>*/}
                </div>
                <div className={'py-6 pr-6 flex-grow flex flex-col gap-6 basis-1/2 border-2 border-l-0 border-primary/30 rounded-e-xl text-justify'}>
                    <h1 className={'text-4xl font-semibold text-black'}>Welcome to Multiverse!</h1>
                    <p className={'text-2xl text-black'}>Please log in to access exclusive deals, manage your bookings, and enjoy a seamless ticket purchasing experience. Your entertainment journey starts here. Let's get started!</p>
                </div>
            </div>
          </div>
        </div>
    );
}
