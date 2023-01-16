import { action, makeObservable, observable, runInAction } from "mobx";
import { bootstrapClientRequest } from "shared/requests/api";
import { ApplicationDataType } from "shared/types";

import { ApplicationModule } from "./ApplicationModule";
import { OrderModule } from "./OrderModule";
import { UserModule } from "./UserModule";
import { CatalogModule } from "shared/modules/CatalogModule";

export const BootstrapModule = new class {
    isInitialized = false;

    constructor() {
        makeObservable(this, {
            isInitialized: observable,
            client: action,
            application: action
        });
    }

    client = async () => {
        const accessToken = await UserModule.getAccessToken();
        const { data, isSuccess } = await bootstrapClientRequest({ accessToken });
        if (isSuccess && data) {
            UserModule.mount(data.accessToken, data.user);
            OrderModule.mount(data.cartItems);
            CatalogModule.mount({
                catalogCategories: data.catalogCategories,
                favorite: data.favorite
            });
        }
        runInAction(() => {
            this.isInitialized = true;
        });
    }

    private applicationIsMounted = false;
    application = (data: ApplicationDataType) => {
        if (this.applicationIsMounted) {
            return;
        }
        if (typeof window !== 'undefined') {
            this.applicationIsMounted = true;
        }
        ApplicationModule.mount(data);
    }
}
