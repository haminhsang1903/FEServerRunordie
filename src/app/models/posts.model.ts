import {Categorys} from "./categorys.model";

export class Posts {
    public id_post: string;
    public title: string;
    public description: string;
    public id_categorys: Categorys;
}
