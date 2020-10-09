import {Class} from "./class.model";
import {Major} from "./major.model";
import {NominalClass} from "./nomialclass.model";

export class Students {
    public id_students: string;
    public name: string;
    public birthday: Date;
    public gender: boolean;
    public email: string;
    public address: string;
    public identity_card: string;
    public avt: string;
    public status: string;
    id_class: Class[];
    id_major: Major[];
    id_nominalclass: NominalClass[];
}