import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// TODO: Remove this later and use something proper
			{
				protocol: 'http',
				hostname: '192.168.1.104'
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com'
			}
		]
	}
};

export default nextConfig;
