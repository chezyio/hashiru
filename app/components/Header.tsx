import React from "react";

import Link from "next/link";

const Header = () => {
    return (
        <div className="flex justify-between items-center my-4">
            <p className="text-2xl font-bold">走る</p>
            <div className="">
                <div className="mt-4 lg:mt-0">
                    <Link
                        href="/"
                        className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 -ml-2 p-2 rounded-md dark:hover:bg-neutral-800 dark:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="/gears"
                        className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 mx-2 p-2 rounded-md dark:hover:bg-neutral-800 dark:text-white"
                    >
                        Gears
                    </Link>
                    <Link
                        href="/activities"
                        className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 p-2 rounded-md dark:hover:bg-neutral-800 dark:text-white"
                    >
                        Activities
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
