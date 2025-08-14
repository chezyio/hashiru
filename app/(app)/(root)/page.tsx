import { getAthleteStats } from "../lib/strava";
import { getActivities } from "../lib/strava";

import Link from "next/link";
import Image from "next/image";
import jogging from "../../../public/jogging.svg";
import {
    PageActions,
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "../components/PageHeader";

import { Button } from "../../../components/ui/button";
import { fr } from "zod/v4/locales/index.cjs";

const title = "Your Fitness Journey, Tracked";
const description =
    "Monitor your runs, set goals, and stay motivated with insights backed by your Strava data.";

const HomePage = async () => {
    const stats = await getAthleteStats(93040956);
    const topActivities = await getActivities(6);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Hero Section */}
            <section>
                <PageHeader>
                    <PageHeaderHeading className="max-w-4xl">
                        {title}
                    </PageHeaderHeading>
                    <PageHeaderDescription>{description}</PageHeaderDescription>
                    <PageActions>
                        <Button asChild size="sm">
                            <Link href="/docs/installation">Get Started</Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                            <Link href="/docs/components">View Components</Link>
                        </Button>
                    </PageActions>
                </PageHeader>

                <Image
                    src={jogging}
                    width={500}
                    height={400}
                    alt="Fitness tracking illustration"
                    className="object-contain"
                />
            </section>

            {/* Stats and Dashboard */}
            <section className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Your Health at a Glance
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total Runs
                        </p>
                        <p className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
                            {stats.all_run_totals.count}
                        </p>
                    </div>
                    <div
                        className="p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total Distance
                        </p>
                        <div className="flex items-baseline mt-2">
                            <p className="text-5xl font-extrabold text-gray-900 dark:text-white">
                                {(stats.all_run_totals.distance / 1000).toFixed(
                                    1
                                )}
                            </p>
                            <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 ml-2">
                                km
                            </p>
                        </div>
                    </div>
                    <div
                        className="p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total Time
                        </p>
                        <div className="flex items-baseline mt-2">
                            <p className="text-5xl font-extrabold text-gray-900 dark:text-white">
                                {Math.floor(
                                    stats.all_run_totals.moving_time / 3600
                                )}
                                h{" "}
                                {Math.floor(
                                    (stats.all_run_totals.moving_time % 3600) /
                                        60
                                )}
                                m
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Activities */}
            <section className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Recent Activities
                </h2>
                <div className="overflow-x-auto flex space-x-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                    {topActivities.map((act, index) => (
                        <Link href={`/activities/${act.id}`} key={act.id}>
                            <div className="flex-none w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xs hover:shadow-lg transition-shadow duration-300 snap-center">
                                <div className="relative w-full h-64">
                                    {/* <Image
                                        src={null}
                                        alt={act.name}
                                        fill
                                        className="object-cover rounded-t-2xl"
                                    /> */}
                                    <div>Image</div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                                        <h3 className="text-lg font-semibold text-white">
                                            {act.name}
                                        </h3>
                                        <p className="text-sm text-gray-200">
                                            {(act.distance / 1000).toFixed(1)}{" "}
                                            km •{" "}
                                            {new Date(
                                                act.start_date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
