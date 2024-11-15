import type { NangoAction, Customer, CustomerId, ProxyConfiguration } from '../../models';
import { getCompany } from '../utils/getCompany.js';

export default async function runAction(nango: NangoAction, input: CustomerId): Promise<Customer> {
    // Integration code goes here

    if (!input || !input.id) {
        throw new nango.ActionError({
            message: 'Customer ID is required'
        });
    }

    const companyId = await getCompany(nango);

    const config: ProxyConfiguration = {
        // https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/customer
        endpoint: `/v3/company/${companyId}/customer/${input.id}?minorversion=73`,
        retries: 10
    }

    try {
        const response = await nango.get(config);

        await nango.log('Successfully read customer');
        
        return response.data['Customer'];

        

    } catch (error: any) {
        throw new nango.ActionError({
            message: 'Error reading customer',
            details: {
                message: error?.message,
                method: error?.config?.method,
                url: error?.config?.url,
                code: error?.code
            }
        });
    }
}
