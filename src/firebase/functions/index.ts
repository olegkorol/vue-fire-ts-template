import axios from "axios";
import * as config from "./config.json";

// This files showcases a way that you could access your project's HTTP (Firebase) Cloud Functions
// (Callable functions would just use the Firebase SDK)

const env: string = process.env?.VUE_APP_FIREBASE_ENV;

const baseUrl: { [index: string]: string } = config.cloudFunctions.baseUrl;
const endpoints: { [index: string]: string } = config.cloudFunctions.endpoints;
const queryParams: { [index: string]: string } =
  config.cloudFunctions.queryParams;
const authToken: { [index: string]: string } = config.cloudFunctions.authToken;

export const someFunction = async (): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${baseUrl[env]}/${endpoints.myEndpoint}?${queryParams.token}=${authToken[env]}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return data;
  } catch (error) {
    return new Error(error);
  }
};
