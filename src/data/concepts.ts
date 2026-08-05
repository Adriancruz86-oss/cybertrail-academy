import type { ConceptRecord } from '../types'

export const concepts: Record<string, ConceptRecord> = {
  asset: {
    conceptId: 'asset',
    name: 'Asset',
    fullName: 'Valuable resource',
    domain: 'threats-vulnerabilities-mitigations',
    plainDefinition: 'Anything worth protecting for the organization.',
    technicalDefinition: 'A system, device, process, data, or capability that supports operations and has value.',
    whyItExists: 'To help analysts identify what needs protection.',
    relatedConcepts: ['threat', 'vulnerability', 'risk', 'security-control'],
    commonMisconceptions: ['Only physical equipment is an asset.']
  },
  threat: {
    conceptId: 'threat',
    name: 'Threat',
    fullName: 'Threat actor or event',
    domain: 'threats-vulnerabilities-mitigations',
    plainDefinition: 'Something that can harm an asset.',
    technicalDefinition: 'A potential cause of an unwanted incident that may result in harm to a system or organization.',
    whyItExists: 'To distinguish danger from the things being protected.',
    relatedConcepts: ['asset', 'vulnerability', 'risk', 'security-control'],
    commonMisconceptions: ['A threat is the same as a vulnerability.']
  },
  vulnerability: {
    conceptId: 'vulnerability',
    name: 'Vulnerability',
    fullName: 'Weakness',
    domain: 'threats-vulnerabilities-mitigations',
    plainDefinition: 'A weakness attackers can exploit.',
    technicalDefinition: 'A flaw or gap in a system that could be used to breach security or cause harm.',
    whyItExists: 'To show where defenses need to improve.',
    relatedConcepts: ['asset', 'threat', 'risk', 'security-control'],
    commonMisconceptions: ['A vulnerability is an attack.']
  },
  risk: {
    conceptId: 'risk',
    name: 'Risk',
    fullName: 'Potential loss',
    domain: 'threats-vulnerabilities-mitigations',
    plainDefinition: 'The chance that a threat exploits a vulnerability.',
    technicalDefinition: 'The likelihood and impact of a threat exploiting a vulnerability.',
    whyItExists: 'To help prioritize what should be fixed first.',
    relatedConcepts: ['asset', 'threat', 'vulnerability', 'security-control'],
    commonMisconceptions: ['Risk equals likelihood only.']
  },
  'security-control': {
    conceptId: 'security-control',
    name: 'Security control',
    fullName: 'Defense mechanism',
    domain: 'security-architecture',
    plainDefinition: 'Something put in place to reduce risk.',
    technicalDefinition: 'A safeguard or countermeasure that reduces risk by preventing, detecting, or mitigating threats.',
    whyItExists: 'To make systems safer in a measurable way.',
    relatedConcepts: ['risk', 'asset', 'firewall-rule', 'least-functionality'],
    commonMisconceptions: ['Controls always stop every attack.']
  },
  https: {
    conceptId: 'https',
    name: 'HTTPS',
    fullName: 'Hypertext Transfer Protocol Secure',
    domain: 'public-web',
    plainDefinition: 'Secure website traffic.',
    technicalDefinition: 'HTTP over TLS that encrypts data between a client and server.',
    whyItExists: 'To protect web traffic from interception and tampering.',
    relatedConcepts: ['tcp-443', 'firewall-rule', 'certificate'],
    commonMisconceptions: ['HTTPS only protects the login page.']
  },
  'tcp-443': {
    conceptId: 'tcp-443',
    name: 'TCP 443',
    fullName: 'TCP port 443',
    domain: 'public-web',
    plainDefinition: 'The standard port for secure web traffic.',
    technicalDefinition: 'A transport-layer port used by HTTPS connections.',
    whyItExists: 'To route secure web traffic through firewalls and routers.',
    relatedConcepts: ['https', 'firewall-rule', 'inbound-traffic'],
    commonMisconceptions: ['HTTPS uses any random port.']
  },
  'firewall-rule': {
    conceptId: 'firewall-rule',
    name: 'Firewall rule',
    fullName: 'Network access control rule',
    domain: 'gateway-district',
    plainDefinition: 'A rule that decides which traffic is allowed.',
    technicalDefinition: 'A defined policy entry specifying allowed or denied traffic based on port, protocol, direction, and source/destination.',
    whyItExists: 'To let necessary traffic through while blocking riskier connections.',
    relatedConcepts: ['tcp-443', 'inbound-traffic', 'least-functionality'],
    commonMisconceptions: ['All open ports are safe if they are monitored.']
  },
  'inbound-traffic': {
    conceptId: 'inbound-traffic',
    name: 'Inbound traffic',
    fullName: 'Traffic entering a network',
    domain: 'gateway-district',
    plainDefinition: 'Data coming from the internet to the organization.',
    technicalDefinition: 'Network packets that originate outside the protected environment and are directed toward internal systems.',
    whyItExists: 'To separate external connections from internal systems.',
    relatedConcepts: ['firewall-rule', 'tcp-443', 'allowlisting'],
    commonMisconceptions: ['Inbound traffic always means an attack.']
  },
  'attack-surface': {
    conceptId: 'attack-surface',
    name: 'Attack surface',
    fullName: 'All exposed paths to attack',
    domain: 'general-security-concepts',
    plainDefinition: 'The places an attacker can try to enter.',
    technicalDefinition: 'The sum of all points where an unauthorized user can try to access data or systems.',
    whyItExists: 'To explain why limiting access reduces risk.',
    relatedConcepts: ['least-functionality', 'allowlisting', 'firewall-rule'],
    commonMisconceptions: ['More features always mean more security.']
  },
  'least-functionality': {
    conceptId: 'least-functionality',
    name: 'Least functionality',
    fullName: 'Minimal access rule',
    domain: 'security-architecture',
    plainDefinition: 'Only allow what is needed.',
    technicalDefinition: 'A security principle that limits systems and rules to the minimum required for business use.',
    whyItExists: 'To reduce unnecessary exposure.',
    relatedConcepts: ['attack-surface', 'allowlisting', 'implicit-deny'],
    commonMisconceptions: ['Least functionality is the same as disabling all access.']
  },
  'implicit-deny': {
    conceptId: 'implicit-deny',
    name: 'Implicit deny',
    fullName: 'Default deny rule',
    domain: 'security-architecture',
    plainDefinition: 'If it is not explicitly allowed, it is blocked.',
    technicalDefinition: 'A firewall or access-control policy that denies traffic by default unless a rule explicitly allows it.',
    whyItExists: 'To make access rules safer by default.',
    relatedConcepts: ['least-functionality', 'firewall-rule', 'allowlisting'],
    commonMisconceptions: ['Implicit deny means no traffic can flow.']
  },
  allowlisting: {
    conceptId: 'allowlisting',
    name: 'Allowlisting',
    fullName: 'Permit-only list',
    domain: 'security-architecture',
    plainDefinition: 'Only approved items can run or connect.',
    technicalDefinition: 'A security approach that allows only explicitly permitted applications, users, or network traffic.',
    whyItExists: 'To reduce risk by denying unknown or unnecessary items.',
    relatedConcepts: ['implicit-deny', 'least-functionality', 'firewall-rule'],
    commonMisconceptions: ['Allowlisting is the same as blacklisting.']
  },
  certificate: {
    conceptId: 'certificate', name: 'Digital certificate', fullName: 'Public key certificate', domain: 'public-web',
    plainDefinition: 'A signed digital identity document for a site or system.',
    technicalDefinition: 'A signed binding between an identity and a public key.', whyItExists: 'To let clients verify who they are communicating with.',
    relatedConcepts: ['certificate-authority', 'certificate-subject', 'trust-chain', 'https'], commonMisconceptions: ['A certificate encrypts all data by itself.']
  },
  'certificate-authority': {
    conceptId: 'certificate-authority', name: 'Certificate authority', fullName: 'Certificate Authority (CA)', domain: 'public-web',
    plainDefinition: 'A trusted organization that signs certificates.', technicalDefinition: 'An entity that validates identities and cryptographically signs certificates.',
    whyItExists: 'To provide a trusted link between identities and public keys.', relatedConcepts: ['certificate', 'trust-chain', 'certificate-issuer'], commonMisconceptions: ['Every organization should trust every CA.']
  },
  'certificate-subject': {
    conceptId: 'certificate-subject', name: 'Certificate subject', fullName: 'Certificate subject identity', domain: 'public-web',
    plainDefinition: 'The identity the certificate represents.', technicalDefinition: 'The entity identified by the certificate subject and subject alternative names.',
    whyItExists: 'To bind the certificate to the intended site or system.', relatedConcepts: ['certificate', 'domain-validation'], commonMisconceptions: ['The issuer and subject are the same party.']
  },
  'certificate-issuer': {
    conceptId: 'certificate-issuer', name: 'Certificate issuer', fullName: 'Certificate signing issuer', domain: 'public-web',
    plainDefinition: 'The authority that signed the certificate.', technicalDefinition: 'The CA identity whose private key produced the certificate signature.',
    whyItExists: 'To identify the authority vouching for the subject.', relatedConcepts: ['certificate-authority', 'trust-chain'], commonMisconceptions: ['An issuer is always the website owner.']
  },
  'domain-validation': {
    conceptId: 'domain-validation', name: 'Domain validation', fullName: 'Certificate hostname validation', domain: 'public-web',
    plainDefinition: 'Checking that the certificate names the site being visited.', technicalDefinition: 'Matching the requested hostname against the certificate subject alternative names.',
    whyItExists: 'To prevent a valid certificate for one site from impersonating another.', relatedConcepts: ['certificate-subject', 'certificate'], commonMisconceptions: ['Any valid certificate is valid for every domain.']
  },
  'trust-chain': {
    conceptId: 'trust-chain', name: 'Trust chain', fullName: 'Certificate chain of trust', domain: 'public-web',
    plainDefinition: 'The signed path from a site certificate to a trusted root.', technicalDefinition: 'A sequence of signed certificates ending at a locally trusted root CA.',
    whyItExists: 'To make certificate trust verifiable.', relatedConcepts: ['certificate', 'certificate-authority', 'certificate-issuer'], commonMisconceptions: ['Only the site certificate needs to be checked.']
  },
  'certificate-expiration': {
    conceptId: 'certificate-expiration', name: 'Certificate expiration', fullName: 'Certificate validity expiration', domain: 'public-web',
    plainDefinition: 'The date after which a certificate is no longer accepted as valid.', technicalDefinition: 'The end of the certificate validity interval encoded in its notAfter field.',
    whyItExists: 'To limit how long trust in a key and identity can persist.', relatedConcepts: ['certificate-renewal', 'trust'], commonMisconceptions: ['An expired certificate is safe if the site still loads.']
  },
  'certificate-renewal': {
    conceptId: 'certificate-renewal', name: 'Certificate renewal', fullName: 'Certificate renewal and deployment', domain: 'public-web',
    plainDefinition: 'Obtaining and deploying a new valid certificate.', technicalDefinition: 'Issuing a replacement certificate and configuring services to present it with the correct chain.',
    whyItExists: 'To maintain trustworthy service identity after expiration.', relatedConcepts: ['certificate-expiration', 'secure-configuration'], commonMisconceptions: ['Renewal is complete before the certificate is deployed.']
  },
  trust: {
    conceptId: 'trust', name: 'Trust', fullName: 'Certificate trust decision', domain: 'public-web',
    plainDefinition: 'Confidence that an identity claim is valid.', technicalDefinition: 'A decision based on identity matching, validity, signatures, policy, and a trusted chain.',
    whyItExists: 'To prevent connections to unverified systems.', relatedConcepts: ['certificate', 'trust-chain', 'certificate-expiration'], commonMisconceptions: ['Encryption alone proves identity.']
  },
  'secure-configuration': {
    conceptId: 'secure-configuration', name: 'Secure configuration', fullName: 'Secure system configuration', domain: 'security-architecture',
    plainDefinition: 'Settings that preserve required security checks.', technicalDefinition: 'A hardened configuration that enables necessary controls and avoids unsafe bypasses.',
    whyItExists: 'To keep protective controls effective in operation.', relatedConcepts: ['certificate-renewal', 'least-functionality'], commonMisconceptions: ['Disabling a warning fixes its root cause.']
  },
  revocation: {
    conceptId: 'revocation', name: 'Certificate revocation', fullName: 'Digital certificate revocation', domain: 'public-web',
    plainDefinition: 'Invalidating a certificate before it expires.', technicalDefinition: 'Marking a certificate as no longer trustworthy prior to its notAfter date.',
    whyItExists: 'To withdraw trust after compromise or incorrect issuance.', relatedConcepts: ['ocsp', 'crl', 'private-key-compromise'], commonMisconceptions: ['Revocation and expiration are identical.']
  },
  ocsp: {
    conceptId: 'ocsp', name: 'OCSP', fullName: 'Online Certificate Status Protocol', domain: 'public-web',
    plainDefinition: 'An online check for a certificate’s current status.', technicalDefinition: 'A protocol used to query an OCSP responder for certificate revocation status.',
    whyItExists: 'To provide timely certificate-status checks.', relatedConcepts: ['revocation', 'crl'], commonMisconceptions: ['OCSP renews certificates.']
  },
  crl: {
    conceptId: 'crl', name: 'CRL', fullName: 'Certificate Revocation List', domain: 'public-web',
    plainDefinition: 'A published list of revoked certificates.', technicalDefinition: 'A CA-signed list containing serial numbers of certificates revoked before expiration.',
    whyItExists: 'To distribute revocation information without a status query for each certificate.', relatedConcepts: ['revocation', 'ocsp'], commonMisconceptions: ['A CRL lists expired certificates only.']
  },
  'private-key-compromise': {
    conceptId: 'private-key-compromise', name: 'Private-key compromise', fullName: 'Certificate private-key compromise', domain: 'public-web',
    plainDefinition: 'Someone unauthorized may possess the secret signing or identity key.', technicalDefinition: 'Loss of exclusive control over a private key, invalidating confidence in authentication performed with it.',
    whyItExists: 'To identify incidents requiring revocation and key replacement.', relatedConcepts: ['revocation', 'certificate'], commonMisconceptions: ['Issuing a new certificate makes the exposed old key safe.']
  }
}
