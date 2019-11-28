
export class ResponseModel<T = any> {
    result: T;
    error?: ErrorModel;

    public get success(): boolean {
        return !this.error;
    }

}

export interface PagingModel {
    page?: number;
    size?: number;
    where?: any;
    order?: any[];
    total?: number;
}

export interface PagedListModel<T> {
    data: T[];
    paging?: PagingModel;
}

export interface ErrorModel {
    key: string;
    value: any;
}

export interface ErrorsModel {
    [key: string]: string[];
}
