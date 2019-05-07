import { Option } from './Option';

export class Question {
    id: number;
    description: string;
    answer_id: number;
    remark: string;
    number: number;
    active: boolean;
    options: Option[];
}
