import {Points} from "./points.model";
import {Class} from "./class.model";
import {Students} from "./students.model";

export class Results {
    public id_results: number;
    public name: string;
    public score: number;
    public notes: string;
    id_points: Points[];
    id_class: Class[];
    id_student: Students[];
}