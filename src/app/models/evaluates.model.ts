import {Lecturers} from "./lecturers.model";
import {Students} from "./students.model";
import {Schedules} from "./schedules.model";

export class Evaluates {
    public id_vuluates: string;
    public punctual: number;
    public quality: number;
    public reply: number;
    public date: number;
    public notes: string;
    id_lecturers: Lecturers[];
    id_students: Students[];
    id_schedules: Schedules[];
}