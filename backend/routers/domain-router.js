import express from 'express'; 
const domainRouter = express.Router();
import {authMiddleware} from "../middleware/auth-middleware.js";
import { createHostedZone, deleteHostedZone, getDomains } from '../controllers/domain-controller.js';



domainRouter.route("/allDomains").get(authMiddleware, getDomains);
domainRouter.route("/create").post(authMiddleware, createHostedZone);
domainRouter.route("/delete/:hostedZoneId").delete(authMiddleware, deleteHostedZone);

export default domainRouter;