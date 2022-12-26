import React from "react";
import classes from "./Navbar.module.scss";

function Navbar({page, setPage}) {
    return (
        <div className={classes.Navbar}>
            <ul className={classes.List}>
                <li 
                  className={page==='start' ? classes.ItemSelected : classes.Item}
                  onClick={() => setPage('start')}
                >Start Quiz</li>
                <li 
                  className={page==='edit' ? classes.ItemSelected : classes.Item}
                  onClick={() => setPage('edit')}
                >Edit Quiz</li>
                <li 
                  className={page==='results' ? classes.ItemSelected : classes.Item}
                  onClick={() => setPage('results')}
                >See Results</li>
            </ul>
        </div>
    );
}

export default Navbar;
