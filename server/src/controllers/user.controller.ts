import { checkRequestParams } from "../utils/utils";
import {
  userRegisterService,
  getAllUsersService,
  userLoginService,
} from "../services/user.services";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { errors } from "../utils/errors";

export function userRegister(req: Request, res: Response): void {
  const params: string[] = ["name", "last_name", "email", "password"];
  if (checkRequestParams(req.body, params)) {
    const user: User = req.body;
    userRegisterService(user).then((response) => {
      if (response.success) {
        res.json({ success: true, message: "Usuario creado con exito" });
      } else {
        res.json({ success: false, message: errors[response.error] });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Parametros insuficientes",
    });
  }
}

export function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  userLoginService(email, password).then((response) => {
    if (response.success) {
      res.json({ success: true, user: response.data });
    } else {
      res.json({ success: false, error: errors[response.error] });
    }
  });
}
