type ActivityType = {
    name: string;
    type: string;
    start_date_local: string;
    distance: number;
};

const CardActivity = ({ activity }: { activity: ActivityType }) => {
    return (
        <div className="p-5 bg-neutral-100 rounded-lg">
            <p className="text-sm font-semibold text-neutral-600">
                {activity.type}
            </p>
            <p className="text-lg font-bold">{activity.name}</p>
            <div>{new Date(activity.start_date_local).toDateString()}</div>
            <div>{Math.round(activity.distance / 1000)}km</div>
        </div>
    );
};

export default CardActivity;
