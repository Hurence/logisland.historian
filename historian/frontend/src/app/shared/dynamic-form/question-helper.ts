import { QuestionBase, IQuestionBase } from "./question-base";

export class Questions {

    public static modifyQuestions(
        questions: QuestionBase<any>[],
        mododifications: Map<string, IQuestionBase<any>>
    ): void {
        questions.forEach(q => {
            if (mododifications.has(q.key)) {
                Object.assign(q, mododifications.get(q.key));
            }
        })
    }
}