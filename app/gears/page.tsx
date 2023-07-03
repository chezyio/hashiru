import CardGear from "../components/CardGear";
import { getAthlete } from "../lib/strava";
import Link from "next/link";

const GearsPage = async () => {
    const gears = await getAthlete();
    // console.log(gears);
    return (
        <div>
            <div className="mb-16 text-4xl font-bold">Gears</div>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {gears.shoes.map((shoe) => {
                    return shoe.converted_distance > 40 ? (
                        <Link href={`/gears/${shoe.id}`}>
                            <CardGear shoe={shoe} key={shoe.id} />
                        </Link>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default GearsPage;
