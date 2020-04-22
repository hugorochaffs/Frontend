import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  text: {
    fontFamily: "montserrat-semibold",
    fontSize: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  catAvatar: {
    height: 54,
    width: 54,
    resizeMode: "contain",
  },
  recenter: {
    position: "absolute",
    top: 50,
    right: 30,
    zIndex: 5,
    elevation: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
  filter: {
    position: "absolute",
    width: 50,
    bottom: 55,
    left: 20,
    zIndex: 5,
    backgroundColor: "#F7EF6E",
    padding: 15,
    borderRadius: 100,
    elevation: 5,
  },
  helpButton: {
    position: "absolute",
    bottom: 45,
    right: 20,
    zIndex: 5,
    elevation: 5,
  },
  helpList: {
    position: "absolute",
    bottom: 0,
    elevation: 6,
    width: "100%",
  },

  callout: {
    width: 150,
  },
});

export default styles;