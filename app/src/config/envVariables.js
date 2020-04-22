import { IP_ADDRESS } from "react-native-dotenv";
import Constants from "expo-constants";

const prodUrl = "";
const devUrl = `http://${IP_ADDRESS}:8000/api`;
console.log(devUrl);

const ENV = {
  dev: {
    apiUrl: devUrl,
  },
  staging: {
    apiUrl: prodUrl,
  },
  prod: {
    apiUrl: prodUrl,
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
  if (env.indexOf("staging") !== -1) return ENV.staging;
}

export default getEnvVars(Constants.manifest.releaseChannel);