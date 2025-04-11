import type { NextConfig } from "next"
// import { withContentlayer } from "next-contentlayer"
import { withContentlayer } from "next-contentlayer2"

console.log("next.config.ts")

const nextConfig: NextConfig = {}

export default withContentlayer(nextConfig)
