import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { ICatalogCategoryModel, CatalogCategoryModel } from "./CatalogCategoryModel";
import { ICatalogProductOfferModel, CatalogProductOfferModel } from "./CatalogProductOfferModel";
import { BrandModel, IBrandModel } from "./BrandModel";
import { IManufacturerModel, ManufacturerModel } from "./ManufacturerModel";
import { ISubstanceModel, SubstanceModel } from "./SubstanceModel";
import { BadgeModel, IBadgeModel } from "./BadgeModel";
import { Model } from "./Model";
import { CatalogProductPrescriptionTypeEnum } from "shared/enums";

export interface ICatalogProductModel {
    id?: number;
    name?: string;
    slug?: string;
    previewImageThumbnail?: string;
    catalogCategoryId?: number;
    catalogCategory?: ICatalogCategoryModel | null;
    catalogProductOffers?: ICatalogProductOfferModel[];
    badges?: IBadgeModel[];
    substances?: ISubstanceModel[];
    brand?: IBrandModel | null,
    manufacturer?: IManufacturerModel | null,
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

export class CatalogProductModel extends Model<ICatalogProductModel> implements ICatalogProductModel {
    fillable: Array<keyof ICatalogProductModel> = [
        "id",
        "name",
        "slug",
        "previewImageThumbnail",
        "catalogCategoryId",
        "catalogProductOffers",
        "brand",
        "badges",
        "substances",
        "manufacturer",
        "prescriptionTypeId",
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
        badges: new ModelArrayCast(BadgeModel),
        substances: new ModelArrayCast(SubstanceModel),
    };

    id = 0;
    name = '';
    slug = '';
    previewImageThumbnail = '';
    catalogCategoryId = 0;
    catalogProductOffers: CatalogProductOfferModel[] = [];
    badges: BadgeModel[] = [];
    substances: SubstanceModel[] = [];
    catalogCategory: CatalogCategoryModel | null = null;
    brand: BrandModel | null = null;
    manufacturer: ManufacturerModel | null = null;
    prescriptionTypeId = '';
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

    constructor(payload?: ICatalogProductModel) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            previewImageThumbnail: observable,
            catalogCategoryId: observable,
            catalogCategory: observable,
            catalogProductOffers: observable,
            badges: observable,
            substances: observable,
            brand: observable,
            manufacturer: observable,
            prescriptionTypeId: observable,
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
            prescriptionType: computed,
        });

        this.update(payload);
    }

    get priceFrom() {
        if (this.catalogProductOffers.length === 0) {
            return null;
        }
        return Math.min(...this.catalogProductOffers.map(offer => offer.price));
    }

    get prescriptionType() {
        return CatalogProductPrescriptionTypeEnum.from(this.prescriptionTypeId);
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
