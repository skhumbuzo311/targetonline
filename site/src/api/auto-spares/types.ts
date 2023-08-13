export type AutoSpare = {
    id: number;
    name: string;
    number: string;
    make: string;
    yearModel: string;
    price: number,
    createdAt: Date;
    isPremium: boolean;
    imagesUrls: string[];

    likes: Like[];
}

export type Like = {
    id: number;
    autoSpareId: number;
    createdByUserId: number;
    isCreatedByUserAdmin: boolean;
    createdByUserFirstName: string;
}