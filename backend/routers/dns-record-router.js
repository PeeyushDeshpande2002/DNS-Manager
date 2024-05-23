import express from 'express'; 
const dnsRecordRouter = express.Router();
import {authMiddleware} from "../middleware/auth-middleware.js";
import { createDnsRecord, deleteDnsRecord, getHostedZones, updateDnsRecord } from '../controllers/dns-record-controller.js';
import Route53 from "aws-sdk/clients/route53.js";

dnsRecordRouter.route("/hostedzones/:hostedzoneId").get(getHostedZones);
dnsRecordRouter.route("/dns/createDns").post(createDnsRecord);
dnsRecordRouter.route("/dns/:dnsRecordId").put(updateDnsRecord);
dnsRecordRouter.route("/dns/:dnsRecordId").get(deleteDnsRecord);

export default dnsRecordRouter;