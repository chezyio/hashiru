import { getAthleteStats } from "./lib/strava";
import { getActivities } from "./lib/strava";
import Card from "./components/CardActivity";

import Link from "next/link";
import Image from "next/image";

import Cover from "../public/undraw_fitness_stats_sht6.svg";

// export const revalidate = 600;

const HomePage = async () => {
    const stats = await getAthleteStats(93040956);
    const topActivities = await getActivities(6);

    return (
        <div>
            <div className="">
                <div className="flex flex-col lg:flex-row justify-between lg:h-screen lg:items-center mb-6">
                    <div>
                        <div>
                            <p className="text-4xl lg:text-5xl font-bold mt-3 mb-6 dark:text-white">
                                Run to push your limits
                            </p>
                            <p className="text-sm lg:text-base dark:text-white">
                                Fun run all day everyday
                            </p>
                        </div>
                    </div>
                    <Image src={Cover} width={500} alt="image" />
                </div>

                {/* stats and dash */}
                <div className="grid gap-4 lg:grid-cols-3">
                    <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                            Total Runs
                        </p>
                        <p className="text-6xl font-bold">
                            {stats.all_run_totals.count}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                            Total Distance
                        </p>
                        <div className="flex items-end">
                            <p className="text-6xl font-bold">
                                {stats.all_run_totals.distance / 1000}
                            </p>
                            <p className="text-3xl font-bold">&nbsp;km</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                            Total Time
                        </p>
                        <div className="flex items-end">
                            <p className="text-6xl font-bold">
                                {stats.all_run_totals.moving_time}
                            </p>
                            <p className="text-3xl font-bold">&nbsp;mins</p>
                        </div>
                    </div>
                </div>

                {/* top few activities */}
                <div className="my-12">
                    <p className="text-2xl font-bold my-8">Recent Activities</p>

                    <div className="grid gap-4 lg:grid-cols-3">
                        {topActivities.map((act: any) => {
                            return (
                                <Link
                                    href={`/activities/${act.id}`}
                                    key={act.id}
                                >
                                    <Card activity={act} />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* activity type */}
                <div className="grid grid-cols-2 gap-4"></div>
            </div>
        </div>
    );
};

export default HomePage;
