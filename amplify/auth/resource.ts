import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome! Verify your email!",
    },
    externalProviders: {
      callbackUrls: ["https://main.d3exkpgsr1867b.amplifyapp.com/"],
      logoutUrls: ["https://main.d3exkpgsr1867b.amplifyapp.com/"],
      saml: {
        metadata: {
          metadataType: "URL",
          metadataContent:
            "https://dev-04704684.okta.com/app/exkgsxnb85xTvUkPR5d7/sso/saml/metadata",
        },
        attributeMapping: {
          email:
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
        },
        name: "oktaa-test",
      },
    },
  },
});
