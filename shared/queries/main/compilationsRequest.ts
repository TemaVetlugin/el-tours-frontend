import { request } from "shared/utilities";
import { ICompilationModel } from "shared/models";

type ResponseType = {
    items: ICompilationModel[]
}

export const compilationsRequest = async () => {
    return await request.get<ResponseType>({
        endpoint: '/compilations',
    });
}
