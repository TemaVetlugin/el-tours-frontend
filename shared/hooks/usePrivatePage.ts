import { useEffect, useState } from "react";
import { LayoutService } from "shared/services";
import { useNavigate } from "./useNavigate";
import { useUser } from "./useUser";
import { ROUTES } from "shared/contants";

export function usePrivatePage() {
    const [isGranted, setIsGranted] = useState(false);
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.isInitialized) {
            return;
        }
        if (!user.isAuthorized) {
            navigate(ROUTES.HOME().url);
            LayoutService.set("loginIsOpened", true);
            return;
        }
        setIsGranted(true);
    }, [user, navigate]);

    return isGranted;
}
