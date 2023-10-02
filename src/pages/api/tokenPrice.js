import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";

export default async function tokenPrice(req, res) {
  const query = req.query;
  const { address, address2 } = query;

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }

  const chain = EvmChain.ETHEREUM;

  if (!address || !address2) {
    return res.status(400).json({ error: "address not found!", isError: true });
  }

  const response1 = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

  const response2 = await Moralis.EvmApi.token.getTokenPrice({
    address: address2,
    chain,
  });


  if (!response1 || !response2) {
    return;
  }


  res.status(200).json({
    address: response1,
    address2: response2,
    ratio: response1.raw.usdPrice / response2.raw.usdPrice,
  });
}
