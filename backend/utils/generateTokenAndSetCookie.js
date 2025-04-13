import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Convert JWT_COOKIE_EXPIRES_IN to a number and provide a default value (e.g., 1 day)
  const cookieExpiresInDays = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 1;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: cookieExpiresInDays * 24 * 60 * 60 * 1000, // 24 hours
  });
};
