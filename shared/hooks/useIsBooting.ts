import { useState } from "react";
import { UserService } from "shared/services";
import { useReaction } from "./useReaction";

export function useIsBooting() {
    const [isBooting, setIsBooting] = useState(UserService.isBooting)

    useReaction((value) => setIsBooting(value), () => UserService.isBooting);

    return isBooting;
};
