import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/utils";
import { useSession } from "next-auth/react";

export const NavbarAvatar = () => {
    const { data: session } = useSession();
    console.log(session);

    const userInitial = session?.user?.name
        ? getFirstLetter(session.user.name.toLocaleUpperCase())
        : "U";

    return (
        <Avatar>
            <AvatarImage
                className="capitalize"
                src={session?.user.image ?? "https://github.com/shadcn.png"}
                alt={session?.user?.name ?? "User avatar"}
                referrerPolicy="no-referrer"
            />
            <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
    );
};
