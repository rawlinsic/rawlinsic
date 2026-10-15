/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    browserDebugInfoInTerminal: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920, 2560],
    imageSizes: [48, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year — images are static assets
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Proposal Writer/Manager role filled — permanently (301) redirect
      // the old posting URL to the careers index so inbound links and
      // search-engine hits don't 404.
      {
        source: "/careers/proposal-writer-manager",
        destination: "/careers",
        permanent: true,
      },
      // Old WordPress/Joomla URLs still in Google's index (Search Console
      // 404 report, 2026-10-14) -> permanent redirects to the matching page.
      { source: "/Home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about/our-people", permanent: true },
      { source: "/our-team", destination: "/about/our-people", permanent: true },
      { source: "/team", destination: "/about/our-people", permanent: true },
      { source: "/pxl-template/:slug*", destination: "/about/our-people", permanent: true },
      { source: "/services", destination: "/capabilities", permanent: true },
      { source: "/drones-advanced-air-mobility", destination: "/capabilities/technology/advanced-air-mobility", permanent: true },
      { source: "/news", destination: "/insights", permanent: true },
      { source: "/projects-overview", destination: "/insights/case-studies", permanent: true },
      { source: "/projects/major-transportation-infrastructure-projects", destination: "/insights/case-studies/major-transportation-infrastructure", permanent: true },
      { source: "/projects/other-states-major-projects", destination: "/insights/case-studies/other-states-major-projects", permanent: true },
      { source: "/projects/:state(delaware|louisiana|michigan|nevada|north-carolina|tennessee|utah|virginia)", destination: "/insights/case-studies/:state", permanent: true },
      { source: "/podcast", destination: "/insights/podcast", permanent: true },
      { source: "/category/podcast-articles", destination: "/insights/podcast", permanent: true },
      { source: "/connecting-the-dots-the-rawlins-way-featuring-janine-cooper", destination: "/insights/podcast", permanent: true },
      { source: "/the-skys-the-limit-with-alicia-mcconnell-pioneering-aerial-innovations", destination: "/insights/podcast", permanent: true },
      { source: "/critical-path-podcast-with-alicia-mcconnel-and-john-zuleger", destination: "/insights/podcast", permanent: true },
      { source: "/building-future-ready-teams-proficiency-focused-workforce-development", destination: "/insights/thought-leadership", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      // Static assets in /public get immutable caching
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(webp|jpg|jpeg|png|gif|svg|webm|mp4|woff|woff2|ttf|otf|pdf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Global security headers applied to every response
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  devIndicators: false,
  allowedDevOrigins: [
    "*.macaly.dev",
    "*.macaly.app",
    "*.macaly-app.com",
    "*.macaly-user-data.dev",
  ],
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        condition: {
          all: [{ not: "foreign" }, "development"],
        },
        loaders: [
          {
            loader: "macaly-tagger",
            options: {
              disableSourceMaps: true,
              ignorePackages: [
                // Skip components imported from these packages (requires macaly-tagger v1.2.0+)
                "@react-three/fiber",
                "@react-three/drei",
              ],
            },
          },
        ],
        as: "*",
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.module.rules.unshift({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "macaly-tagger",
            options: {
              ignorePackages: [
                // Skip components imported from these packages (requires macaly-tagger v1.2.0+)
                "@react-three/fiber",
                "@react-three/drei",
              ],
            },
          },
        ],
        enforce: "pre",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
