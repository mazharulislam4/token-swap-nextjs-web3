import { axiosInchConfig } from "@/utils/_axiosConfig/axiosConfig";

export default async function allowance(req, res) {
  const { tokenAddress, walletAddress } = req.query;

  if (!tokenAddress || !walletAddress) {
    return res.status(400).json({
      isError: true,
      error: "Token address and walletAddress required!",
    });
  }

  try {
    const response = await axiosInchConfig.get(
      `/swap/v5.2/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`
    );

    const responseData =  response.data;

    return res.status(200).json({ isError: false, data: responseData });
  } catch (err) {
    res.status(500).json({ isError: true, error: err });
  }
}
