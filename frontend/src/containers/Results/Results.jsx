import React from "react";
import ContentContainer from "../../HOC/ContentContainer/ContentContainer";
import useQuizService from "../../hooks/useQuizService";
import classes from "./Results.module.scss";
import { ReactComponent as DeleteIcon } from "../../assets/images/svg/delete.svg";

function Results() {
    const { results, loadResutls, deleteResult } = useQuizService();

    React.useEffect(() => {
        loadResutls();
    }, []);

    return (
        <ContentContainer color="rgba(168, 179, 228, 0.3)">
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Student</th>
                        <th>Total</th>
                        <th>Right</th>
                        <th>Wrong</th>
                        <th>Empty</th>
                        <th>Date</th>
                        <th>Silme</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.student_name}</td>
                            <td>{result.total_question}</td>
                            <td>{result.right_answers}</td>
                            <td>{result.wrong_answers}</td>
                            <td>
                                {result.total_question -
                                    result.right_answers -
                                    result.wrong_answers}
                            </td>
                            <td>{result.created}</td>
                            <td>
                                <DeleteIcon
                                    onClick={() => deleteResult(result.id)}
                                    className={classes.DeleteButton}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ContentContainer>
    );
}

export default Results;
