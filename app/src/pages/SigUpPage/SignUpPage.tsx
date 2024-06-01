import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";

export default function SignUpPage() {
    return (
        <div className={'m-auto mt-10 max-w-screen-xl'}>
            <div className={'flex gap-10'}>
                <div className={'mt-6 flex flex-col gap-6 flex-grow basis-1/2'}>
                    <h1 className={'text-4xl font-semibold text-black'}>You should join the Multiverse now!</h1>
                    <p className={'text-2xl text-black'}>
                        Sign up now to unlock access to the hottest events, early bird offers, and personalized recommendations tailored just for you.
                        Create your account today and embark on a journey filled with unforgettable experiences.
                        Let's start your adventure together!
                    </p>
                </div>
                <div className={'flex-grow basis-1/2 justify-center bg-accent/15'}>
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}
