export interface ResourceTable {
    id: number;
    title?: string;
    description?: string;
    category?: string;
    keywords?: string[];
    domain?: string;
    url?: string; 
    tfa?: string[];
}

export type DiscountTagTable = {
    id: number;
    inserted_at: string;
    tag: string;
}