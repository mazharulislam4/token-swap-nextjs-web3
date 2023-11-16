import { axiosInchConfig } from "@/utils/_axiosConfig/axiosConfig";
export default async function swap(req, res) {
  await new Promise((resolve) => setTimeout(resolve, 1050));
  let slippage = req.query.slippage ? req.query.slippage : 1;
  const { src, dst, swapAmount, fromWallet } = req.query;

  try {
    const apiRes = await axiosInchConfig.get(
      `/v5.2/1/swap?src=${src}&dst=${dst}&amount=${swapAmount}&from=${fromWallet}&slippage=${slippage}`
    );

    console.log(apiRes);
    return res.status(200).json({ isError: false, data: {} });
  } catch (err) {
    console.log("error from swap", err);
    res.status(500).json({ isError: true, error: err });
  }
}
