const styles = {
      GameRow: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
          // "&.winner div:nth-child(1)": {
          //   transition: "all 600ms ease-in-out",
          //   animation: "correct 600ms ease-in-out,\n                winner 300ms ease-in-out 1800ms"
          // },
          // "&.winner div:nth-child(2)": {
          //   transition: "all 600ms ease-in-out",
          //   transitionDelay: "300ms",
          //   animation: "correct 600ms ease-in-out 300ms,\n                winner 300ms ease-in-out 1950ms"
          // },
          // "&.winner div:nth-child(3)": {
          //   transition: "all 600ms ease-in-out",
          //   transitionDelay: "600ms",
          //   animation: "correct 600ms ease-in-out 600ms,\n                winner 300ms ease-in-out 2100ms"
          // },
          // "&.winner div:nth-child(4)": {
          //   transition: "all 600ms ease-in-out",
          //   transitionDelay: "900ms",
          //   animation: "correct 600ms ease-in-out 900ms,\n                winner 300ms ease-in-out 2250ms"
          // },
          // "&.winner div:nth-child(5)": {
          //   transition: "all 600ms ease-in-out",
          //   transitionDelay: "1200ms",
          //   animation: "correct 600ms ease-in-out 1200ms,\n                winner 300ms ease-in-out 2400ms"
          // }
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
      // "@keyframes winner": {
      //   "0%": {
      //     "transform": "translateY(0px)"
      //   },
      //   "50%": {
      //     "transform": "translateY(-25px)"
      //   },
      //   "100%": {
      //     "transform": "translateY(0px)"
      //   }
      // },
      // "@keyframes correct": {
      //   "0%": {
      //     "transform": "scaleY(1)",
      //     "border": "2px solid lightgray",
      //     "backgroundColor": "white",
      //     "color": "black"
      //   },
      //   "50%": {
      //     "transform": "scaleY(0)",
      //     "border": "2px solid lightgray",
      //     "backgroundColor": "white",
      //     "color": "black"
      //   },
      //   "51%": {
      //     "border": "2px solid #6aaa64",
      //     "backgroundColor": "#6aaa64",
      //     "color": "white"
      //   },
      //   "100%": {
      //     "transform": "scaleY(1)",
      //     "backgroundColor": "#6aaa64",
      //     "color": "white"
      //   }
      // },
  }

  export default styles;