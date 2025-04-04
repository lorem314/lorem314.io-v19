import type { NextConfig } from "next"
import { withContentlayer } from "next-contentlayer"

console.log("next.config.ts")

const nextConfig: NextConfig = {}

export default withContentlayer(nextConfig)
