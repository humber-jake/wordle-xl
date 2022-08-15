const styles = {
      GameRow: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      wobble: {
        animation: "$wobble 150ms ease-in-out",
        animationIterationCount: "3"
      },
      "@keyframes wobble": {
        "0%": {
          "transform": "translatex(0px)"
        },
        "25%": {
          "transform": "translatex(-5px)"
        },
        "75%": {
          "transform": "translatex(5px)"
        },
        "100%": {
          "transform": "translatex(0px)"
        }
      },

  }

  export default styles;