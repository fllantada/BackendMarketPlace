export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "mysecret",

  sessionConfig: {
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  },
};
