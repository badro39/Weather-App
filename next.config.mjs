export default {
  images: {
    domains: ["openweathermap.org"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },
};
