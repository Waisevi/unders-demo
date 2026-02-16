import { Providers } from './providers';

import type { Metadata } from 'next';
import '@/styles/global.css';

/**
 * Root layout metadata
 */
export const metadata: Metadata = {
  description: 'Next.js App Router Application',
  title: 'App Name',
};

/**
 * Root layout component
 * Replaces _app.tsx and _document.tsx from Pages Router
 * Must include <html> and <body> tags
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        {/* import-meta-env CLI replaces "import_meta_env_placeholder" at container start */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'globalThis.import_meta_env=JSON.parse(\'"import_meta_env_placeholder"\');',
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
