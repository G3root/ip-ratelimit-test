import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "~/utils/rate-limit";

const limiter = rateLimit({
  intervalInMs: 60 * 1000, // 1 minute
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // fallback to email if ip is not present
  let ip = (req.headers["x-real-ip"] as string) ?? "pro@example.com";

  const forwardedFor = req.headers["x-forwarded-for"] as string;
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "pro@example.com";
  }

  const { isRateLimited } = limiter.check(5, ip); // 5 requests per minute

  res.status(200).json({ isRateLimited: String(isRateLimited), ip });
}
