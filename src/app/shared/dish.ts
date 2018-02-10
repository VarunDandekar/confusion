import { Comments } from './comments';

export class Dish {
    id: number;
    featured:boolean;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    description: string;
    comments: Comments[];
}