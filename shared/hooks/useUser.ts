import { useState } from "react";
import { UserService } from "shared/services";
import { useReaction } from "./useReaction";

export function useUser() {
    const [user, setUser] = useState(UserService.user)

    useReaction((value) => setUser(value), () => UserService.user);

    return user;
};
