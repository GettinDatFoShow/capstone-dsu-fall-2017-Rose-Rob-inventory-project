import { ItemDetail } from './itemDetail';
import { ItemHistory } from './ItemHistory';

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
    itemPicture: ByteString;
}