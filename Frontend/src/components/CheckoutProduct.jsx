
function CheckoutProduct() {
    return (
        <div className="flex w-10/12 flex-col" data-aos="fade-up">
            <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-row w-1/2 lg:py-10 lg:space-x-10 xl:space-x-20">
                    <p>
                        produc
                    </p>
                    <p>
                        Descrip
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center w-1/2 lg:py-10">
                    <p>
                        $100
                    </p>
                    <p>
                        3
                    </p>
                    <p>
                        $100
                    </p>
                </div>
            </div>
            <hr className="w-full border-b border-gray-100 xl:mt-10 xl:mb-14"/>
        </div>
    )
}

export default CheckoutProduct