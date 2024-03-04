import { ApiVersion, BillingInterval, LATEST_API_VERSION, LogSeverity } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
// import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { PostgreSQLSessionStorage } from '@shopify/shopify-app-session-storage-postgresql'
let { restResources } = await import(
  `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
);

require('dotenv').config()
require('isomorphic-fetch')
// If you want IntelliSense for the rest resources, you should import them directly
// import { restResources } from "@shopify/shopify-api/rest/admin/2022-10";

const pgUser = process.env.POSTGRESQL_USERNAME as string
const pgPassword = process.env.POSTGRESQL_PASSWORD as string
const pgDb = process.env.POSTGRESQL_DATABASE as string
const pgHost = process.env.POSTGRESQL_HOST as string
const hostName = process.env.SERVER_HOST as string
// const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY as string,
    apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY as string,
    hostScheme: 'https',
    hostName: hostName.replace(/^https:\/\//, ''),
    isEmbeddedApp: true,
    apiVersion: ApiVersion.April23,
    restResources,
    logger: {
      level: LogSeverity.Debug,
      timestamps: true,
    },
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new PostgreSQLSessionStorage(`postgres://${pgUser}:${pgPassword}@${pgHost}/${pgDb}`) as any,
});

export default shopify;
