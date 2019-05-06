import { Option } from './Option';

export class Question {
    id: number;
    description: string;
    answers: [];
    radio: boolean;
    number: number;
    active: boolean;
    options: Option[];
}
