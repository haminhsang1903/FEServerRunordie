import {Class} from "./class.model";

export class Subjects{
    public id_subjects: string;
    public name: string;
    public credit: number;
    public session: number;
    public notes: string;
    id_class: Class[];
}