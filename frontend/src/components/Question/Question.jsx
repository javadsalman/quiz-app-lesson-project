import React from "react";
import classes from "./Question.module.scss";

function Question(props) {
    const selectOption = React.useCallback((optionId) => {
        if (!props.selectedOption) {
            props.addAnswer(props.id, optionId)
        }
    }, [props.selectedOption])

    return (
        <div className={classes.Question}>
            <div className={classes.Index}>
                <div className={classes.IndexValue}>{props.index}</div>
            </div>
            <div className={classes.Content}>{props.content}</div>
            <div className={classes.Options}>
                {props.options.map((option) => {
                    let className = classes.Option + ' ';
                    if (props.selectedOption === option.id) {
                        if (option.iscorrect) {
                            className += classes.OptionCorrect
                        } else {
                            className += classes.OptionWrong
                        }
                    }

                    return (
                        <div 
                        key={option.id} 
                        className={className}
                        onClick={() => selectOption(option.id)}
                        >
                            {option.content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Question;
