import { CreateOrganizationForm } from "@/components/forms/create-organization-form";
import { Logout } from "@/components/logout";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default async function Dashboard() {
    return (
        <>
        <header className="absloute top-0 right-0 flex justify-end items-center p-4">
            <ModeSwitcher />
        </header>
        <div className= "flex flex-col gap-2 items-center justify-center h-screen">
            <Logout />

            <Dialog>
                <DialogTrigger asChild>
                <Button variant="outline">Create Organization</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization to get started.
                    </DialogDescription>
                    </DialogHeader>
                    <CreateOrganizationForm />
                </DialogContent>
            </Dialog>
        </div>
        </>
    );
}