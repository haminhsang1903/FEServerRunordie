import {Class} from "./class.model";
import {Skoftes} from "./skoftes.model";
import {Subjects} from "./subjects.model";
import {Lecturers} from "./lecturers.model";

export class Schedules{
	public id_schedules: string;
	public date: Date;
	public description: string;
	public notes: string;
	id_lecturers: Lecturers[];
	id_skoftes: Skoftes[];
	id_class: Class[];
	id_subject: Subjects[];
}