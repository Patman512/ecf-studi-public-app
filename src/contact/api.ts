import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { SendEmailParams } from './types';

export const sendEmail = (params: SendEmailParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'sendemailfromcontactform', data: params }, errorOnly(cb));
};
