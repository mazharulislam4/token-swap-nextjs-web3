import { axiosInchConfig } from "@/utils/_axiosConfig/axiosConfig";

export default async function approve(req, res) {
  const { tokenAddress } = req.query;

  if (!tokenAddress) {
    return res
      .status(400)
      .json({ isError: true, error: "token address missing" });
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1050));

    const response = await axiosInchConfig.get(
      `/swap/v5.2/1/approve/transaction?tokenAddress=${tokenAddress}`
    );

    console.log(response.data);

    return res.status(200).json({ isError: false, data: response.data });
  } catch (err) {
    res.status(500).json({ isError: true, error: err });
  }
}
