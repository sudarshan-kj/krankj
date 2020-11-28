module.exports = {
  accessTokenSecret: process.env.AT_SECRET,
  refreshTokenSecret: process.env.RT_SECRET,
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 2,
    ADMIN: 2048,
  },
  adminUsers: ["kjsudi@gmail.com", "srini@gmail.com"],
};
