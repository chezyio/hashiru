import Image from "next/image";
import { getAthlete } from "../lib/strava";

const ProfilePage = async () => {
    const athlete = await getAthlete();

    return (
        <div>
            <div>ProfilePage</div>

            <br />
            <p>Profile</p>
            <div>{athlete.firstname}</div>
            <div>{athlete.lastname}</div>
            <br />
            <div>Shoes</div>
            <div>
                {athlete.shoes.map((shoe) => {
                    return (
                        <div>
                            <p>{shoe.name}</p>
                            <p>{shoe.id}</p>
                        </div>
                    );
                })}
            </div>
            {/* <Image src={athlete.profile} width={16} height={16} /> */}
            {console.log(athlete)}
        </div>
    );
};

export default ProfilePage;
