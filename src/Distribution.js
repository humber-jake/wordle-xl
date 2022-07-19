import React, { useEffect } from 'react';
import styles from './styles/GameEndDialogStyles.js'
import { createUseStyles } from 'react-jss';

let useStyles = createUseStyles(styles)

function Distribution(props) {

    const {data} = props;
    let classes = useStyles()
    let total = Object.values(data).reduce((prev, curr)=> prev + curr)    
    let arr = Object.keys(data)
    arr.splice(-1);
    
    let chart = arr.map(key => 
        <div key={key} className={classes.row}> 
                            <span className={classes.key}>{`${key}`}</span> 
                            <span style={{width: `${Math.floor(data[key] / total * 100)}%`}} className={classes.value}>{data[key]}</span>
                        </div>)



    return (
        <div className={classes.chart}>
            {chart}
        </div>
    );
}

export default Distribution;