import { getActivities } from "../lib/strava";
import Card from "../components/CardActivity";
import Link from "next/link";
export const revalidate = 3600;

const ActivitiesPage = async () => {
    const activities = await getActivities();
    return (
        <div>
            <div className="grid gap-4 lg:grid-cols-3">
                {activities.map((act: any) => {
                    return (
                        <Link href={`/activities/${act.id}`} key={act.id}>
                            <Card activity={act} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ActivitiesPage;
