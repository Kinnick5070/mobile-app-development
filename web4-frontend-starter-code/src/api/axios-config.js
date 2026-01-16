import axios from "axios";

console.log("MODE: " + import.meta.env.MODE);
//If the MODE is 'development' (npm run dev), Vite will use the .env.development file
//If the MODE is 'production' (npm run build), Vite will use the .env.production file
console.log("VITE_API_BASE_URL: " + import.meta.env.VITE_API_BASE_URL)

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

// You can 'intercept' all requests made by ax, and add your own headers to the request
// Here we're adding the Authorization header so that the server can keep the session going
// NOTE: axios uses all lowercase letters for headers!
axios.interceptors.request.use(request => {
  const jwtToken = sessionStorage.getItem('jwtToken')
  if(jwtToken){
    request.headers['authorization'] = "Bearer " + jwtToken;
    console.log("Adding token to Authorization header:" + jwtToken);
  }
  return request;
});


export default axios