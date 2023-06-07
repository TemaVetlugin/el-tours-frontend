import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { CatalogCategoryModel, CatalogCategoryModelInterface } from "./CatalogCategory.model";
import { CatalogProductOfferModel, CatalogProductOfferModelInterface } from "./CatalogProductOffer.model";
import { BrandModel, BrandModelInterface } from "./Brand.model";
import { ManufacturerModel, ManufacturerModelInterface } from "./Manufacturer.model";
import { SubstanceModel, SubstanceModelInterface } from "./Substance.model";
import { Model } from "./Model";

export interface CatalogProductModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    previewImageThumbnail?: string;
    catalogCategoryId?: number;
    catalogCategory?: CatalogCategoryModelInterface | null;
    catalogProductOffers?: CatalogProductOfferModelInterface[];
    substances?: SubstanceModelInterface[];
    brand?: BrandModelInterface | null,
    manufacturer?: ManufacturerModelInterface | null,
    prescriptionTypeId?: string,
    detailImagesThumbnails?: string[],
    barcodes?: string[],
    isThermolabile?: boolean,
    instructionFull?: string,
    description?: string,
    instructionSpecial?: string,
    indications?: string,
    contraindications?: string,
    composition?: string,
    applicationMode?: string,
    expirationTime?: string,
    dispensingConditions?: string,
    storageConditions?: string,
    releaseForm?: string,
    sideEffects?: string,
}

export class CatalogProductModel extends Model<CatalogProductModelInterface> implements CatalogProductModelInterface {
    fillable: Array<keyof CatalogProductModelInterface> = [
        "id",
        "name",
        "slug",
        "previewImageThumbnail",
        "catalogCategoryId",
        "catalogProductOffers",
        "brand",
        "substances",
        "manufacturer",
        "detailImagesThumbnails",
        "barcodes",
        "isThermolabile",
        "instructionFull",
        "description",
        "instructionSpecial",
        "indications",
        "contraindications",
        "composition",
        "applicationMode",
        "expirationTime",
        "dispensingConditions",
        "storageConditions",
        "releaseForm",
        "sideEffects",
    ];

    casts = {
        catalogCategory: new ModelCast(CatalogCategoryModel),
        brand: new ModelCast(BrandModel),
        manufacturer: new ModelCast(ManufacturerModel),
        catalogProductOffers: new ModelArrayCast(CatalogProductOfferModel),
        substances: new ModelArrayCast(SubstanceModel),
    };

    id = 0;
    name = '';
    slug = '';
    previewImageThumbnail = '';
    catalogCategoryId = 0;
    catalogProductOffers: CatalogProductOfferModel[] = [];
    substances: SubstanceModel[] = [];
    catalogCategory: CatalogCategoryModel | null = null;
    brand: BrandModel | null = null;
    manufacturer: ManufacturerModel | null = null;
    detailImagesThumbnails = [];
    barcodes = [];
    isThermolabile = false;
    instructionFull = '';
    description = '';
    instructionSpecial = '';
    indications = '';
    contraindications = '';
    composition = '';
    applicationMode = '';
    expirationTime = '';
    dispensingConditions = '';
    storageConditions = '';
    releaseForm = '';
    sideEffects = '';

    constructor(payload?: CatalogProductModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImageThumbnail: observable,
            catalogCategoryId: observable,
            catalogCategory: observable,
            catalogProductOffers: observable,
            substances: observable,
            brand: observable,
            manufacturer: observable,
            detailImagesThumbnails: observable,
            barcodes: observable,
            isThermolabile: observable,
            instructionFull: observable,
            description: observable,
            instructionSpecial: observable,
            indications: observable,
            contraindications: observable,
            composition: observable,
            applicationMode: observable,
            expirationTime: observable,
            dispensingConditions: observable,
            storageConditions: observable,
            releaseForm: observable,
            sideEffects: observable,
            priceFrom: computed,
            isAvailable: computed,
        });

        this.update(payload);
    }

    get priceFrom() {
        if (this.catalogProductOffers.length === 0) {
            return null;
        }
        return Math.min(...this.catalogProductOffers.map(offer => offer.price));
    }

    get isAvailable() {
        if (!this.priceFrom) {
            return false;
        }
        if (this.catalogProductOffers.every(catalogProductOffer => +catalogProductOffer.quantity <= 0)) {
            return false;
        }
        return true;
    }
}
