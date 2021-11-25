 import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
//import Axios from 'axios'
//import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJUgGNYXYMNfIEMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi12MzJ3eWt0dS51cy5hdXRoMC5jb20wHhcNMjExMTAzMTA1ODMyWhcN
MzUwNzEzMTA1ODMyWjAkMSIwIAYDVQQDExlkZXYtdjMyd3lrdHUudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzLex22v/6Z+s32nO
AX0aokKBzID0yLqZkEaVNnTCBSNvL8ahkw3P5Gyp2AnCChaOw9jZ+PM+Br0zg1Ln
NaQkb3baTWwuQs0U25B7T9spzxQflERY1/xPJ669jPUBRi69+4fGUI41ltGLOLPX
n1JlBtKWoxVJTjyhvkSBTcutKRtwzVU3eZ/s9d1c8zJU+MFk/pplAj92q+lwZwc/
pWFNPU0e6sj+U5xoSXUpdkVJdefcvqcTsSXT03ADUgKSRR3XbXm/bDjLeGEa/6to
A2bl+inE+AibFeBbogUpwuSLLvYoFXZBXSmn4WDBZV4cEH73PECwy1LNVQNQscXa
W8DJRwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSLj2mvsMbz
ehmZO/pevIRJrbvYFTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AAVRzORLbqqwGuzjnm6FC1z3kbv1PO7RLuQAxCzblfH1CV7D4CQsWMB1ZsAJ7Suv
ikEBFUjaZKjqkDXLpYMqlcJ7ROavIuACYgRchM6aw050/qamBSa8PQJDpv1DZyXy
F8UvAjx5r6zLGiQKzMhxEhcLDr7KS+x9/vhOKgxGoRmrP4jvZ21pF9eSyHsRI3aW
TQtRQWmUUABO9wDAQl46R5IAjRjqCwEgTixtNQSYBklaOhwqpa7rUVxAPlpmDyno
YqNreDHQwiwas6lnBisq5KuforPnzI+71nG6THFaeI6sKavPFsyFamZ/T8ZUkDlq
D547LOcK0dMPW4SpRWEGbmQ=
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  //const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, cert, {algorithms: ['RS256']}) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
 