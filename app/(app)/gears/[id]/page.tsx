import { getGear } from "../../lib/strava";
import Pegasus from "../../../public/gears/pegasus40.png";
import Image from "next/image";

const GearPage = async ({ params }: { params: { id: number } }) => {
    const gear = await getGear(params.id);
    console.log(gear);

    return (
        <div>
            <div>gearpage</div>
            <div>my gear: {params.id}</div>
            <Image src={Pegasus} width={500} alt="image" />
            <p className="text-[256px] font-bold">{gear.nickname}</p>
            <p className="text-2xl">{gear.name}</p>

            <p className="text-2xl">{gear.converted_distance}</p>
            <p className="text-2xl">{gear.brand_name}</p>
            <p className="text-2xl">{gear.model_name}</p>
        </div>
    );
};

export default GearPage;
