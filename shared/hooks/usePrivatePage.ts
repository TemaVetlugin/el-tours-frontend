import { useEffect, useState } from "react";
import { LayoutService } from "shared/services";
import { useUser } from "./useUser";
import { useRouter } from "./useRouter";

export function usePrivatePage(redirectUrl = '/') {
    const [isGranted, setIsGranted] = useState(false);
    const user = useUser();
    const router = useRouter();
    useEffect(() => {
        if (!user.isInitialized) {
            return;
        }
        if (!user.isAuthorized) {
            router.push(redirectUrl);
            LayoutService.set("loginIsOpened", true);
            return;
        }
        setIsGranted(true);
    }, [redirectUrl, user, router]);

    return isGranted;
}
