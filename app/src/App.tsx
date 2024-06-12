import { Link, Button } from "@nextui-org/react";
import { CustomNavBar } from "./components/NavBar/CustomNavBar";

function App() {
	// if (auth.loading) {
	// 	return (
	// 		<div className='h-screen flex items-center justify-center'>
	// 			<Spinner
	// 				classNames={{
	// 					base: 'w-36 h-32',
	// 				}}
	// 			/>
	// 		</div>
	// 	);
	// }

	// if (auth.success) {
	// 	navigate('/home');
	// }

	return (
		<div className={'overflow-hidden max-h-screen'}>

		<CustomNavBar/>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to MetaGraphics</h1>
          <p className="text-gray-600 text-xl mb-8">
            MetaGraphics is a powerful web app for creating stunning designs, from social media graphics to presentations and more.
          </p>
          <Button href="/signin" as={Link} size="lg" className="bg-accent text-white py-2 px-6 rounded-md hover:bg-accent">
            Get Started
          </Button>
					
          <Button href="/workspace/test" as={Link} size="lg" className="ml-5 bg-accent text-white py-2 px-6 rounded-md hover:bg-accent">
            Try for free
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center">Key Features</h2>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row">
              <div className="text-center mx-auto">
                <i className="fas fa-palette text-accent text-5xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Intuitive Editor</h3>
                <p className="text-gray-600 h-20 text-wrap w-2/3 mx-auto">
                MetaGraphics' intuitive editor makes it easy to create stunning designs.
                </p>
              </div>
              <div className="text-center mx-auto">
                <i className="fas fa-shapes text-accent text-5xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Thousands of Templates</h3>
                <p className="text-gray-600 h-20 text-wrap w-2/3 mx-auto">
                  Choose from thousands of professionally designed templates for all your design needs.
                </p>
              </div>

            </div>
            <div className="text-center">
              <i className="fas fa-cloud-upload-alt text-accent text-5xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Cloud-Based Storage</h3>
              <p className="text-gray-600 h-20 text-wrap 2-2/3 mx-auto">
                Access your designs from anywhere with MetaGraphics' cloud-based storage.
              </p>
            </div>
          </div>
        </div>
      </section>
		</div>
	);
}

export default App;
