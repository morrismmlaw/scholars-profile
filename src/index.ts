// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi
      .plugin("users-permissions")
      .service("providers-registry")
      .add("hkbu", {
        icon: "",
        enabled: true,
        grantConfig: {
          key: process.env.BU_SCI_CLIENT_ID,
          secret: process.env.BU_SCI_CLIENT_SECRET,
          callback: `${strapi.config.server.url}/auth/hkbu/callback`,
          scope: process.env.BU_SCI_Scope,
          authorize_url: process.env.BU_SCI_Auth,
          access_url: process.env.BU_SCI_TokenURL,
          oauth: 2,
        },
        async authCallback({ accessToken, providers, purest }) {
          // use whatever you want here to get the user info
          console.log("Callback: ", accessToken);
          return {
            username: "test",
            email: "test",
          };
        },
      });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
