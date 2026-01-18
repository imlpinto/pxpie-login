import { getOrganizationBySlug } from "@/server/organizations";

type Params = Promise<{slug: string}>;

export default async function OrganizationPage ({ params }: { params: Params }) {
    const { slug } = await params;
    
    const organization = await getOrganizationBySlug(slug);

    return <div>{organization?.name}</div>;

}