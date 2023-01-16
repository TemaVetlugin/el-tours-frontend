import { MenuItemType } from "shared/types";
import { MENU } from "shared/contants";
import { CatalogCategoryModel } from "shared/models";
import { useEffect, useState } from "react";
import { useReaction } from "shared/hooks/useReaction";
import { CatalogModule } from "shared/modules";

export const useCatalogBreadcrumbs = (catalogCategoryId?: number | null): MenuItemType[] => {
    const [catalogCategories, setCatalogCategories] = useState(CatalogModule.catalogCategories);
    const [breadcrumbs, setBreadcrumbs] = useState([MENU.CATALOG()]);

    useReaction(
        () => setCatalogCategories(CatalogModule.catalogCategories),
        () => CatalogModule.catalogCategories
    );

    useEffect(() => {
        if (!catalogCategoryId) {
            setBreadcrumbs([MENU.CATALOG()]);
            return;
        }
        let catalogCategory = catalogCategories.find(catalogCategory => catalogCategory.id === catalogCategoryId);
        if (!catalogCategory) {
            return;
        }

        const result: MenuItemType[] = [
            MENU.CATALOG(catalogCategory.name, catalogCategory.slug)
        ];
        while (catalogCategory && catalogCategory.catalogCategoryId) {
            catalogCategory = catalogCategories.find(item => {
                return item.id === catalogCategory?.catalogCategoryId
            });
            if (catalogCategory) {
                result.unshift(MENU.CATALOG(catalogCategory.name, catalogCategory.slug))
            }
        }
        result.unshift(MENU.CATALOG());
        setBreadcrumbs(result);
    }, [catalogCategoryId, catalogCategories]);

    return breadcrumbs;
}
