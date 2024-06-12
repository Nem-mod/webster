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
                    <h1 className={'text-4xl font-semibold text-black'}>Welcome Back to MetaGraphics!</h1>
                    <p className={'text-2xl text-black'}>Dive back into your creative projects with MetaGraphics, the premier online canvas editor. Whether you're a professional designer or exploring your creative potential, MetaGraphics equips you with the tools to bring your ideas to life.</p>
                </div>
            </div>
          </div>
        </div>
    );
}
