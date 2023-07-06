import Image from "next/image";

import Pegasus from "../../public/gears/pegasus40.png";

const CardGear = ({ shoe }) => {
    return (
        <div className="bg-neutral-100 rounded-lg p-6">
            {/* <div className="bg-pink-200 ">xx</div> */}
            <Image
                src={Pegasus}
                width={300}
                className="relative -top-14 flex mx-auto"
            />
            <p className="text-xl font-bold mt-4">{shoe.nickname}</p>
            <p className="text-bae font-semibold">{shoe.name}</p>
            <div className="mt-6">
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                    Mileage
                </p>
                <p>{shoe.converted_distance} km</p>
            </div>
        </div>
    );
};

export default CardGear;




