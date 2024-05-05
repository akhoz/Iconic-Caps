import LinkButton from "../components/LinkButton.jsx";

function Home() {
  return (
      <div className="flex flex-col">
          <div className="flex flex-col md:flex-row">
              <div
                  className="bg-hero-right bg-no-repeat bg-cover h-72 flex flex-col-reverse items-start md:h-auto md:w-1/2 md:py-40 xl:py-64">
                  <div className='space-y-3 ml-5 mb-5 md:mb-0 lg:ml-10'>
                      <p className='text-3xl text-white'>
                          Shop
                      </p>
                      <LinkButton
                          bgColor={'bg-white'}
                          textColor={'text-black'}
                          text={'Get Started'}
                          href={'#'}
                      />
                  </div>
              </div>
              <div
                  className="bg-hero-left bg-no-repeat bg-cover h-72 flex flex-col-reverse items-end md:h-auto md:w-1/2 md:py-40 xl:py-64">
                  <div className='space-y-3 mr-5 mb-5 md:mb-0 lg:mr-10'>
                      <p className='text-3xl text-white'>
                          About Us
                      </p>
                      <LinkButton
                          bgColor={'bg-white'}
                          textColor={'text-black'}
                          text={'Get Started'}
                          href={'#'}
                      />
                  </div>
              </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
              <div className='w-1/2 my-16 ml-5 lg:ml-20 text-wrap'>
                  <h1 className='text-5xl font-bold'>
                      Iconic Caps
                  </h1>
                  <p className='my-10'>
                      We are a premium cap store offering
                      top-quality caps from various
                      categories and leading brands.
                  </p>
                  <LinkButton
                      bgColor={'bg-black'}
                      textColor={'text-white'}
                      text={'Explore more'}
                      href={'#'}
                  />
              </div>
              <img
                  src='/img/example-cap.png'
                  alt='example cap'
                  className='w-1/3 h-1/3 mr-5 lg:w-1/4 lg:mr-20'
              />
          </div>
          <div className="relative h-screen">
              {/* Video de fondo */}
              <video
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/hero-video.mp4"
                  type="video/mp4"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 lg:space-y-6">
                  <h1 className='text-xl text-white font-bold lg:text-5xl'>
                      Start shopping with us
                  </h1>
                  <LinkButton
                      bgColor={'bg-white'}
                      textColor={'text-black'}
                      text={'Log in'}
                      href={'#'}
                  />
              </div>
          </div>


      </div>
  );
}

export default Home;