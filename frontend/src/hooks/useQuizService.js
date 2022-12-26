import React from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/'
const ALL_QUESTIONS_URL = BASE_URL + 'questions/'
const RESULT_URL = BASE_URL + 'quizresults/'


function useQuizService(props) {
    const [questions, setQuestions] = React.useState([])
    const [results, setResults] = React.useState([])

    const loadQuestions = React.useCallback(async (callback) => {
        const response = await axios.get(ALL_QUESTIONS_URL)
        setQuestions(response.data)
        if (callback)
            callback(response.data);
    })

    const loadResutls = React.useCallback(async () => {
        const response =  await axios.get(RESULT_URL)
        setResults(response.data)
    })

    const deleteResult = React.useCallback(async (id) => {
        await axios.delete(RESULT_URL + id + '/')
        setResults(prev => prev.filter(r => r.id !== id))
    })
    

    const sendResult = React.useCallback(async (result) => {
        const response = await axios.post(RESULT_URL, result)
        return response.data
    }, [])

    const editQuestion = React.useCallback(async (question, id) => {
        const response = await axios.put(ALL_QUESTIONS_URL+id+'/', question)
        return response.data
    })

    const deleteQuestion = React.useCallback(async (id) => {
        const response = await axios.delete(ALL_QUESTIONS_URL+id+'/');
        return response.data
    })

    const addQuestion = React.useCallback(async (question) => {
        const response = await axios.post(ALL_QUESTIONS_URL, question);
        return response.data
    })

    return {
        questions,
        loadQuestions,
        sendResult,
        results,
        loadResutls,
        deleteResult,
        editQuestion,
        deleteQuestion,
        addQuestion,
    }
}


export default useQuizService