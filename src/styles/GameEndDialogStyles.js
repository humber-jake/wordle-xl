export default {
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
      }
    },
    board: {
      "width": "100%",
      "margin": "0 auto"
    },
    statsTitle: {
      "textAlign": "center"
    },
    stats: {
      "display": "grid",
      "margin": "0 auto",
      "width": "60%",
      "gridTemplateColumns": "1fr 1fr 1fr 1fr"
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
      "margin": "0.5rem auto",
      "backgroundColor": "#f7f7f7",
      "padding": "1rem 0.5rem",
      "marginBottom": "1.5rem",
      "borderRadius": "15px"
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
      "height": "80%"
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
    }
  }