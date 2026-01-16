import { getOrganizations } from "@/server/organizations";
import { ModeSwitcher } from "./mode-switcher";
import { OrganizationSwitcher } from "./organization-switcher";

export async function Header() {
    const organizations = await getOrganizations();

    return (
        <header className="absolute top-0 right-0 flex justify-between items-center p-4 w-full">
            <OrganizationSwitcher organizations={organizations} />
            <ModeSwitcher />
        </header>
    );
}