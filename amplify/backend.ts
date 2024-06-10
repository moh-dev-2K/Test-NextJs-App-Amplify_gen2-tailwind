import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import {
  RestApi,
  Cors,
  LambdaIntegration,
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { testApiFunction } from "./functions/test-api-function/resource";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  testApiFunction,
});

const apiStack = backend.createStack("api-stack");

const testRestApi = new RestApi(apiStack, "rest-api", {
  restApiName: "test-rest-api",
  deploy: true,
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

const lambdaIntegration = new LambdaIntegration(
  backend.testApiFunction.resources.lambda
);

const itemsPath = testRestApi.root.addResource("items", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});

itemsPath.addMethod("GET", lambdaIntegration);
itemsPath.addMethod("POST", lambdaIntegration);
itemsPath.addMethod("DELETE", lambdaIntegration);
itemsPath.addMethod("PUT", lambdaIntegration);

itemsPath.addProxy({
  anyMethod: true,
  defaultIntegration: lambdaIntegration,
});

const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
  cognitoUserPools: [backend.auth.resources.userPool],
});


const booksPath = testRestApi.root.addResource("cognito-auth-path");
booksPath.addMethod("GET", lambdaIntegration, {
  authorizationType: AuthorizationType.COGNITO,
  authorizer: cognitoAuth,
});


const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${testRestApi.arnForExecuteApi("items")}`,
        `${testRestApi.arnForExecuteApi("cognito-auth-path")}`,
      ],
    }),
  ],
});

backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);

backend.addOutput({
  custom: {
    API: {
      [testRestApi.restApiName]: {
        endpoint: testRestApi.url,
        region: Stack.of(testRestApi).region,
        apiName: testRestApi.restApiName,
      },
    },
  },
});
