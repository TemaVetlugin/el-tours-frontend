import { request } from "shared/utilities";
import {
    IArticleModel,
    ICatalogCategoryModel,
    ICatalogProductModel, ICompilationModel,
    IHomeBannerModel,
    IHomeWhyTrustModel,
    IFeedbackModel
} from "shared/models";

type ResponseType = {
    homeBanners: IHomeBannerModel[],
    hotCatalogProducts: ICatalogProductModel[],
    feedbacks: IFeedbackModel[],
    articles: IArticleModel[],
    homeWhyTrusts: IHomeWhyTrustModel[],
    catalogCategories: ICatalogCategoryModel[],
    compilations: ICompilationModel[],
}

export const homeRequest = async () => {
    return await request.get<ResponseType>({
        prefix: '/frontend/v1',
        endpoint: '/home'
    });
}
