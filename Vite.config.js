export default {
  server: {
    proxy: {
      "/api": {
        target: "https://temple-backend-one.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
};