import React from "react";
import ContentContainer from "../../HOC/ContentContainer/ContentContainer";
import useQuizService from "../../hooks/useQuizService";
import { getId } from "../../shared/utils/uuid";
import EditQuestion from "./EditQuestion/EditQuestion";
import classes from "./EditQuiz.module.scss";

const initialState = [];

const changeQuestionAction = (state, action) => {
    const index = state.findIndex((q) => q.id === action.id);
    const newState = [...state];
    newState[index] = action.question;
    return newState;
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_QUESTIONS":
            return action.questions;
        case "CHANGE_QUESTION":
            return changeQuestionAction(state, action);
        case "DELETE_QUESTION":
            return state.filter((q) => q.id !== action.id);
        case 'ADD_QUESTION':
            return [...state, action.question]
        default:
            return state;
    }
};

function EditQuiz() {
    const { loadQuestions, editQuestion, deleteQuestion, addQuestion } = useQuizService();
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        loadQuestions((data) => {
            dispatch({
                type: "LOAD_QUESTIONS",
                questions: data,
            });
        });
    }, []);

    const editQuestionHandler = React.useCallback(async (question, id) => {
        const newQuestion = { ...question };
        delete newQuestion.id;
        newQuestion.options = newQuestion.options.map((option) => {
            const newOption = { ...option };
            delete newOption.id;
            return newOption;
        });
        const responseQuestion = await editQuestion(newQuestion, id);
        dispatch({
            type: "CHANGE_QUESTION",
            id: id,
            question: responseQuestion,
        });
    }, []);

    const addEmptyQuestionHandler = React.useCallback(() => {
      const newQuestion = {
        id: getId(),
        index: "",
        content: "Salam",
        isNew: true,
        options: [
        ],
      };
      dispatch({
        type: "ADD_QUESTION",
        question: newQuestion,
      })
    })

    const addQuestionHandler = React.useCallback(async (question, id) => {
      const newQuestion = { ...question };
      delete newQuestion.id;
      delete newQuestion.isNew
      newQuestion.options = newQuestion.options.map((option) => {
          const newOption = { ...option };
          delete newOption.id;
          return newOption;
      });
      const responseQuestion = await addQuestion(newQuestion);
      dispatch({
          type: "CHANGE_QUESTION",
          id: id,
          question: responseQuestion,
      });
    })

    const deleteQuestionHandler = React.useCallback(async (id) => {
        await deleteQuestion(id);
        dispatch({
            type: "DELETE_QUESTION",
            id: id,
        });
    });

    console.log(state)



    return (
        <ContentContainer color="rgba(127, 246, 246, 0.333)">
            {state.map((question) => {
                return (
                    <EditQuestion
                        key={question.id}
                        id={question.id}
                        question={question}
                        onEditQuestion={editQuestionHandler}
                        onAddQuestion={(addQuestionHandler)}
                        onDelete={() => {deleteQuestionHandler(question.id)}}
                    />
                );
            })}
            <div className={classes.AddQuestion} onClick={addEmptyQuestionHandler}>
                <div className={classes.Pilus}>+</div>
            </div>
        </ContentContainer>
    );
}

export default EditQuiz;
