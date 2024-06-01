import LoginForm from "../../components/Auth/LoginForm/LoginForm";

export default function SignInPage() {
    return (
        <div className={'m-auto mt-10 max-w-screen-xl'}>
            <div className={'flex gap-10'}>
                <div className={'flex flex-col flex-grow basis-1/2 justify-center bg-accent/15'}>
                    <LoginForm />
                </div>
                <div className={'mt-6 flex-grow flex flex-col gap-6 basis-1/2'}>
                    <h1 className={'text-4xl font-semibold text-black'}>Welcome to Multiverse!</h1>
                    <p className={'text-2xl text-black'}>Please log in to access exclusive deals, manage your bookings, and enjoy a seamless ticket purchasing experience. Your entertainment journey starts here. Let's get started!</p>
                </div>
            </div>
        </div>
    );
}
