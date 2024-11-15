# QuickBooks Integration

## Local Development

### Testing Actions

To test the actions locally using Nango CLI's dryrun command:

#### Read Customer

```bash
nango dryrun read-customer --input '{"id": "<customer_id>"}'
```

### Deploying Actions

To deploy actions to different environments:

```bash
# Deploy to dev environment
nango deploy dev

# Deploy to production environment
nango deploy prod
```

Make sure to have the QuickBooks and QuickBooks Sandbox integration configured in both your development and production environments on Nango before deploying. You'll need to set up the OAuth credentials (Client ID and Client Secret) for each environment separately.
