import { QuestionBase, IQuestionBase } from './question-base';

export class Questions {

  /**
   *
   * @param questions to modify
   * @param mododifications modifications for each question (property key is used)
   */
    public static modifyQuestions(
        questions: QuestionBase<any>[],
        mododifications: Map<string, IQuestionBase<any>>
    ): void {
        questions.forEach(q => {
            if (mododifications.has(q.key)) {
                Object.assign(q, mododifications.get(q.key));
            }
        });
    }
}
