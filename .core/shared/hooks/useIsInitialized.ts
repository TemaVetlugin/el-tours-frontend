import { useState } from "react";
import { useReaction } from "shared/hooks/useReaction";
import { BootstrapModule } from "shared/modules";

export function useIsInitialized() {
    const [isInitialized, setValue] = useState(BootstrapModule.isInitialized)

    useReaction((value) => setValue(value), () => BootstrapModule.isInitialized);

    return isInitialized;
};
