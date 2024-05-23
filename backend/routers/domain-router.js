import express from 'express'; 
const domainRouter = express.Router();
import {authMiddleware} from "../middleware/auth-middleware.js";
import { createHostedZone, deleteHostedZone, getDomains } from '../controllers/domain-controller.js';



domainRouter.route("/allDomains").get(getDomains);
domainRouter.route("/create").post(createHostedZone);
domainRouter.route("/delete/:hostedZoneId").delete(deleteHostedZone);

export default domainRouter;