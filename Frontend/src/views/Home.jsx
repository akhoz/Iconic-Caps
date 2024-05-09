import LinkButton from "../components/LinkButton.jsx";
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiUnderarmour } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { SiReebok } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";
import { SiJordan } from "react-icons/si";

function Home() {
  return (
      <div className="flex flex-col" data-aos="fade-up">
          <div className="flex flex-col md:flex-row">
              <div className="bg-hero-left bg-no-repeat bg-cover h-72 flex flex-col-reverse items-start md:h-auto md:w-1/2 md:py-40 xl:py-64">
                  <div className='space-y-3 ml-5 mb-5 md:mb-0 lg:ml-10'>
                    <p className="text-7xl font-bold text-white">
                        We Are
                    </p>
                  </div>
              </div>
              <div
                  className="bg-hero-right bg-no-repeat bg-cover h-72 flex flex-col-reverse items-start md:h-auto md:w-1/2 md:py-40 xl:py-64">
                  <div className='space-y-3 mr-5 mb-5 md:mb-0 lg:mr-10'>
                    <p className="text-7xl font-bold text-white ml-5">
                        Iconic
                    </p>
                  </div>
              </div>
          </div>
          <div className="flex flex-row mt-10 items-center justify-center space-x-5 text-black text-3xl">
              <SiNike/>
              <SiJordan/>
              <SiAdidas/>
              <SiUnderarmour/>
              <SiPuma/>
              <SiReebok/>
              <SiNewbalance/>
          </div>
          <div className='flex flex-row justify-between items-center xl:mx-10'>
              <div className='w-1/2 text-wrap my-12 ml-5 md:my-8 lg:ml-20 xl:w-1/3' data-aos="fade-right">
                  <h1 className='text-5xl font-bold'>
                      Iconic Caps
                  </h1>
                  <p className='my-10 lg:mt-10 lg:mb-2'>
                      We are a premium cap store offering
                      top-quality caps from various
                      categories and leading brands.
                  </p>
                  <p className="hidden md:block md:mb-6">
                      Discover a world of premium headwear at
                      our store, where luxury meets style.
                      Explore our extensive collection
                      featuring top-quality caps crafted from
                      premium materials, meticulously curated
                      from leading brands and various categories.
                      Elevate your look with our exclusive
                      selection of caps, each embodying
                      unparalleled craftsmanship and timeless
                      elegance. Whether you are seeking the
                      perfect accessory for everyday wear or
                      a statement piece for special occasions,
                      our store offers the ultimate destination
                      for discerning cap enthusiasts.
                      Experience the epitome of style, comfort,
                      and sophistication with our premium cap collection.
                  </p>
                  <LinkButton
                      bgColor={'bg-black'}
                      textColor={'text-white'}
                      text={'Explore more'}
                      href={'./Shop'}
                  />
              </div>
              <img
                  src='/img/example-cap.png'
                  alt='example cap'
                  className='w-1/3 h-1/3 mr-5 lg:w-1/4 lg:mr-20'
                  data-aos="fade-left"
              />
          </div>
          <div className="relative h-screen">
              <video
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/hero-video.mp4"
                  type="video/mp4"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 lg:space-y-6" data-aos="fade-up">
                  <h1 className='text-xl text-white font-bold lg:text-5xl'>
                      Start shopping with us
                  </h1>
                  <LinkButton
                      bgColor={'bg-white'}
                      textColor={'text-black'}
                      text={'Log in'}
                      href={'./LogIn'}
                  />
              </div>
          </div>


      </div>
  );
}

export default Home;