// eslint-disable-next-line import/no-anonymous-default-export
export default {
  app: {
    apiUrl:
      process.env.REACT_APP_PUBLIC_API_BASE_URL ||
      "http://localhost:8000",
    googleApi:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ||
      "AIzaSyDv_m0foWAVbm4daMsbot_CoPSf2q0MGmM",
    dev: process.env.REACT_APP_NODE_ENV === "development",
  },
  google: {
    apiKey: "AIzaSyDe5pR8HSKvL5Z8OMkB2MUKdxcE3eRsIeM",
  },
};
