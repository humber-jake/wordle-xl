import React from 'react';
import { createUseStyles } from 'react-jss';


function GameTile(props) {
    
    const { letter, evaluation, highlighted, i, answer, isWinner } = props;


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
          "@keyframes correct": {
            "0%": {
              "transform": "scaleY(1)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "50%": {
              "transform": "scaleY(0)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "51%": {
              "border": "2px solid #6aaa64",
              "backgroundColor": "#6aaa64",
              "color": "white"
            },
            "100%": {
              "transform": "scaleY(1)",
              "backgroundColor": "#6aaa64",
              "color": "white"
            }
          },
          "@keyframes present": {
            "0%": {
              "transform": "scaleY(1)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "50%": {
              "transform": "scaleY(0)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "51%": {
              "border": "2px solid #c9b458",
              "backgroundColor": "#c9b458",
              "color": "white"
            },
            "100%": {
              "transform": "scaleY(1)",
              "border": "2px solid #c9b458",
              "backgroundColor": "#c9b458",
              "color": "white"
            }
          },
        "@keyframes absent": {
            "0%": {
              "transform": "scaleY(1)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "50%": {
              "transform": "scaleY(0)",
              "border": "2px solid lightgray",
              "backgroundColor": "white",
              "color": "black"
            },
            "51%": {
              "border": "2px solid #787c7e",
              "backgroundColor": "#787c7e",
              "color": "white"
            },
            "100%": {
              "transform": "scaleY(1)",
              "border": "2px solid #787c7e",
              "backgroundColor": "#787c7e",
              "color": "white"
            }
          },
          "@keyframes winner": {
            "0%": {
              "transform": "translateY(0px)"
            },
            "50%": {
              "transform": "translateY(-25px)"
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
                animation: "$absent 600ms",
            },
            "&.present": {
                border: "2px solid #c9b458",
                backgroundColor: "#c9b458",
                color: "white",
                animation: "$present 600ms"
              },
            "&.correct": {
                border: "2px solid #6aaa64",
                backgroundColor: "#6aaa64",
                color: "white",
                animation: "$correct 600ms"
            },
            "&.absent, &.present, &.correct": {
                transition: 'all 600ms ease-in-out',
                transitionDelay: `${300 * i}ms`,
                animationDelay: `${300 * i}ms`,
            },
            "&.winner": {
                animation: `$correct 600ms ease-in-out ${300 * i}ms, $winner 300ms ease-in-out ${(answer.length * 300) + (150 * i)}ms`,
            }
        },
    }
    const useStyles = createUseStyles(styles);
    const classes = useStyles();

    return (
        <div className={`${classes.GameTile} ${evaluation ? evaluation : ''} ${highlighted ? 'highlighted' : ''} ${ isWinner ? 'winner' : ''}`}>
            <span>{letter}</span>
        </div>
    );
}

export default GameTile;