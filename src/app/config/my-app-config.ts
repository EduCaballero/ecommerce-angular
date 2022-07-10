export default {

  // Development

  oidc: {
    clientId: '',
    issuer: 'https://dev-.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
  }

   /*oidc: {
      clientId: '',
      issuer: 'https://dev-.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/login/callback',
      scopes: ['openid', 'profile', 'email']
   }*/

  // Production

  /*oidc: {
      clientId: '0oa1elth11qIhfVoy5d7',
      issuer: 'https://dev-21828114.okta.com/oauth2/default',
      redirectUri: 'https://spring-angular-ecommerce-front.herokuapp.com/login/callback',
      scopes: ['openid', 'profile', 'email']
  }*/


}
