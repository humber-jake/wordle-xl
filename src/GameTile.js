import React from 'react';
import { createUseStyles } from 'react-jss';


function GameTile(props) {
    
    const { letter, evaluation, highlighted, i, answer, isWinner, animating } = props;


    const styles = {
        "@keyframes pop": {
            "0%": {
              "transform": "scale(1)"
            },
            "50%": {
              "transform": "scale(1.1)"
            },
            "100%": {
              "transform": "scale(1)"
            }
          },
        "@keyframes flip": {
            "0%": {
              "transform": "scaleY(1)",
            },
            "50%": {
              "transform": "scaleY(0)",
            },
            "100%": {
              "transform": "scaleY(1)",
            }
          },
          "@keyframes winner": {
            "0%": {
              "transform": "translateY(0px)"
            },
            "10%": {
              "transform": "translateY(-25px)"
            },
            "20%": {
              "transform": "translateY(0px)"
            },
            "100%": {
              "transform": "translateY(0px)"
            }
          },
          GameTile:{
            height: "62px",
            width: "62px",
            border: "2px solid lightgray",
            margin: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "uppercase",
            fontWeight: "600",
            fontSize: "2rem",
            "&.highlighted": {
                border: "2px solid #787c7e",
                animation: "$pop 100ms ease-in-out"
              },
            "&.absent": {
                border: "2px solid #787c7e",
                backgroundColor: "#787c7e",
                color: "white", 
            },
            "&.present": {
                border: "2px solid #c9b458",
                backgroundColor: "#c9b458",
                color: "white",
              },
            "&.correct": {
                border: "2px solid #6aaa64",
                backgroundColor: "#6aaa64",
                color: "white",
            },
            "&.absent, &.present, &.correct": {
              "&.animating": {
                animation: "$flip 600ms",
                transitionDelay: `${300 + 300 * i}ms`,
                animationDelay: `${300 * i}ms`,
              } 
            },
            "&.winner": {
                animation: `$winner 2000ms ${100 * i}ms`,
                animationIterationCount: 'infinite',
            }
        },
        "@media screen and (max-width: 560px)": {
          GameTile:{
            height: '50px',
            width: '50px',
          },
        },
        "@media screen and (max-width: 500px)": {
          GameTile:{
            height: '35px',
            width: '35px',
          },
        },
    }
    const useStyles = createUseStyles(styles);
    const classes = useStyles();

    return (
        <div className={`${classes.GameTile} ${evaluation ? evaluation : ''} ${animating ? 'animating' : ''} ${highlighted ? 'highlighted' : ''} ${ isWinner ? 'winner' : ''}`}>
            <span>{letter}</span>
        </div>
    );
}

export default GameTile;