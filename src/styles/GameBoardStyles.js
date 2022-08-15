const styles = {
      Game: {
        "height": "90vh",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center"
      },
      GameBoardContainer: {
        "height": "60%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
      },
      GameBoard: {
        "height": "420px"
      },
      "@media screen and (max-width: 420px)": {
        GameBoard: {
          "height": 'auto',
        },
        GameBoardContainer: {
          "height": "auto",
        },
      },
      GameBoardForm: {
        "width": "50%",
        "margin": "0 auto",
      },
      GameBoardInput: {
        "opacity": "0",
        "width": "100%"
      },
      GameBoardButton: {
        "display": "none",
        "marginLeft": "36%"
      },
      keyboard: {
        "height": "30%"
      },
      messages: {
        "animation": "$fade 500ms ease-in-out",
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
        "textShadow": "2px 2px 2px #171616"
      },
      "@keyframes fade": {
        "0%": {
          "transform": "translate(-50%, -30%)",
          "opacity": '0%'
        },
        "100%": {
          "transform": "translate(-50%, -50%)",
          "opacity": '100%'
        }
      }
  }

  export default styles;