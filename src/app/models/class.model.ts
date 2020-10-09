import { Semester } from "./semester.model";
import { Subjects } from "./subjects.model";

export class Class{
    public id_class: string;
    public name: string;
    public status: boolean;
    id_subjects: Subjects[];
    id_semester: Semester[];
}