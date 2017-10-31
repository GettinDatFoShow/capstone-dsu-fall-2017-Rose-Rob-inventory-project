import { ItemDetail } from './ItemDetail';
import { ItemHistory } from './ItemHistory';
import { ItemImage } from './ItemImage';

export class Item {
    id: string;
    description: string;
    specialCode: string;
    type: string;
    color: string;
    room: any;
    details: ItemDetail[];
    histories: ItemHistory[];
    addedToRoom: Date;
    created: Date;
    active: boolean;
    cost: number;
    isPaid: boolean;
    images: ItemImage[];
}