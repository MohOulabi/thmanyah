import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Explicit path so next-intl finds the config when run via Turborepo (cwd/root can differ)
const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/ar.json',
    srcPath: './src/i18n/request.ts',
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      ...['is1-ssl.mzstatic.com'].map(hostname => ({
        protocol: 'https' as const,
        hostname,
        pathname: '/**',
      })),
    ],
  },
};

export default withNextIntl(nextConfig);
