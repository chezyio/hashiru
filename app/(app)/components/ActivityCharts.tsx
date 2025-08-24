"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface Split {
    km: number;
    pace: number;
    heartrate: number;
    elevation: number;
}

interface ActivityChartsProps {
    splits: Split[];
}

const chartConfig: ChartConfig = {
    pace: {
        label: "Pace (min/km)",
        color: "var(--chart-1)", // Blue, matches StatCard's blue-500
    },
    heartrate: {
        label: "Heart Rate (bpm)",
        color: "var(--chart-2)", // Pink, matches StatCard's pink-500
    },
    elevation: {
        label: "Elevation (m)",
        color: "var(--chart-3)", // Red, matches StatCard's red-500
    },
} satisfies ChartConfig;

const ActivityCharts: React.FC<ActivityChartsProps> = ({ splits }) => {
    // Check for valid data
    const hasPace = splits.some((split) => split.pace > 0);
    const hasHeartrate = splits.some((split) => split.heartrate > 0);
    const hasElevation = splits.some((split) => split.elevation > 0);

    // Calculate trend for each metric (percentage change from first to last split)
    const calculateTrend = (
        data: number[]
    ): { percentage: number; isUp: boolean } => {
        if (data.length < 2) return { percentage: 0, isUp: true };
        const first = data[0];
        const last = data[data.length - 1];
        const change = ((last - first) / first) * 100;
        return { percentage: Math.abs(change).toFixed(1), isUp: change >= 0 };
    };

    const paceTrend = calculateTrend(
        splits.map((split) => split.pace).filter((p) => p > 0)
    );
    const heartrateTrend = calculateTrend(
        splits.map((split) => split.heartrate).filter((h) => h > 0)
    );
    const elevationTrend = calculateTrend(
        splits.map((split) => split.elevation).filter((e) => e > 0)
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pace Chart */}
            {hasPace ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Pace</CardTitle>
                        <CardDescription>
                            Per kilometer (min/km)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={splits}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="km"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `${value} km`}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            formatter={(value) =>
                                                `${Number(value).toFixed(
                                                    1
                                                )} min/km`
                                            }
                                        />
                                    }
                                />
                                <Line
                                    dataKey="pace"
                                    type="natural"
                                    stroke="var(--color-pace)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            {paceTrend.percentage !== "0.0" ? (
                                <>
                                    Trending {paceTrend.isUp ? "up" : "down"} by{" "}
                                    {paceTrend.percentage}%{" "}
                                    {paceTrend.isUp ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                </>
                            ) : (
                                "No significant trend"
                            )}
                        </div>
                        <div className="text-muted-foreground leading-none">
                            Showing pace for {splits.length} splits
                        </div>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <p className="text-gray-500 dark:text-gray-400 pt-4">
                            No pace data available.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Elevation Chart */}
            {hasElevation ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Elevation</CardTitle>
                        <CardDescription>Per kilometer (m)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={splits}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="km"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `${value} km`}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            formatter={(value) =>
                                                `${Math.round(Number(value))} m`
                                            }
                                        />
                                    }
                                />
                                <Line
                                    dataKey="elevation"
                                    type="natural"
                                    stroke="var(--color-elevation)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            {elevationTrend.percentage !== "0.0" ? (
                                <>
                                    Trending{" "}
                                    {elevationTrend.isUp ? "up" : "down"} by{" "}
                                    {elevationTrend.percentage}%{" "}
                                    {elevationTrend.isUp ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                </>
                            ) : (
                                "No significant trend"
                            )}
                        </div>
                        <div className="text-muted-foreground leading-none">
                            Showing elevation for {splits.length} splits
                        </div>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <p className="text-gray-500 dark:text-gray-400 pt-4">
                            No elevation data available.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Heart Rate Chart */}
            {hasHeartrate ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Heart Rate</CardTitle>
                        <CardDescription>Per kilometer (bpm)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={splits}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="km"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `${value} km`}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            formatter={(value) =>
                                                `${Math.round(
                                                    Number(value)
                                                )} bpm`
                                            }
                                        />
                                    }
                                />
                                <Line
                                    dataKey="heartrate"
                                    type="natural"
                                    stroke="var(--color-heartrate)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            {heartrateTrend.percentage !== "0.0" ? (
                                <>
                                    Trending{" "}
                                    {heartrateTrend.isUp ? "up" : "down"} by{" "}
                                    {heartrateTrend.percentage}%{" "}
                                    {heartrateTrend.isUp ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                </>
                            ) : (
                                "No significant trend"
                            )}
                        </div>
                        <div className="text-muted-foreground leading-none">
                            Showing heart rate for {splits.length} splits
                        </div>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <p className="text-gray-500 dark:text-gray-400 pt-4">
                            No heart rate data available.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ActivityCharts;
