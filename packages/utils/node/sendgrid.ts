import sendgridLib from '@sendgrid/mail';
import { sendgridKey } from './rootenv';

sendgridLib.setApiKey(sendgridKey);

export const sendgrid = sendgridLib;
