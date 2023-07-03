import { getGear } from "../../lib/strava";

// export async function generateStaticParams() {
//     const athlete = await getAthlete();
//     return athlete.shoes.map((shoe) => ({
//         id: shoe.id,
//         nickname: shoe.nickname,
//     }));
// }

const GearPage = async ({ params }: { params: { id: string } }) => {
    const gear = await getGear(params.id);
    console.log(gear);

    return (
        <div>
            <div>gearpage</div>
            <div>my gear: {params.id}</div>
            <p className="text-2xl">{gear.name}</p>
            <p className="text-2xl">{gear.nickname}</p>
            <p className="text-2xl">{gear.converted_distance}</p>
            <p className="text-2xl">{gear.brand}</p>
            <p className="text-2xl">{gear.model_name}</p>
            <p className="text-2xl">{gear.model_name}</p>
        </div>
    );
};

export default GearPage;
