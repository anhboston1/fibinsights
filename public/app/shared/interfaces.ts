import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}
export interface IUserLogin {
    email: string;
    password: string;
}
export interface ICashBuyer {
    _id?: string;
    name: string;
    phone: string;
    buyingin: string;
    buyingcriteria: string;
    cashavailable: string;
}
export interface IPrivateLender {
    _id?: string;
    name: string;
    phone: string;
    fundsavailable: string;
    interestrate: string;
    lendingin: string;
}
export interface IDeal {
    _id?: string;
    ownerId: string;
    propertyName: string;
    propertyDescription: string;
    propertyAddress: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    companyId?:number;
    flipAnalysisId?: number;
    holdAndRentAnalysisId?: number;
    rehabDetailId?: number;
    purchasePrice?: number;
    closingCost?: number;
    holdingCost?: number;
    rehabBudget?: number;
}
export interface IFlipAnalysisId {
    ARV: string;
    monthToComplete: number;
    totalCapNeeded: number;
    cashRequired?: number;
    totalAllCostAtTheEnd?: number;
    percentOfARV?: number;
    projectedResalePrice?: number;
    projectedResalePriceCost?: number;
    ROI_on_cash_invested?: number;
    ROI_on_cash_annualized?: number;
}
export interface IHoldAndRentAnalysisId {
    ARV: string;
    monthToComplete: number;
    totalCapNeeded: number;
    cashRequired?: number;
    totalAllCostAtTheEnd?: number;
    percentOfARV?: number;
    projectedOperatingIncome?: number;
    projectedOperatingExpense?: number;
    netMonthlyOperatingIncome?: number;
    ROI_on_cash_annualized?: number;
}