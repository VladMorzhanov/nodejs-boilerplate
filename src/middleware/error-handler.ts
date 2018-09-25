import { Request, Response } from "express";
import { ERROR_CODES, STATUS_CODES } from "../constants";
import CustomError from "../error/custom-error";

const errorHandler = () => {
  return (e: CustomError, _: Request, res: Response) => {
    return res.status(e.status || STATUS_CODES.SERVER_ERROR).json({
      success: false,
      error_code: e.error_code || ERROR_CODES.SERVER_ERROR,
      error: e.message
    });
  };
};

module.exports = errorHandler;
