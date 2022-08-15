const styles = {
    charts: {
      "display": "grid",
      "gap": "1rem",
      "gridTemplateColumns": "1fr 1fr"
    },
    "@media screen and (max-width: 726px)": {
      charts: {
        "display": "grid",
        "gap": "1rem",
        "gridTemplateColumns": "1fr"
      },
    },
    board: {
      "width": "100%",
      "margin": "0 auto"
    },
    gridOverlap: {
      "gridArea": "1 / 1 / 1 / 1",
    },
    statsTitle: {
      "textAlign": "center"
    },
    stats: {
      "display": "grid",
      "margin": "0 auto",
      "width": "60%",
      "gridTemplateColumns": "1fr 1fr 1fr 1fr 1fr"
    },
    "@media screen and (max-width: 960px)": {
      stats: {
        "width": "90%",
      },
    },
    statsButton: {
      marginLeft: '-67px'
    },
    metric: {
      "fontFamily": "'Clear Sans', 'Helvetica Neue', Arial, sans-serif",
      "display": "grid",
      "gridTemplateColumns": "1fr",
      "fontSize": "10px",
      "lineHeight": "12px",
      "letterSpacing": "0.1em",
      "margin": "0 auto",
      "width": "70%",
      "textAlign": "center"
    },
    figure: {
      "fontWeight": "500",
      "marginBottom": '.75rem',
      "fontVariantNumeric": "proportional-nums",
      "letterSpacing": "-1px",
      "fontSize": "2rem"
    },
    chart: {
      "display": "grid",
      "gridTemplateRows": "1fr",
      "gridTemplateColumns": "1fr",
      "margin": "0.5rem auto",
      "backgroundColor": "#f7f7f7",
      "padding": "1rem 0.5rem",
      "marginBottom": "1.5rem",
      "borderRadius": "15px",
    },
    row: {
      "display": "grid",
      "width": "90%",
      "gridTemplateColumns": "1fr 20fr",
    //   "margin": "0.4rem"
    },
    key: {
      "justifySelf": "flex-end",
      "fontVariantNumeric": "proportional-nums",
      "minWidth": "15px",
      "marginRight": "5px",
      "fontSize": "large",
      "fontWeight": "500",
      "borderRight": "3px solid #d3d6da",
      "padding": "5px 0px 5px 0px"
    },
    value: {
      "fontSize": "large",
      "color": "white",
      "fontWeight": "700",
      "alignSelf": "center",
      "lineHeight": "1.5rem",
      "backgroundColor": "#6aaa64",
      "textAlign": "right",
      "marginRight": "3px",
      "padding": "0px 6px 0px 3px",
      "minWidth": "15px",
      "height": "80%",
      "zIndex": "2",
    },
    timerContainer: {
      "display": "block",
      "textAlign": "center",
      "margin": "1rem auto"
    },
    timerTitle: {
      "fontSize": "2rem",
      "fontWeight": "500"
    },
    timer: {
      "fontSize": "3rem",
      "fontWeight": "200",
      "fontVariantNumeric": "tabular-nums",
      "letterSpacing": "-2px"
    },
    unfinished: {
      "opacity":'50%',
    },
    messages: {
      "animation": "$fade 2000ms ease-in-out",
      "position": "absolute",
      "top": "40%",
      "left": "50%",
      "transform": "translate(-50%, -50%)",
      "fontSize": "2rem",
      "color": "white",
      "backgroundColor": "#272727d6",
      "textAlign": "center",
      "margin": "0 auto",
      "padding": "0.5rem",
      "borderRadius": "10px",
      "textShadow": "2px 2px 2px #171616",
      "zIndex": "10",
      "opacity": "0%" 
    },
    "@keyframes fade": {
      "0%": {
        "transform": "translate(-50%, -30%)",
        "opacity": '0%'
      },
      "30%": {
        "transform": "translate(-50%, -50%)",
        "opacity": '100%'
      },
      "90%": {
        "transform": "translate(-50%, -50%)",
        "opacity": '100%'
      },
      "100%": {
        "transform": "translate(-50%, -50%)",
        "opacity": '0%'
      },
    },
    fadeNumber:{
      "margin": "0 auto",
      "fontFamily": "Rubik",
      "color": "#787c7e",
      "fontSize": "12rem",
      "gridArea": "1 / 1 / 1 / 1",
    }
  }

  export default styles;