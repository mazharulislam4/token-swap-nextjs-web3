import { MoralisNextApi } from "@moralisweb3/next";


console.log("hi moralis");


export default MoralisNextApi({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
});
