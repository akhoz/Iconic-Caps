import Stores from '../components/Stores.jsx';

function LocalStores() {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-center mb-5">Our Stores</h1>
            <p className="text-center mb-5 md:text-xl ml:text-xl">We have stores in different cities. Visit us!</p>
                <Stores
                    imgSrc="../../public/img/local-ny.webp"
                    name="Iconic New York"
                    description="This is our first store in New York. We have a wide variety of products for all tastes."
                    employe="Adrian Villalobos"
                    email="newyorkcaps@iconicaps.com"
                    phone="1234567890"
                    ubication="https://maps.app.goo.gl/cWrt26NMwqvHCymc6"
                />
            </div>
    );
}

export default LocalStores;
