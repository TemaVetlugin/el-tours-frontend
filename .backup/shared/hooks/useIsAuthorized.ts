import { useState } from "react";
import { useReaction } from "shared/hooks/useReaction";
import { UserModule } from "shared/modules";

export function useIsAuthorized() {
    const [isAuthorized, setIsAuthorized] = useState(UserModule.isAuthorized)

    useReaction((value) => setIsAuthorized(value), () => UserModule.isAuthorized);

    return isAuthorized;
};
