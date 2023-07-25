import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";

import { CatalogCategoryModel, CatalogCategoryModelInterface } from "./CatalogCategory.model";
import { CatalogProductOfferModel, CatalogProductOfferModelInterface } from "./CatalogProductOffer.model";
import { BrandModel, BrandModelInterface } from "./Brand.model";
import { ManufacturerModel, ManufacturerModelInterface } from "./Manufacturer.model";
import { SubstanceModel, SubstanceModelInterface } from "./Substance.model";
import { CountryModel, CountryModelInterface } from "./Country.model";
import { Model } from "./Model";

export interface CatalogProductModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    image?: string;
    catalogCategoryId?: number;
    catalogCategory?: CatalogCategoryModelInterface | null;
    catalogProductOffers?: CatalogProductOfferModelInterface[];
    substances?: SubstanceModelInterface[];
    brand?: BrandModelInterface | null,
    country?: CountryModelInterface | null,
    manufacturer?: ManufacturerModelInterface | null,
    images?: string[],
    barcodes?: string[],
    thermolabile?: string,
    instructionFull?: string,
    description?: string,
    dosage?: string,
    packageAmount?: string,
    instructionSpecial?: string,
    indications?: string,
    contraindications?: string,
    composition?: string,
    applicationMode?: string,
    expirationTime?: string,
    dispensingConditions?: string,
    storageConditions?: string,
    releaseForm?: string,
    size?: string,
    sideEffects?: string,
    withPrescription?: boolean,
    analogues?: CatalogProductModelInterface[]
    recommendations?: CatalogProductModelInterface[]
}

export class CatalogProductModel extends Model<CatalogProductModelInterface> implements CatalogProductModelInterface {
    fillable: Array<keyof CatalogProductModelInterface> = [
        "id",
        "name",
        "slug",
        "image",
        "catalogCategoryId",
        "catalogProductOffers",
        "brand",
        "country",
        "substances",
        "manufacturer",
        "images",
        "barcodes",
        "dosage",
        "packageAmount",
        "thermolabile",
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
        "size",
        "sideEffects",
        "withPrescription",
        "analogues",
        "recommendations"
    ];

    casts = {
        catalogCategory: new ModelCast(CatalogCategoryModel),
        brand: new ModelCast(BrandModel),
        country: new ModelCast(CountryModel),
        manufacturer: new ModelCast(ManufacturerModel),
        catalogProductOffers: new ModelArrayCast(CatalogProductOfferModel),
        substances: new ModelArrayCast(SubstanceModel),
        analogues: new ModelArrayCast(CatalogProductModel),
        recommendations: new ModelArrayCast(CatalogProductModel),
    };

    id = 0;
    name = '';
    slug = '';
    image = '';
    catalogCategoryId = 0;
    images = [];
    barcodes = [];
    thermolabile = '';
    withPrescription = true;
    instructionFull = '';
    description = '';
    dosage = '';
    packageAmount = '';
    instructionSpecial = '';
    indications = '';
    contraindications = '';
    composition = '';
    applicationMode = '';
    expirationTime = '';
    dispensingConditions = '';
    storageConditions = '';
    releaseForm = '';
    size = '';
    sideEffects = '';
    substances: SubstanceModel[] = [];
    catalogCategory: CatalogCategoryModel | null = null;
    brand: BrandModel | null = null;
    country: CountryModel | null = null;
    manufacturer: ManufacturerModel | null = null;
    catalogProductOffers: CatalogProductOfferModel[] = [];
    analogues: CatalogProductModel[] = []
    recommendations: CatalogProductModel[] = []

    constructor(payload?: CatalogProductModelInterface) {
        super();

        makeObservable(this, {
            id: observable,
            name: observable,
            slug: observable,
            image: observable,
            catalogCategoryId: observable,
            catalogCategory: observable,
            catalogProductOffers: observable,
            substances: observable,
            brand: observable,
            country: observable,
            manufacturer: observable,
            images: observable,
            dosage: observable,
            size: observable,
            packageAmount: observable,
            barcodes: observable,
            thermolabile: observable,
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
            price: computed,
            priceOffer: computed,
            isDeliverable: computed,
        });

        this.update(payload);
    }

    get price() {
        return this.catalogProductOffers.map(offer => offer.price);
    }

    get priceOffer() {
        return this.catalogProductOffers.map(offer => offer.priceOffer);
    }

    get isAvailable() {
        if (this.catalogProductOffers.every(catalogProductOffer => +catalogProductOffer.quantity <= 0)) {
            return false;
        }
        return true;
    }

    get isDeliverable() {
        return this.catalogProductOffers.some(catalogProductOffer => catalogProductOffer.isDeliverable);
    }
}
