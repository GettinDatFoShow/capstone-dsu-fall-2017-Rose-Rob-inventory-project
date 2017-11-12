import { ItemDetail } from './ItemDetail';
import { ItemHistory } from './ItemHistory';
import { ItemImage } from './ItemImage';
import { Room } from "./room";

export class Item {
    id: string;
    specialCode: string;
    description: string;
    color: string;
    type: string;
    addedToRoom: string;
    created: string;
    lastUpdated: string;
    active: boolean;
    cost: number;
    location: string;
    isPaid: boolean;
    constructor(){}
}
