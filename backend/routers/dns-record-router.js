import express from 'express'; 
const dnsRecordRouter = express.Router();
import {authMiddleware} from "../middleware/auth-middleware.js";
import { createDnsRecord, deleteDnsRecord, getHostedZones, updateDnsRecord } from '../controllers/dns-record-controller.js';
import Route53 from "aws-sdk/clients/route53.js";

dnsRecordRouter.route("/hostedzone/:id").get(authMiddleware, getHostedZones);
dnsRecordRouter.route("/hostedzone/:id/createDns").post(authMiddleware, createDnsRecord);
dnsRecordRouter.route("/hostedzone/:id/update").put(authMiddleware, updateDnsRecord);
dnsRecordRouter.route("/hostedzone/:id/delete").delete(authMiddleware, deleteDnsRecord);

export default dnsRecordRouter;