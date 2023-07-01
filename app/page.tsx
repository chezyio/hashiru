// import { getActivities } from "./lib/strava";

import Card from "./components/Card";
import { getActivities } from "./lib/strava";

export const revalidate = 3600;

const HomePage = async () => {
    const activities = await getActivities();

    return (
        <div>
            <div>hashiru</div>
            <div className="grid gap-y-4">
                {activities.map((act) => {
                    return <Card name={act.name} distance={act.distance} />;
                })}
            </div>
        </div>
    );
};

export default HomePage;
