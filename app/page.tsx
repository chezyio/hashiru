import { getAthleteStats } from "./lib/strava";
import { getActivities } from "./lib/strava";
import Card from "./components/CardActivity";
import Link from "next/link";
import Image from "next/image";

const HomePage = async () => {
    const stats = await getAthleteStats(93040956);
    const topActivities = await getActivities(6);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
            {/* Hero Section */}
            <section className="py-16 sm:py-24 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                    Your Fitness Journey, Tracked
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                    Monitor your runs, set goals, and stay motivated with
                    insights backed by your Strava data.
                </p>
                <Link href="/activities">
                    <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
                        Explore Your Activities
                    </button>
                </Link>
                <div className="mt-12">
                    <Image
                        src="/fitness-illustration.svg"
                        width={500}
                        height={400}
                        alt="Fitness tracking illustration"
                        className="object-contain"
                    />
                </div>
            </section>

            {/* Stats and Dashboard */}
            <section className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Your Health at a Glance
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total Runs
                        </p>
                        <p className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
                            {stats.all_run_totals.count}
                        </p>
                    </div>
                    <div
                        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in"
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
                        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 animate-fade-in"
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

            {/* Privacy Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-800 rounded-2xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Data, Your Control
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    Your fitness data is securely stored and accessible only to
                    you. We prioritize your privacy with industry-standard
                    encryption, ensuring your information remains yours alone.
                </p>
                <Link href="/privacy">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        Learn more about our privacy approach
                    </span>
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
