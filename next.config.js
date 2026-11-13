/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Deployment kind baked into server and browser code at build time, so
     production builds never carry dev-only content. */
  env: { RAWLINS_ENV: process.env.VERCEL_ENV || "development", RAWLINS_SCENES: process.env.RAWLINS_SCENES || "photo" },
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
      /* pages renamed since (lib/moved-pages.json; Nov 12): the old address goes to the page's new one */
      ...Object.entries(require("./lib/moved-pages.json").slugs).map(([from, to]) => ({ source: `/:path*/${from}`, destination: `/:path*/${to}`, permanent: false })),
      { source: "/about-us", destination: "/about/our-people", permanent: true },
      { source: "/our-team", destination: "/about/our-people", permanent: true },
      { source: "/team", destination: "/about/our-people", permanent: true },
      { source: "/pxl-template/:slug*", destination: "/about/our-people", permanent: true },
      // Nov 11: Maintenance & Operations renamed Maintenance Programs
      { source: "/services/operations-maintenance/maintenance-operations", destination: "/services/maintenance-operations/maintenance-programs", permanent: true },
      // Content pass v7, Part 11 (Nov 11): Project Delivery services renamed and split
      { source: "/services/project-delivery/program-project-delivery", destination: "/services/program-project-delivery/program-development", permanent: true },
      { source: "/services/project-delivery/program-delivery", destination: "/services/program-project-delivery/program-development", permanent: true },
      // Nov 12 (Nicole): Program & Project Delivery menu rebuilt; pages split, renamed, or taken off
      { source: "/services/project-delivery/alternative-delivery-partnering", destination: "/services/program-project-delivery/alternative-delivery", permanent: false },
      { source: "/services/project-delivery/finance-budget-procurement", destination: "/services/program-project-delivery/consultant-contractor-procurement", permanent: false },
      { source: "/services/project-delivery/local-public-agency-federal-aid-programs", destination: "/services/program-project-delivery/local-public-agency-programs", permanent: false },
      { source: "/services/project-delivery/grants-funding", destination: "/services/program-project-delivery/grant-applications-delivery", permanent: false },
      { source: "/services/project-delivery/right-of-way", destination: "/services/program-project-delivery/preconstruction", permanent: false },
      // Nov 13 (Nicole: "this link needs to be updated"): the area's address is now /services/program-project-delivery,
      // to match its name. After the redirects above, so a renamed service goes straight to its page.
      { source: "/services/project-delivery", destination: "/services/program-project-delivery", permanent: false },
      // Nov 12 (Nicole): Who We Work With. Other Government Services became the Public Sector page, its modes and Bridges &
      // Structures came off, and Highways & Roads became Highways & Bridges
      { source: "/industries/government-public-works", destination: "/industries/public-sector", permanent: false },
      // Nov 13 (Who We Work With file v1): three of those old modes have a page again
      { source: "/industries/government-public-works/federal-multi-state-programs", destination: "/industries/federal-government", permanent: false },
      { source: "/industries/government-public-works/asset-management-for-local-agencies", destination: "/industries/local-governments", permanent: false },
      { source: "/industries/government-public-works/capital-project-delivery-permitting", destination: "/industries/local-governments", permanent: false },
      { source: "/industries/government-public-works/:sub", destination: "/industries/public-sector", permanent: false },
      { source: "/industries/contractors-engineering-firms", destination: "/industries/contractors", permanent: true },
      { source: "/industries/contractors-engineering-firms/:path*", destination: "/industries/contractors/:path*", permanent: true },
      { source: "/industries/transportation/bridges-structures", destination: "/industries/transportation/highways-bridges", permanent: false },
      { source: "/industries/transportation/highways-roads", destination: "/industries/transportation/highways-bridges", permanent: false },
      { source: "/services/project-delivery/construction-pre-construction", destination: "/services/program-project-delivery/construction", permanent: true },
      { source: "/services/project-delivery/:svc", destination: "/services/program-project-delivery/:svc", permanent: false },
      // Nov 13 (projects file v4): project 31 is now page A (the project delivery network), and the Nevada strategic plan's address
      { source: "/insights/case-studies/project-delivery-website-and-change-system", destination: "/insights/case-studies/a-project-delivery-network", permanent: false },
      { source: "/insights/case-studies/nevada-six-year-strategic-plan", destination: "/insights/case-studies/nevada-strategic-plan-and-action-plans", permanent: false },
      // Nov 13 (Nicole: "everywhere it's operations and maintenance, it should be maintenance and operations"): the area's address
      { source: "/services/operations-maintenance", destination: "/services/maintenance-operations", permanent: false },
      { source: "/services/operations-maintenance/:svc", destination: "/services/maintenance-operations/:svc", permanent: false },
      { source: "/insights/case-studies/nevada-operations-maintenance-review", destination: "/insights/case-studies/nevada-maintenance-operations-review", permanent: false },
      // Redesign (handoff v7 section 7): old structure -> new, permanent
      { source: "/capabilities", destination: "/services", permanent: true },
      { source: "/services/strategy-organization/executive-administrative-advisory", destination: "/services/strategy-organization/executive-advisory-services", permanent: true },
      { source: "/capabilities/technology/advanced-air-mobility", destination: "/services/drones-advanced-air-mobility", permanent: true },
      { source: "/capabilities/technology/automation-integration", destination: "/services/digital-solutions/integration-automation", permanent: true },
      { source: "/capabilities/:path*", destination: "/services", permanent: true },
      { source: "/automation-ai-examples", destination: "/services/digital-solutions/integration-automation", permanent: true },
      { source: "/about/areas-we-serve", destination: "/about/where-we-work", permanent: true },
      { source: "/drones-advanced-air-mobility", destination: "/services/drones-advanced-air-mobility", permanent: true },
      { source: "/news", destination: "/insights/news", permanent: true },
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
      { source: "/insights/thought-leadership/strengthening-your-team", destination: "/insights/thought-leadership", permanent: true },
      { source: "/thought-leadership-ron-crew-strengthening-your-team.pdf", destination: "/insights/thought-leadership", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      // Old state pages from the current site (content updates v4, 3.6): permanent
      { source: "/insights/case-studies/delaware", destination: "/insights/case-studies/delaware-technology-strategic-plan", permanent: true },
      { source: "/insights/case-studies/louisiana", destination: "/insights/case-studies", permanent: true },
      { source: "/insights/case-studies/michigan", destination: "/insights/case-studies/michigan-performance-based-maintenance-operations", permanent: true },
      { source: "/insights/case-studies/nevada", destination: "/insights/case-studies/nevada-six-year-strategic-plan", permanent: true },
      { source: "/insights/case-studies/north-carolina", destination: "/insights/case-studies/north-carolina-integrated-program-delivery", permanent: true },
      { source: "/insights/case-studies/tennessee", destination: "/insights/case-studies?state=tennessee", permanent: true },
      { source: "/insights/case-studies/utah", destination: "/insights/case-studies/utah-asset-management-review", permanent: true },
      { source: "/insights/case-studies/virginia", destination: "/insights/case-studies/virginia-performance-based-maintenance-review", permanent: true },
      { source: "/insights/case-studies/major-transportation-infrastructure", destination: "/insights/case-studies/major-river-crossings-and-transit", permanent: true },
      { source: "/insights/case-studies/other-states-major-projects", destination: "/insights/case-studies", permanent: true },
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
