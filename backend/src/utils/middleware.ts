/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { RequestHandler, ErrorRequestHandler } from "express";

const authorize: RequestHandler = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(400).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default { authorize, errorHandler };
