import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";

export default function SignUpPage() {
    return (
        <div className={'flex justify-center items-center h-screen w-screen bg-gradient-to-bl from-accent/60 to-light/60'}>
            <div className={'flex gap-10 max-w-screen-xl'}>
                <div className={'pt-6 pl-4 flex-grow flex flex-col gap-6 basis-1/2 border-2 border-r-0 border-primary/30 rounded-s-xl'}>
                    <h1 className={'text-4xl font-semibold text-black'}>You should join the Multiverse now!</h1>
                    <p className={'text-2xl text-black'}>
                        Sign up now to unlock access to the hottest events, early bird offers, and personalized recommendations tailored just for you.
                        Create your account today and embark on a journey filled with unforgettable experiences.
                        Let's start your adventure together!
                    </p>
                </div>
                <div className={'flex flex-col flex-grow basis-1/2 justify-center bg-secondary/30 rounded-e-xl max-h'}>
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}
