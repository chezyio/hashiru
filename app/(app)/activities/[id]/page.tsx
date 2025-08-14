import { getActivity } from "@/app/lib/strava";

const page = async ({ params }: { params: { id: number } }) => {
    const activity = await getActivity(params.id);
    console.log(activity);

    const { id } = params;
    return (
        <div>
            <p className="text-4xl font-bold">{activity.name}</p>
            <p>{new Date(activity.start_date).toLocaleString()}</p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-10">
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Average Speed
                    </p>
                    <p className="text-2xl font-bold">
                        {activity.average_speed}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Max Speed
                    </p>
                    <p className="text-2xl font-bold">{activity.max_speed}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Average Heartrate
                    </p>
                    <p className="text-2xl font-bold">
                        {activity.average_heartrate}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Max Heartrate
                    </p>
                    <p className="text-2xl font-bold">
                        {activity.max_heartrate}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Max Elevation
                    </p>
                    <p className="text-2xl font-bold">{activity.elev_high}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Min Elevation
                    </p>
                    <p className="text-2xl font-bold">{activity.elev_low}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                        Device
                    </p>
                    <p className="text-2xl font-bold">{activity.device_name}</p>
                </div>
            </div>

            <div className="bg-pink-200">map</div>

            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                Activity ID: {id}
            </p>
        </div>
    );
};

export default page;
