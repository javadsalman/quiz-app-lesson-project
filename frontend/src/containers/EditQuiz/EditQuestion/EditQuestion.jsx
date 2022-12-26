import React from "react";
import classes from "./EditQuestion.module.scss";
import acceptImage from "../../../assets/images/accept.webp";
import { ReactComponent as DeleteIcon } from "../../../assets/images/svg/delete.svg";
import { getId } from "../../../shared/utils/uuid";

const initialState = {
    index: "1",
    content: "Salam",
    isNew: false,
    options: [
        // {id: 12, content: 'aaa', iscorrect: false}
    ],
};

const loadQuestionAction = (state, action) => {
    return action.question;
};

const editContentAction = (state, action) => {
    return { ...state, content: action.content };
};

const indexPattern = /^\d{0,3}$/;
const editIndexAction = (state, action) => {
    if (indexPattern.test(action.index))
        return { ...state, index: action.index };
    return state;
};

const changeOptionContent = (state, action) => {
    const newOptions = [...state.options];
    const index = newOptions.findIndex((option) => option.id === action.id);
    const option = newOptions[index];
    const newOption = { ...option, content: action.content };
    newOptions[index] = newOption;
    return { ...state, options: newOptions };
};

const selectOption = (state, action) => {
    let newOptions = [...state.options];
    const index = newOptions.findIndex((option) => option.id === action.id);
    const option = newOptions[index];
    if (option.iscorrect) {
        return state;
    }
    newOptions = newOptions.map((option) => ({ ...option, iscorrect: false }));
    const newOption = { ...option, iscorrect: !option.iscorrect };
    newOptions[index] = newOption;
    return { ...state, options: newOptions };
};

const deleteOptionAction = (state, action) => {
    let newOptions = [...state.options];
    const index = newOptions.findIndex((option) => option.id === action.id);
    const option = newOptions.splice(index, 1)[0];
    if (option.iscorrect && newOptions.length > 1) {
        const firstOption = newOptions[0];
        const newFirstOption = { ...firstOption, iscorrect: true };
        newOptions[0] = newFirstOption;
    }
    return { ...state, options: newOptions };
};

const addOptionAction = (state, action) => {
    const newOptions = [...state.options];
    const newOption = {
        id: getId(),
        content: "New Option",
        iscorrect: !newOptions.length,
    };
    newOptions.push(newOption);
    return { ...state, options: newOptions };
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_QUESTION":
            return loadQuestionAction(state, action);
        case "EDIT_CONTENT":
            return editContentAction(state, action);
        case "EDIT_INDEX":
            return editIndexAction(state, action);
        case "CHANGE_OPTION_CONTENT":
            return changeOptionContent(state, action);
        case "SELECT_OPTION":
            return selectOption(state, action);
        case "DELETE_OPTION":
            return deleteOptionAction(state, action);
        case "ADD_OPTION":
            return addOptionAction(state, action);
        default:
            return state;
    }
};

function EditQuestion(props) {
    const { question, onEditQuestion, onAddQuestion, id, onDelete } = props;
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({
            type: "LOAD_QUESTION",
            question: question,
        });
    }, [question]);

    const contentChangeHandler = React.useCallback((e) => {
        dispatch({
            type: "EDIT_CONTENT",
            content: e.target.value,
        });
    }, []);

    const indexChangeHandler = React.useCallback((e) => {
        dispatch({
            type: "EDIT_INDEX",
            index: e.target.value,
        });
    }, []);

    const addOptionHandler = React.useCallback(() => {
        dispatch({
            type: "ADD_OPTION",
        });
    }, []);

    console.log(state);

    const acceptHandler = React.useCallback(() => {
        if (state.isNew) {
            onAddQuestion(state);
        } else {
            onEditQuestion(state, id);
        }
    }, [state]);

    return (
        <div className={classes.EditQuestion}>
            <div className={classes.Index}>
                <div className={classes.IndexValue}>
                    <input
                        className={classes.IndexInput}
                        type="text"
                        value={state.index}
                        onChange={indexChangeHandler}
                    />
                </div>
            </div>
            <img
                className={classes.Accept}
                src={acceptImage}
                alt="accept"
                onClick={acceptHandler}
            />
            <DeleteIcon className={classes.Delete} onClick={onDelete} />
            <div className={classes.Content}>
                <textarea
                    className={classes.ContentInput}
                    value={state.content}
                    onChange={contentChangeHandler}
                ></textarea>
            </div>
            <div className={classes.Options}>
                {state.options.map((option) => {
                    const changeContent = (e) => {
                        dispatch({
                            type: "CHANGE_OPTION_CONTENT",
                            id: option.id,
                            content: e.target.value,
                        });
                    };

                    const toggleCheck = () => {
                        dispatch({
                            type: "SELECT_OPTION",
                            id: option.id,
                        });
                    };

                    const deleteOption = () => {
                        dispatch({
                            type: "DELETE_OPTION",
                            id: option.id,
                        });
                    };

                    return (
                        <div
                            key={option.id}
                            // key={option.id}
                            className={classes.Option}
                            // onClick={() => selectOption(option.id)}
                        >
                            <div className={classes.OptionText}>
                                <input
                                    className={classes.OptionTextInput}
                                    type="text"
                                    value={option.content}
                                    onChange={changeContent}
                                />
                            </div>
                            <div className={classes.OptionCheckDiv}>
                                <input
                                    className={classes.OptionCheck}
                                    type="checkbox"
                                    checked={option.iscorrect}
                                    onChange={toggleCheck}
                                />
                            </div>
                            <DeleteIcon
                                className={classes.DeleteOption}
                                onClick={deleteOption}
                            />
                        </div>
                    );
                })}
                <div className={classes.AddOption} onClick={addOptionHandler}>
                    Add Option
                </div>
            </div>
        </div>
    );
}

export default EditQuestion;
