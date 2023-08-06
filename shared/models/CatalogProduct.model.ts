import { computed, makeObservable, observable } from "mobx";

import { ModelArrayCast, ModelCast } from "shared/casts";
import { BrandModel, BrandModelInterface } from "./Brand.model";

import { CatalogCategoryModel, CatalogCategoryModelInterface } from "./CatalogCategory.model";
import { CatalogProductOfferModel, CatalogProductOfferModelInterface } from "./CatalogProductOffer.model";
import { CountryModel, CountryModelInterface } from "./Country.model";
import { ManufacturerModel, ManufacturerModelInterface } from "./Manufacturer.model";
import { Model } from "./Model";
import { SubstanceModel, SubstanceModelInterface } from "./Substance.model";

type CatalogProductBadge = {
    label: string,
    icon: string,
    color: string
}

export interface CatalogProductModelInterface {
    id?: number;
    name?: string;
    slug?: string;
    image?: string;
    newAt?: string;
    promoActionsCount?: number;
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
    instruction?: string,
    description?: string,
    dosage?: string,
    packageAmount?: string,
    specialInstructions?: string,
    indications?: string,
    contraindications?: string,
    composition?: string,
    applicationMode?: string,
    expirationTime?: string,
    dispensingConditions?: string,
    storageConditions?: string,
    applicationType?: string,
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
        "instruction",
        "description",
        "specialInstructions",
        "applicationType",
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
        "recommendations",
        "newAt",
        "promoActionsCount"
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
    newAt = '';
    promoActionsCount = 0;
    catalogCategoryId = 0;
    images = [];
    barcodes = [];
    thermolabile = '';
    withPrescription = true;
    instruction = '';
    description = '';
    dosage = '';
    packageAmount = '';
    specialInstructions = '';
    applicationType = '';
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
            newAt: observable,
            promoActionsCount: observable,
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
            instruction: observable,
            applicationType: observable,
            description: observable,
            specialInstructions: observable,
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
            badges: computed,
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

    get badges(): CatalogProductBadge[] {
        const badges: CatalogProductBadge[] = [];
        if (this.isDeliverable) {
            badges.push({
                label: 'Доставим на дом',
                icon: 'deliveryCourier',
                color: '#00A3B3'
            })
        }
        if (this.promoActionsCount > 0 && this.price.length > 0 && this.priceOffer.length > 0) {
            if (Math.min(...this.price) < Math.min(...this.priceOffer) || Math.max(...this.price) < Math.max(...this.priceOffer)) {
                badges.push({
                    label: 'Выгодно',
                    icon: 'wallet',
                    color: '#EF7F1A'
                })
            }
        }

        if (this.promoActionsCount > 0) {
            badges.push({
                label: 'Акция',
                icon: 'percent',
                color: '#B0CB1F'
            })
        }

        if (this.withPrescription) {
            badges.push({
                label: 'Требуется рецепт',
                icon: 'exclamationMark',
                color: '#E21F25'
            })
        }

        return badges;
    }
}
