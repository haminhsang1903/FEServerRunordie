import {Schedules} from "./schedules.model";
import {Students} from "./students.model";

export class Attends {
    public id_attends: number;
    public status: boolean;
    public notes: string;
    id_schedules: Schedules[];
    id_students: Students[];
}