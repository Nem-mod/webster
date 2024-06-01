import LoginForm from "../../components/Auth/LoginForm/LoginForm";

export default function SignInPage() {
    return (
      <div className={'flex justify-center items-center h-screen w-screen bg-gradient-to-bl from-accent/60 to-light/60'}>
        <div className={'flex gap-10 max-w-screen-xl'}>
            <div className={'flex flex-col flex-grow basis-1/2 justify-center bg-secondary/30 rounded-s-xl max-h'}>
                <LoginForm />
            </div>
            <div className={'pt-6 flex-grow flex flex-col gap-6 basis-1/2 border-2 border-l-0 border-primary/30 rounded-e-xl'}>
                <h1 className={'text-4xl font-semibold text-black'}>Welcome to Multiverse!</h1>
                <p className={'text-2xl text-black'}>Please log in to access exclusive deals, manage your bookings, and enjoy a seamless ticket purchasing experience. Your entertainment journey starts here. Let's get started!</p>
            </div>
        </div>
      </div>
    );
}
