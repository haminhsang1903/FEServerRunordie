import {Students} from "./students.model";
import {Semester} from "./semester.model";

export class Record {
    public id_record: number;
    public date: Date;
    public content: string;
    public type: number;
    public notes: string;
    id_student: Students[];
    id_semester: Semester[];
}