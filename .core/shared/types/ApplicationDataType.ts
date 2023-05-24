import { ReturnType } from "shared/types/ReturnType";
import { bootstrapApplicationRequest } from "shared/requests/api";

export type ApplicationDataType = NonNullable<ReturnType<typeof bootstrapApplicationRequest>['data']>;
