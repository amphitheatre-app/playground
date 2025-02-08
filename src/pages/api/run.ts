import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { code } = req.body;

    // 在这里处理代码执行逻辑
    // 例如，调用外部服务或执行代码
    // 这里是一个示例，您需要根据实际情况进行实现
    const result = `执行结果: ${code}`; // 假设返回执行结果

    res.status(200).json({ result });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
