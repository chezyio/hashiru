import Link from "next/link";
import { siteConfig } from "../../../lib/config";

import { Separator } from "@/components/ui/separator";
import { MainNav } from "./main_nav";
import { MobileNav } from "./mobile_nav";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { GitHubLink } from "./github_link";
import { ModeSwitcher } from "./ModeSwitcher";

const SiteHeader = () => {
    const pageTree = null;

    return (
        <header className="bg-background sticky top-0 z-50 w-full">
            <div className="container-wrapper 3xl:fixed:px-0 px-6">
                <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
                    <MobileNav
                        tree={pageTree}
                        items={siteConfig.navItems}
                        className="flex lg:hidden"
                    />
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="hidden size-8 lg:flex"
                    >
                        <Link href="/">
                            <Icons.logo className="size-5" />
                            <span className="sr-only">{siteConfig.name}</span>
                        </Link>
                    </Button>
                    <MainNav
                        items={siteConfig.navItems}
                        className="hidden lg:flex"
                    />
                    <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                        <GitHubLink />
                        <Separator
                            orientation="vertical"
                            className="3xl:flex hidden"
                        />
                        <ModeSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;
