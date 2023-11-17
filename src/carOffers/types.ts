export interface Equipment {
    id: number;
    name: string;
}

export interface CarOffer {
    id: number;
    title: string;
    description: string | null;
    priceInCents: number;
    manufacturer: string;
    model: string;
    year: number;
    mileageInKm: number;
    fuelType: string;
    gearboxType: string;
    carType: string;
    color: string;
    numberOfDoors: number;
    numberOfSeats: number;
    taxHorsePower: number;
    horsePower: number;
    equipments: string | null;
    creationDateUnix: number;
    authorId: number;
    sold: boolean;
}
