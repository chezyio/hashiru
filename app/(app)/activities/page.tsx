import { getActivities } from "../lib/strava";
import Link from "next/link";
import CardActivity from "../components/CardActivity";
const ActivitiesPage = async () => {
    const activities = await getActivities();

    return (
        <div className="min-h-screen py-12 px-6 md:px-12">
            <header className="mb-10">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                    Your Activities
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Explore your Strava journey with beautifully crafted
                    summaries
                </p>
            </header>

            {/* Activities Grid - Minimal card-based design */}
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activities.map((act: any) => (
                    <Link href={`/activities/${act.id}`} key={act.id}>
                        <CardActivity activity={act} />
                    </Link>
                ))}
            </section>

            {/* Empty State */}
            {activities.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">
                        No activities found. Start tracking your journey!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ActivitiesPage;
