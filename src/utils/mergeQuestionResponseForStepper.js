const mergeQuestionResponseForStepper = (questions, responses) => {
  
  responses = responses.flatMap(res => (res.response))

  return questions.map(question => {
    const res = responses
                .filter((response) => response.questionid === question._id)
                .flatMap(r => r.options)
                .reduce((accumulator, currentValue) => {
                  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
                  return accumulator;
                }, {});
    
    const options = question.options
      .map((x, i) => {
        const str = x.option;
        x = {};
        x.option = str;
        x.count = res[i] || 0;
        return x;
      })
    return {
      _id: question._id,
      question: question.question,
      options
    }
  });
}

export default mergeQuestionResponseForStepper;