import { MenuItemType } from "shared/types";
import { BREADCRUMBS } from "shared/contants";
import { CatalogCategoryModel } from "shared/models";
import { useEffect, useState } from "react";
import { useReaction } from "shared/hooks/useReaction";
import { CatalogModule } from "shared/modules";

export const useCatalogBreadcrumbs = (catalogCategoryId?: number | null): MenuItemType[] => {
    const [catalogCategories, setCatalogCategories] = useState(CatalogModule.catalogCategories);
    const [breadcrumbs, setBreadcrumbs] = useState([BREADCRUMBS.CATALOG()]);

    useReaction(
        () => setCatalogCategories(CatalogModule.catalogCategories),
        () => CatalogModule.catalogCategories
    );

    useEffect(() => {
        if (!catalogCategoryId) {
            setBreadcrumbs([BREADCRUMBS.CATALOG()]);
            return;
        }
        let catalogCategory = catalogCategories.find(catalogCategory => catalogCategory.id === catalogCategoryId);
        if (!catalogCategory) {
            return;
        }

        const result: MenuItemType[] = [
            BREADCRUMBS.CATALOG(catalogCategory.name, catalogCategory.slug)
        ];
        while (catalogCategory && catalogCategory.catalogCategoryId) {
            catalogCategory = catalogCategories.find(item => {
                return item.id === catalogCategory?.catalogCategoryId
            });
            if (catalogCategory) {
                result.unshift(BREADCRUMBS.CATALOG(catalogCategory.name, catalogCategory.slug))
            }
        }
        result.unshift(BREADCRUMBS.CATALOG());
        setBreadcrumbs(result);
    }, [catalogCategoryId, catalogCategories]);

    return breadcrumbs;
}
