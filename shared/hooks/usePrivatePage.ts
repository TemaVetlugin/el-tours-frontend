import { useEffect, useState } from "react";
import { LayoutService } from "shared/services";
import { useNavigate } from "./useNavigate";
import { useUser } from "./useUser";

export function usePrivatePage(redirectUrl = '/') {
    const [isGranted, setIsGranted] = useState(false);
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.isInitialized) {
            return;
        }
        if (!user.isAuthorized) {
            navigate(redirectUrl);
            LayoutService.set("loginIsOpened", true);
            return;
        }
        setIsGranted(true);
    }, [user, navigate]);

    return isGranted;
}
