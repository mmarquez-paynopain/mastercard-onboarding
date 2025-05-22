import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
const client = new CloudFrontClient({ region: 'eu-west-1' });

const distributionId = 'E2Z7JOCZ34M4C0';
const callerReference = `invalidate-${new Date().toISOString()}`;

const params = {
    DistributionId: distributionId,
    InvalidationBatch: {
        Paths: {
            Items: ['/*'],
            Quantity: 1
        },
        CallerReference: callerReference
    }
};

async function createInvalidation() {
    try {
        const command = new CreateInvalidationCommand(params);
        const data = await client.send(command);
        console.log('Invalidation created:', data);
    } catch (err) {
        console.error('Error creating invalidation:', err);
    }
};

createInvalidation();
