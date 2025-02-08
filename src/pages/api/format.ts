import type { NextApiRequest, NextApiResponse } from "next";
import { js_beautify } from "js-beautify";
import { formatText } from "lua-fmt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, language } = req.body;

  try {
    let formattedCode;

    if (language === "lua") {
      formattedCode = formatText(code, {
        lineWidth: 80,
        indentCount: 4,
        useTabs: false,
      });
    } else {
      formattedCode = js_beautify(code, {
        indent_size: 4,
        indent_char: " ",
        max_preserve_newlines: 2,
        preserve_newlines: true,
        wrap_line_length: 88,
      });
    }

    return res.status(200).json({ formattedCode });
  } catch (error: any) {
    console.error("Format error:", error);
    return res.status(500).json({ error: error.message });
  }
}
