import './App.css';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import Loading from './components/Spinner/Loading';
// import StartQuiz from './containers/StartQuiz/StartQuiz';
// import EditQuiz from './containers/EditQuiz/EditQuiz';
// import Results from './containers/Results/Results';

const StartQuiz = React.lazy(() => import('./containers/StartQuiz/StartQuiz'))
const EditQuiz = React.lazy(() => import('./containers/EditQuiz/EditQuiz'))
const Results = React.lazy(() => import('./containers/Results/Results'))

export const loadingContext = React.createContext()

function App() {
  const [page, setPage] = React.useState('start')
  const [loading, setLoading] = React.useState(false)

  const startLoading = React.useCallback(() => setLoading(true))
  const stopLoading = React.useCallback(() => setLoading(false))

  const contentJSX = React.useMemo(() => {
    if (page === 'start')
      return <StartQuiz />
    else if (page === 'edit')
      return <EditQuiz />
    else if (page === 'results')
      return <Results />
  }, [page])

  return (
    <div className="App">
      <loadingContext.Provider value={{startLoading: startLoading, stopLoading: stopLoading}}>
        <Navbar page={page} setPage={setPage} />
        <React.Suspense>
          {contentJSX}
        </React.Suspense>
      </loadingContext.Provider>
      {loading && <Loading />}
    </div>
  );
}

export default App;
