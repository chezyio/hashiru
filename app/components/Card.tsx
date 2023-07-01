type RunType = {
    name: string;
    distance: number;
};

const Card = (run: RunType) => {
    return (
        <div className="p-4 bg-neutral-100">
            <div>{run.name}</div>
            <div>{run.distance}</div>
        </div>
    );
};

export default Card;
