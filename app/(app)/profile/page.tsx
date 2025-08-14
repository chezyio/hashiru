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
                {athlete.shoes.map((shoe: any) => {
                    return (
                        <div key={shoe.id}>
                            <p>{shoe.name}</p>
                            <p>{shoe.id}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfilePage;
