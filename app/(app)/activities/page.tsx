import { getActivities } from "../lib/strava";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import CardActivity from "../components/CardActivity";
import { Bike, Mountain, Dumbbell } from "lucide-react";

// Map activity types to icons
const getActivityIcon = (sportType: string) => {
    switch (sportType.toLowerCase()) {
        case "ride":
        case "ebikeride":
            return <Bike className="w-6 h-6 text-indigo-600" />;
        case "run":
        case "trailrun":
            return <Mountain className="w-6 h-6 text-indigo-600" />;
        case "swim":
            return <Mountain className="w-6 h-6 text-indigo-600" />;
        case "hike":
        case "walk":
            return <Mountain className="w-6 h-6 text-indigo-600" />;
        case "weighttraining":
        case "workout":
            return <Dumbbell className="w-6 h-6 text-indigo-600" />;
        default:
            return <Bike className="w-6 h-6 text-indigo-600" />;
    }
};
// Server component for fetching activities
const ActivitiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) => {
    const params = await searchParams; // Await searchParams
    const page = parseInt(params.page || "1", 10);
    const perPage = 30;
    const activities = await getActivities(perPage, page);

    // Assume more pages exist if we get a full page of activities
    const hasNextPage = activities.length === perPage;
    const hasPrevPage = page > 1;

    // For pagination controls, we'll show a range of pages (e.g., current page ± 2)
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = startPage + maxVisiblePages - 1;

    return (
        <div className="container mx-auto px-4 min-h-screen transition-colors duration-200">
            <section className="py-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Activities
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Run run run
                </p>
            </section>

            {/* Activities Grid */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activities.map((act: any) => (
                    <Link href={`/activities/${act.id}`} key={act.id}>
                        <Card className="duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    {getActivityIcon(
                                        act.sport_type || act.type
                                    )}
                                    <span className="text-xl font-bold truncate">
                                        {act.name}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        act.start_date_local
                                    ).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </section>

            {/* Empty State */}
            {activities.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                        No activities found. Start tracking your journey!
                    </p>
                </div>
            )}

            {/* Pagination */}
            {(hasPrevPage || hasNextPage) && (
                <section className="mt-10 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            {hasPrevPage && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={`/activities?page=${page - 1}`}
                                    />
                                </PaginationItem>
                            )}
                            {Array.from(
                                { length: endPage - startPage + 1 },
                                (_, i) => startPage + i
                            ).map((p) => (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        href={`/activities?page=${p}`}
                                        isActive={p === page}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {hasNextPage && (
                                <PaginationItem>
                                    <PaginationNext
                                        href={`/activities?page=${page + 1}`}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </section>
            )}
        </div>
    );
};

export default ActivitiesPage;
