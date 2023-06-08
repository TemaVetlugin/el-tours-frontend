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
    imageThumbnail?: string;
    catalogCategoryId?: number;
    catalogCategory?: CatalogCategoryModelInterface | null;
    catalogProductOffers?: CatalogProductOfferModelInterface[];
    substances?: SubstanceModelInterface[];
    brand?: BrandModelInterface | null,
    manufacturer?: ManufacturerModelInterface | null,
    imagesThumbnails?: string[],
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
    withDelivery?: boolean,
    withPrescription?: boolean,
    analogues?: CatalogProductModelInterface[]
    recommendations?: CatalogProductModelInterface[]
}

export class CatalogProductModel extends Model<CatalogProductModelInterface> implements CatalogProductModelInterface {
    fillable: Array<keyof CatalogProductModelInterface> = [
        "id",
        "name",
        "slug",
        "imageThumbnail",
        "catalogCategoryId",
        "catalogProductOffers",
        "brand",
        "substances",
        "manufacturer",
        "imagesThumbnails",
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
        "withDelivery",
        "withPrescription",
        "analogues",
        "recommendations"
    ];

    casts = {
        catalogCategory: new ModelCast(CatalogCategoryModel),
        brand: new ModelCast(BrandModel),
        manufacturer: new ModelCast(ManufacturerModel),
        catalogProductOffers: new ModelArrayCast(CatalogProductOfferModel),
        substances: new ModelArrayCast(SubstanceModel),
        analogues: new ModelArrayCast(CatalogProductModel),
        recommendations: new ModelArrayCast(CatalogProductModel),
    };

    id = 0;
    name = '';
    slug = '';
    imageThumbnail = '';
    catalogCategoryId = 0;
    catalogProductOffers: CatalogProductOfferModel[] = [];
    substances: SubstanceModel[] = [];
    catalogCategory: CatalogCategoryModel | null = null;
    brand: BrandModel | null = null;
    manufacturer: ManufacturerModel | null = null;
    imagesThumbnails = [];
    barcodes = [];
    isThermolabile = false;
    withDelivery = false;
    withPrescription = true;
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
    analogues: CatalogProductModel[] = []
    recommendations: CatalogProductModel[] = []

    constructor(payload?: CatalogProductModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            imageThumbnail: observable,
            catalogCategoryId: observable,
            catalogCategory: observable,
            catalogProductOffers: observable,
            substances: observable,
            brand: observable,
            manufacturer: observable,
            imagesThumbnails: observable,
            barcodes: observable,
            isThermolabile: observable,
            withDelivery: observable,
            withPrescription: observable,
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
            analogues: observable,
            recommendations: observable,
            isAvailable: computed,
            prices: computed,
        });

        this.update(payload);
    }

    get prices() {
        return this.catalogProductOffers.map(offer => offer.price);
    }

    get isAvailable() {
        if (this.catalogProductOffers.every(catalogProductOffer => +catalogProductOffer.quantity <= 0)) {
            return false;
        }
        return true;
    }
}
