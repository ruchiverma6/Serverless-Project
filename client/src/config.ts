// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'm8qzala0q4'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-v32wyktu.us.auth0.com',            // Auth0 domain
  clientId: 'BU2hyZucR9To1w7WW5JccTF86KTu8TTP',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
