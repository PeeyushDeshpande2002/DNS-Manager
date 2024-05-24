import express from 'express'; 
const dnsRecordRouter = express.Router();
import {authMiddleware} from "../middleware/auth-middleware.js";
import { createDnsRecord, deleteDnsRecord, getHostedZones, updateDnsRecord } from '../controllers/dns-record-controller.js';
import Route53 from "aws-sdk/clients/route53.js";

dnsRecordRouter.route("/hostedzone/:id").get(getHostedZones);
dnsRecordRouter.route("/hostedzone/:id/createDns").post(createDnsRecord);
dnsRecordRouter.route("/hostedzone/:id/update").put(updateDnsRecord);
dnsRecordRouter.route("/hostedzone/:id/delete").delete(deleteDnsRecord);

export default dnsRecordRouter;