import type { MissionData } from '../types'

export const missions: MissionData[] = [
  {
    missionId: 'splus-c1-m01',
    title: 'Welcome to the SOC',
    description: 'Understand the difference between asset, threat, vulnerability, risk, and control.',
    objectives: ['Inspect SOC examples', 'Learn how these terms are related but not interchangeable.'],
    prerequisites: [],
    concepts: ['asset', 'threat', 'vulnerability', 'risk', 'security-control'],
    briefing: 'Maya welcomes you to the SOC and asks you to learn the language analysts use to describe incidents.',
    investigations: [
      { evidenceId: 'protected-system', title: 'Inspect the protected system', body: 'The database server stores BrightPath student records. The records and the server have value to the organization.', discoveryConcepts: ['asset'] },
      { evidenceId: 'incident-board', title: 'Inspect the incident board', body: 'Ransomware could harm the server, while a missing patch creates a weakness it could exploit.', discoveryConcepts: ['threat', 'vulnerability', 'risk', 'security-control'] }
    ],
    activity: {
      type: 'classification',
      prompt: 'Which of these is the asset?',
      options: [
        {
          id: 'database-server',
          label: 'Database server',
          correct: true,
          explanation: 'Correct. The database server is an asset because it stores valuable records.'
        },
        {
          id: 'ransomware',
          label: 'Ransomware',
          correct: false,
          explanation: 'Ransomware is a threat because it is a harmful actor or event.'
        },
        {
          id: 'missing-patch',
          label: 'Missing patch',
          correct: false,
          explanation: 'A missing patch is a vulnerability because it is a weakness an attacker can exploit.'
        }
      ]
    },
    hint: 'An asset is the valuable thing the organization wants to protect.',
    debrief: 'Assets have value. Threats can cause harm, vulnerabilities are weaknesses, risk combines likelihood and impact, and controls reduce risk.',
    masteryEvidence: [
      {
        conceptId: 'asset',
        evidenceType: 'recognition',
        contextId: 'soc-object-classification',
        firstAttemptRequired: false,
        hintDisqualifies: true,
        independent: false
      }
    ],
    rewards: {
      xp: 70,
      cyberDexEntries: ['asset', 'threat', 'vulnerability', 'risk', 'security-control']
    }
  },
  {
    missionId: 'splus-c1-m02',
    title: 'The Missing Website',
    description: 'External users cannot reach BrightPath Learning. Investigate where access is blocked.',
    objectives: ['Find why the site is unavailable externally', 'Allow the right inbound traffic while keeping the network secure.'],
    prerequisites: ['splus-c1-m01'],
    concepts: ['https', 'tcp-443', 'firewall-rule', 'inbound-traffic', 'least-functionality'],
    briefing: 'BrightPath Learning reports that external users cannot reach its portal. Investigate before changing the firewall.',
    investigations: [
      { evidenceId: 'server-status', title: 'Check the web server', body: 'The server is online and internal users can load the portal.', discoveryConcepts: ['https'] },
      { evidenceId: 'firewall-status', title: 'Check DNS and the firewall', body: 'DNS resolves correctly, but inbound TCP port 443 is blocked at the firewall.', discoveryConcepts: ['tcp-443', 'firewall-rule', 'inbound-traffic', 'least-functionality'] }
    ],
    activity: {
      type: 'configuration',
      prompt: 'Choose the firewall rule that restores external HTTPS access while limiting exposure.',
      options: [
        {
          id: 'allow-443',
          label: 'Allow inbound TCP port 443 only',
          correct: true,
          explanation: 'Correct. HTTPS uses TCP port 443, and allowing only that maintains least functionality.'
        },
        {
          id: 'allow-all',
          label: 'Allow all inbound ports from any source',
          correct: false,
          explanation: 'Opening every port increases the attack surface and is not a good security decision.'
        },
        {
          id: 'block-443',
          label: 'Block inbound TCP port 443',
          correct: false,
          explanation: 'Blocking port 443 would keep HTTPS traffic blocked and prevent the website from working.'
        }
      ]
    },
    hint: 'HTTPS normally reaches a web server over TCP port 443. Change only what the service needs.',
    debrief: 'You restored HTTPS without exposing unrelated services. Narrow inbound rules preserve required access while reducing risk.',
    masteryEvidence: [
      {
        conceptId: 'tcp-443',
        evidenceType: 'application',
        contextId: 'brightpath-outage-port-rule',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      },
      {
        conceptId: 'firewall-rule',
        evidenceType: 'application',
        contextId: 'brightpath-outage-port-rule',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      },
      {
        conceptId: 'least-functionality',
        evidenceType: 'application',
        contextId: 'brightpath-minimal-restoration',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      }
    ],
    rewards: {
      xp: 120,
      cyberDexEntries: ['https', 'tcp-443', 'firewall-rule', 'inbound-traffic', 'least-functionality']
    }
  },
  {
    missionId: 'splus-c1-m03',
    title: 'The Unsafe Shortcut',
    description: 'An employee suggests opening all inbound ports to fix the portal. Choose a safer alternative.',
    objectives: ['Reject the risky shortcut', 'Choose a narrow rule that supports only needed traffic.'],
    prerequisites: ['splus-c1-m02'],
    concepts: ['attack-surface', 'least-functionality', 'implicit-deny', 'allowlisting'],
    briefing: 'The portal is restored, but an employee proposes opening every inbound port as a permanent shortcut.',
    investigations: [
      { evidenceId: 'open-all-proposal', title: 'Review the proposal', body: 'The proposed rule would expose services that BrightPath does not need public users to reach.', discoveryConcepts: ['attack-surface', 'least-functionality'] },
      { evidenceId: 'default-policy', title: 'Review the default policy', body: 'The firewall blocks traffic unless a specific rule allows it. Approved traffic can be allowlisted.', discoveryConcepts: ['implicit-deny', 'allowlisting'] }
    ],
    activity: {
      type: 'configuration',
      prompt: 'What is the better decision?',
      options: [
        {
          id: 'allow-443-only',
          label: 'Allow only inbound HTTPS traffic (TCP 443)',
          correct: true,
          explanation: 'Correct. This follows least functionality and reduces the attack surface.'
        },
        {
          id: 'open-all',
          label: 'Open all inbound ports temporarily',
          correct: false,
          explanation: 'Opening all inbound ports greatly increases the attack surface and is unsafe.'
        },
        {
          id: 'allow-80-443',
          label: 'Allow inbound HTTP and HTTPS',
          correct: false,
          explanation: 'Allowing HTTP is unnecessary for the secure portal and expands exposure.'
        }
      ]
    },
    hint: 'Prefer the smallest change that supports the secure portal and nothing more.',
    debrief: 'Least functionality limits exposure. An implicit-deny policy plus a narrow allow rule supports the portal without opening unnecessary paths.',
    masteryEvidence: [
      {
        conceptId: 'least-functionality',
        evidenceType: 'reasoning',
        contextId: 'unsafe-shortcut-review',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      },
      {
        conceptId: 'attack-surface',
        evidenceType: 'reasoning',
        contextId: 'unsafe-shortcut-review',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      }
    ],
    rewards: {
      xp: 140,
      cyberDexEntries: ['attack-surface', 'least-functionality', 'implicit-deny', 'allowlisting']
    }
  },
  {
    missionId: 'splus-c1-m04',
    title: 'Who Are You?',
    description: 'Inspect the BrightPath certificate and decide whether it establishes the portal identity.',
    objectives: ['Inspect certificate identity fields', 'Trace the certificate to a trusted authority.'],
    prerequisites: ['splus-c1-m03'],
    concepts: ['certificate', 'certificate-authority', 'certificate-subject', 'certificate-issuer', 'domain-validation', 'trust-chain', 'trust'],
    briefing: 'BrightPath is reachable, but Maya asks you to verify that the secure portal is actually presenting the identity users expect.',
    investigations: [
      { evidenceId: 'cert-subject', title: 'Inspect the subject', body: 'The subject alternative name identifies the service this certificate represents.', label: 'Domain', value: 'portal.brightpath.example', discoveryConcepts: ['certificate', 'certificate-subject', 'domain-validation'] },
      { evidenceId: 'cert-issuer', title: 'Inspect the issuer', body: 'The issuer is the certificate authority that validated and signed this identity.', label: 'Issuer', value: 'Cyber World Trusted CA 2', discoveryConcepts: ['certificate-authority', 'certificate-issuer'] },
      { evidenceId: 'cert-validity', title: 'Inspect validity', body: 'The current date falls within the certificate validity period.', label: 'Validity', value: 'Valid for the current date', discoveryConcepts: ['trust'] },
      { evidenceId: 'cert-chain', title: 'Inspect the signature and chain', body: 'The signature verifies through an intermediate CA to a locally trusted root.', label: 'Trust chain', value: 'Site → Intermediate CA → Trusted Root', discoveryConcepts: ['trust-chain'] }
    ],
    activity: {
      type: 'classification', prompt: 'What does this certificate evidence establish?', options: [
        { id: 'identity-binding', label: 'The trusted issuer binds the portal domain to its public key', correct: true, explanation: 'Correct. The matching domain, valid dates, signature, and trusted chain support the portal identity.' },
        { id: 'safe-content', label: 'Every file and script on the portal is harmless', correct: false, explanation: 'A valid certificate supports identity and protected transport; it does not prove all site content is safe.' },
        { id: 'owner-is-ca', label: 'BrightPath itself must be the certificate authority', correct: false, explanation: 'The subject owns the identity, while a trusted issuer signs the certificate.' }
      ]
    },
    hint: 'Compare the requested domain with the subject, then follow the issuer signatures to a trusted root.',
    debrief: 'A certificate is a signed identity document. Trust depends on the matching subject, current validity, verified signatures, and a chain ending at a trusted root.',
    masteryEvidence: [
      { conceptId: 'certificate', evidenceType: 'recognition', contextId: 'guided-certificate-inspection', firstAttemptRequired: false, hintDisqualifies: true, independent: false },
      { conceptId: 'trust', evidenceType: 'recognition', contextId: 'guided-certificate-inspection', firstAttemptRequired: false, hintDisqualifies: true, independent: false }
    ],
    rewards: { xp: 90, cyberDexEntries: ['certificate', 'certificate-authority', 'certificate-subject', 'certificate-issuer', 'domain-validation', 'trust-chain', 'trust'] }
  },
  {
    missionId: 'splus-c1-m05',
    title: 'The Expired Badge',
    description: 'Respond safely when the BrightPath certificate expires.',
    objectives: ['Identify the expired certificate', 'Restore trust without bypassing validation.'],
    prerequisites: ['splus-c1-m04'],
    concepts: ['certificate-expiration', 'certificate-renewal', 'trust', 'secure-configuration'],
    briefing: 'Users now receive a certificate warning. A coworker suggests disabling validation until the warning disappears.',
    investigations: [
      { evidenceId: 'expired-validity', title: 'Check the validity period', body: 'The certificate notAfter date is yesterday. The browser is correctly rejecting it.', label: 'Status', value: 'Expired', discoveryConcepts: ['certificate-expiration', 'trust'] },
      { evidenceId: 'server-config', title: 'Check the web-server configuration', body: 'The server still presents the expired certificate and its old chain.', label: 'Deployed certificate', value: 'Old certificate', discoveryConcepts: ['secure-configuration', 'certificate-renewal'] }
    ],
    activity: {
      type: 'configuration', prompt: 'What is the safe corrective action?', options: [
        { id: 'renew-deploy-verify', label: 'Renew and deploy a valid certificate, then verify its domain and trust chain', correct: true, explanation: 'Correct. This fixes the expired identity credential while preserving certificate validation.' },
        { id: 'disable-validation', label: 'Disable browser certificate validation', correct: false, explanation: 'Disabling validation removes the control that detects expired or impersonated identities.' },
        { id: 'switch-http', label: 'Switch the portal to HTTP', correct: false, explanation: 'HTTP removes protected transport and does not repair the identity problem.' },
        { id: 'ignore-warning', label: 'Tell users to ignore the warning permanently', correct: false, explanation: 'Ignoring a valid warning trains users to accept unsafe connections and leaves the root cause unresolved.' }
      ]
    },
    hint: 'Fix the expired identity credential at the server while keeping browser validation enabled.',
    debrief: 'Expiration limits how long a key and identity remain trusted. Renewal is complete only after the valid replacement and correct chain are deployed and verified.',
    masteryEvidence: [
      { conceptId: 'trust', evidenceType: 'application', contextId: 'expired-certificate-remediation', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'secure-configuration', evidenceType: 'application', contextId: 'expired-certificate-remediation', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'certificate-expiration', evidenceType: 'application', contextId: 'expired-certificate-remediation', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 150, cyberDexEntries: ['certificate-expiration', 'certificate-renewal', 'trust', 'secure-configuration'] }
  },
  {
    missionId: 'splus-c1-m06',
    title: 'The Revoked Certificate',
    description: 'Respond when BrightPath may have lost control of its certificate private key.',
    objectives: ['Recognize private-key compromise', 'Revoke the affected certificate and restore trust.'],
    prerequisites: ['splus-c1-m05'],
    concepts: ['revocation', 'ocsp', 'crl', 'private-key-compromise', 'trust'],
    briefing: 'Monitoring shows the portal private key may have been copied. The certificate has not expired, but its identity proof can no longer be trusted.',
    investigations: [
      { evidenceId: 'key-copy-alert', title: 'Review the key alert', body: 'An unauthorized process exported the private key from the web server.', label: 'Incident', value: 'Probable private-key compromise', discoveryConcepts: ['private-key-compromise', 'trust'] },
      { evidenceId: 'certificate-status', title: 'Check certificate status options', body: 'The CA can publish revocation through OCSP responses and a certificate revocation list.', label: 'Status channels', value: 'OCSP and CRL', discoveryConcepts: ['revocation', 'ocsp', 'crl'] }
    ],
    activity: {
      type: 'configuration', prompt: 'What complete response restores trustworthy identity?', options: [
        { id: 'revoke-rekey-replace', label: 'Revoke the certificate, generate a new private key, deploy a replacement, and verify status publication', correct: true, explanation: 'Correct. Revocation withdraws trust from the exposed key while a new key and certificate restore identity safely.' },
        { id: 'renew-only', label: 'Renew the certificate using the same private key', correct: false, explanation: 'A new certificate does not make a compromised private key secret again.' },
        { id: 'wait-expiration', label: 'Keep using it until its expiration date', correct: false, explanation: 'A compromised key can be abused immediately; waiting preserves a known identity risk.' },
        { id: 'ocsp-renews', label: 'Use OCSP to renew the certificate automatically', correct: false, explanation: 'OCSP communicates certificate status. It does not renew certificates or replace exposed keys.' }
      ]
    },
    hint: 'Withdraw trust from the old certificate and ensure the replacement uses a new secret key.',
    debrief: 'Private-key compromise requires revocation, a new key pair, and a replacement certificate. OCSP and CRLs help relying systems learn that the old certificate is no longer trusted.',
    masteryEvidence: [
      { conceptId: 'trust', evidenceType: 'reasoning', contextId: 'private-key-compromise-response', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'revocation', evidenceType: 'reasoning', contextId: 'private-key-compromise-response', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'private-key-compromise', evidenceType: 'reasoning', contextId: 'private-key-compromise-response', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 180, cyberDexEntries: ['revocation', 'ocsp', 'crl', 'private-key-compromise', 'trust'] }
  },
  {
    missionId: 'splus-c1-m07',
    title: 'Secure the Conversation',
    description: 'Match each communication-security job to the technology designed to perform it.',
    objectives: ['Distinguish encryption from hashing and authentication', 'Build a secure communication toolkit.'],
    prerequisites: ['splus-c1-m06'],
    concepts: ['symmetric-encryption', 'asymmetric-cryptography', 'aes', 'ecdhe', 'hmac', 'hashing', 'certificate'],
    briefing: 'BrightPath is upgrading its secure communications. Maya asks you to assign the right cryptographic tool to each job instead of treating every tool as interchangeable.',
    investigations: [
      { evidenceId: 'crypto-toolkit', title: 'Review the cryptographic toolkit', body: 'The toolkit contains AES, ECDHE, HMAC, certificates, and cryptographic hash functions. Each has a distinct job.', label: 'Rule', value: 'Choose by security function, not by acronym', discoveryConcepts: ['symmetric-encryption', 'asymmetric-cryptography', 'aes', 'ecdhe', 'hmac', 'hashing'] },
      { evidenceId: 'identity-layer', title: 'Review the identity layer', body: 'The existing certificate binds the BrightPath identity to its public key and trusted issuer.', label: 'Identity tool', value: 'Digital certificate', discoveryConcepts: ['certificate'] }
    ],
    activity: {
      type: 'configuration', prompt: 'Which tool should protect large amounts of session data efficiently?', options: [
        { id: 'bulk-aes', label: 'AES symmetric encryption', correct: true, explanation: 'Correct. AES efficiently protects bulk data after a session key is established.' },
        { id: 'bulk-ecdhe', label: 'ECDHE', correct: false, explanation: 'ECDHE establishes a shared secret; it is not the bulk data cipher.' },
        { id: 'bulk-hash', label: 'A one-way hash', correct: false, explanation: 'A hash fingerprints data but does not provide reversible confidentiality.' }
      ]
    },
    activities: [
      { type: 'configuration', prompt: 'Which tool should protect large amounts of session data efficiently?', options: [
        { id: 'bulk-aes', label: 'AES symmetric encryption', correct: true, explanation: 'Correct. AES efficiently protects bulk data after a session key is established.' },
        { id: 'bulk-ecdhe', label: 'ECDHE', correct: false, explanation: 'ECDHE establishes a shared secret; it is not the bulk data cipher.' },
        { id: 'bulk-hash', label: 'A one-way hash', correct: false, explanation: 'A hash fingerprints data but does not provide reversible confidentiality.' }
      ] },
      { type: 'configuration', prompt: 'Which tool should establish an ephemeral shared session secret?', options: [
        { id: 'key-ecdhe', label: 'ECDHE key agreement', correct: true, explanation: 'Correct. ECDHE establishes an ephemeral shared secret and supports forward secrecy.' },
        { id: 'key-aes', label: 'AES by itself', correct: false, explanation: 'AES uses a shared secret but does not establish that secret between new parties.' },
        { id: 'key-hmac', label: 'HMAC', correct: false, explanation: 'HMAC authenticates and checks integrity with an existing shared secret.' }
      ] },
      { type: 'configuration', prompt: 'Which tool checks integrity and authenticity when both parties share a secret?', options: [
        { id: 'integrity-hmac', label: 'HMAC', correct: true, explanation: 'Correct. HMAC combines a secret key with hashing to authenticate a message and detect changes.' },
        { id: 'integrity-aes', label: 'AES alone', correct: false, explanation: 'Encryption alone does not provide the specific shared-secret message-authentication function requested.' },
        { id: 'integrity-cert', label: 'A certificate alone', correct: false, explanation: 'A certificate supports identity and trust but does not authenticate each message by itself.' }
      ] },
      { type: 'classification', prompt: 'Which tool creates a one-way digest for comparing data?', options: [
        { id: 'digest-hash', label: 'Cryptographic hashing', correct: true, explanation: 'Correct. Hashing produces a fixed-size, one-way digest.' },
        { id: 'digest-ecdhe', label: 'ECDHE', correct: false, explanation: 'ECDHE establishes keys; it does not create a general-purpose data digest.' },
        { id: 'digest-aes', label: 'AES encryption', correct: false, explanation: 'AES ciphertext is reversible with the key and is not a one-way digest.' }
      ] }
    ],
    hint: 'Name the security job first: bulk confidentiality, key agreement, shared-secret authenticity, or one-way digest.',
    debrief: 'Secure systems combine specialized tools: ECDHE establishes a secret, AES protects bulk data, HMAC authenticates messages with a shared secret, hashing creates digests, and certificates support identity.',
    masteryEvidence: [
      { conceptId: 'aes', evidenceType: 'application', contextId: 'crypto-bulk-protection', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'symmetric-encryption', evidenceType: 'application', contextId: 'crypto-bulk-protection', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'ecdhe', evidenceType: 'application', contextId: 'crypto-key-agreement', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'asymmetric-cryptography', evidenceType: 'application', contextId: 'crypto-key-agreement', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'hmac', evidenceType: 'application', contextId: 'crypto-message-authentication', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 },
      { conceptId: 'hashing', evidenceType: 'application', contextId: 'crypto-one-way-digest', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 3 }
    ],
    rewards: { xp: 220, cyberDexEntries: ['symmetric-encryption', 'asymmetric-cryptography', 'aes', 'ecdhe', 'hmac', 'hashing', 'certificate'] }
  },
  {
    missionId: 'splus-c1-m08',
    title: 'The Fake Login Page',
    description: 'Investigate a cloned BrightPath login page before more credentials are stolen.',
    objectives: ['Identify phishing indicators', 'Report and contain the credential-harvesting attempt.'],
    prerequisites: ['splus-c1-m07'],
    concepts: ['phishing', 'credential-harvesting', 'typosquatting', 'awareness-training', 'incident-reporting'],
    briefing: 'Employees received an urgent message claiming their BrightPath accounts will be disabled. The link opens a familiar-looking login page.',
    investigations: [
      { evidenceId: 'phish-sender', title: 'Inspect the sender and urgency', body: 'The display name says BrightPath Support, but the sender uses an unrelated domain and threatens immediate suspension.', label: 'Sender', value: 'support@brightpath-alerts.example', discoveryConcepts: ['phishing', 'awareness-training'] },
      { evidenceId: 'phish-domain', title: 'Inspect the link destination', body: 'The link text looks legitimate, but the destination swaps letters in the BrightPath domain.', label: 'Destination', value: 'brlghtpath-login.example', discoveryConcepts: ['typosquatting', 'credential-harvesting'] },
      { evidenceId: 'phish-form', title: 'Inspect the login form', body: 'The cloned page sends submitted credentials to an unapproved external service.', label: 'Purpose', value: 'Credential harvesting', discoveryConcepts: ['credential-harvesting', 'incident-reporting'] }
    ],
    activity: { type: 'configuration', prompt: 'What is the best immediate response?', options: [
      { id: 'report-contain', label: 'Report through the security channel, preserve evidence, block the destination, and warn affected users', correct: true, explanation: 'Correct. This preserves evidence, starts coordinated containment, and helps protect other employees.' },
      { id: 'delete-only', label: 'Delete your copy and take no further action', correct: false, explanation: 'Deleting one copy does not protect other recipients or preserve evidence for investigation.' },
      { id: 'test-login', label: 'Enter a test password to see whether the page accepts it', correct: false, explanation: 'Submitting credentials interacts with an untrusted system and is unnecessary once the indicators establish the risk.' },
      { id: 'reply-sender', label: 'Reply to the sender and ask whether the message is real', correct: false, explanation: 'Replying uses an attacker-controlled channel and may confirm that the address is active.' }
    ] },
    hint: 'Use the approved reporting path and contain the malicious destination without interacting with the fake form.',
    debrief: 'Phishing succeeds through trust, urgency, and convincing imitation. Checking the real sender and destination exposes typosquatting and credential harvesting; reporting enables coordinated containment.',
    masteryEvidence: [
      { conceptId: 'phishing', evidenceType: 'reasoning', contextId: 'cloned-login-investigation', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'credential-harvesting', evidenceType: 'reasoning', contextId: 'cloned-login-investigation', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'incident-reporting', evidenceType: 'application', contextId: 'cloned-login-investigation', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 190, cyberDexEntries: ['phishing', 'credential-harvesting', 'typosquatting', 'awareness-training', 'incident-reporting'] }
  },
  {
    missionId: 'splus-c1-m09',
    title: 'The Reused Password',
    description: 'Stop stolen credentials from being reused against BrightPath accounts.',
    objectives: ['Recognize credential-stuffing evidence', 'Choose layered authentication controls.'],
    prerequisites: ['splus-c1-m08'],
    concepts: ['credential-stuffing', 'password-reuse', 'mfa', 'authentication-logs', 'account-lockout'],
    briefing: 'BrightPath authentication logs show bursts of sign-in attempts using valid employee email addresses and passwords leaked from another service.',
    investigations: [
      { evidenceId: 'login-burst', title: 'Inspect authentication logs', body: 'Many accounts receive a small number of attempts from rotating sources. Some attempts succeed on the first try.', label: 'Pattern', value: 'Known credentials tested across accounts', discoveryConcepts: ['authentication-logs', 'credential-stuffing'] },
      { evidenceId: 'reuse-confirmed', title: 'Interview an affected user', body: 'The user confirms that the same password was used on the unrelated breached service.', label: 'Risk', value: 'Password reuse', discoveryConcepts: ['password-reuse'] },
      { evidenceId: 'control-review', title: 'Review identity controls', body: 'MFA is optional and the lockout policy can be abused to deny access if thresholds are too aggressive.', label: 'Control options', value: 'MFA, resets, monitoring, risk-based throttling', discoveryConcepts: ['mfa', 'account-lockout'] }
    ],
    activity: { type: 'configuration', prompt: 'Which response best contains the attack without creating a broad lockout outage?', options: [
      { id: 'layered-response', label: 'Reset affected passwords, require MFA, revoke sessions, monitor logs, and apply risk-based throttling', correct: true, explanation: 'Correct. This removes stolen-password access, adds another factor, ends active sessions, and slows abuse without indiscriminately locking every account.' },
      { id: 'permanent-lockout', label: 'Permanently lock every account after one failed login', correct: false, explanation: 'An attacker could deny service to users with a single failed attempt; lockout controls require a usability and availability balance.' },
      { id: 'longer-password-only', label: 'Ask users to make the reused password longer but keep using it', correct: false, explanation: 'A known stolen password remains compromised regardless of length.' },
      { id: 'ignore-success', label: 'Ignore successful logins and investigate failures only', correct: false, explanation: 'Successful use of stolen credentials is the most important compromise evidence in this incident.' }
    ] },
    hint: 'Remove the exposed secrets, add a factor the attacker does not possess, end existing sessions, and avoid a denial-of-service lockout policy.',
    debrief: 'Credential stuffing reuses credentials stolen elsewhere. Unique passwords, MFA, session revocation, authentication monitoring, and balanced throttling reduce the attack without turning lockout into an availability problem.',
    masteryEvidence: [
      { conceptId: 'credential-stuffing', evidenceType: 'reasoning', contextId: 'reused-password-attack', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'mfa', evidenceType: 'application', contextId: 'reused-password-attack', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'account-lockout', evidenceType: 'reasoning', contextId: 'reused-password-attack', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 210, cyberDexEntries: ['credential-stuffing', 'password-reuse', 'mfa', 'authentication-logs', 'account-lockout'] }
  },
  {
    missionId: 'splus-c1-m10',
    title: 'The 2 A.M. Login',
    description: 'Investigate two distant sign-ins that appear physically impossible.',
    objectives: ['Evaluate impossible-travel evidence', 'Use context before declaring account compromise.'],
    prerequisites: ['splus-c1-m09'],
    concepts: ['impossible-travel', 'behavioral-analytics', 'account-compromise', 'security-context', 'false-positive', 'authentication-logs'],
    briefing: 'At 2 A.M., BrightPath flags the same account in New York and London only twelve minutes apart. Maya asks for a risk-based response, not an automatic verdict.',
    investigations: [
      { evidenceId: 'travel-logins', title: 'Compare the sign-ins', body: 'Both attempts used the correct password. The London event followed the New York event twelve minutes later.', label: 'Travel time', value: 'Physically impossible', discoveryConcepts: ['impossible-travel', 'authentication-logs'] },
      { evidenceId: 'device-context', title: 'Compare device context', body: 'New York used the employee laptop and normal browser. London used an unknown device with a new session cookie.', label: 'Device match', value: 'No', discoveryConcepts: ['behavioral-analytics', 'security-context'] },
      { evidenceId: 'network-context', title: 'Check network and user context', body: 'The employee is not using the corporate VPN and confirms they are asleep in New York.', label: 'User confirmation', value: 'London sign-in not recognized', discoveryConcepts: ['account-compromise', 'false-positive'] }
    ],
    activity: { type: 'configuration', prompt: 'What is the best response to the combined evidence?', options: [
      { id: 'contain-verify', label: 'Revoke sessions, require credential reset and MFA verification, preserve logs, and investigate the unknown device', correct: true, explanation: 'Correct. The impossible timing plus device, network, and user context supports compromise and warrants contained, evidence-preserving action.' },
      { id: 'ignore-anomaly', label: 'Ignore the alert because geolocation is never exact', correct: false, explanation: 'Geolocation can be imperfect, but the unknown device and user confirmation independently increase the compromise risk.' },
      { id: 'travel-proves', label: 'Declare compromise from distance alone without checking context', correct: false, explanation: 'Impossible travel is an indicator, not proof. VPNs, mobile networks, and location errors can produce false positives.' },
      { id: 'lock-company', label: 'Disable every BrightPath account immediately', correct: false, explanation: 'The evidence concerns one account. Organization-wide lockout is disproportionate and harms availability.' }
    ] },
    hint: 'Combine time and location with device, network, session, and user-confirmation context.',
    debrief: 'Impossible travel is a useful behavioral signal, but context determines meaning. Here, the unknown device and user confirmation support account-compromise containment rather than a false-positive dismissal.',
    masteryEvidence: [
      { conceptId: 'impossible-travel', evidenceType: 'reasoning', contextId: 'two-city-authentication', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'behavioral-analytics', evidenceType: 'reasoning', contextId: 'two-city-authentication', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'account-compromise', evidenceType: 'application', contextId: 'two-city-authentication', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 220, cyberDexEntries: ['impossible-travel', 'behavioral-analytics', 'account-compromise', 'security-context', 'false-positive', 'authentication-logs'] }
  },
  {
    missionId: 'splus-c1-m11',
    title: 'Strange Database Requests',
    description: 'Respond to suspicious web requests attempting to alter database queries.',
    objectives: ['Recognize SQL-injection evidence', 'Fix the vulnerable query and preserve detection visibility.'],
    prerequisites: ['splus-c1-m10'],
    concepts: ['sql-injection', 'input-validation', 'parameterized-queries', 'waf', 'security-logging'],
    briefing: 'BrightPath logs show unusual characters and SQL keywords in a search parameter. The database returned records that the requesting user should not see.',
    investigations: [
      { evidenceId: 'injection-request', title: 'Inspect the web request', body: 'The search parameter contains a quote, a tautology, and a comment sequence designed to change query logic.', label: 'Input fragment', value: "' OR 1=1 --", discoveryConcepts: ['sql-injection', 'input-validation'] },
      { evidenceId: 'query-code', title: 'Inspect application code', body: 'The application concatenates raw request input directly into the SQL command string.', label: 'Query construction', value: 'String concatenation', discoveryConcepts: ['parameterized-queries'] },
      { evidenceId: 'control-coverage', title: 'Inspect controls and logs', body: 'The WAF recorded but did not block the pattern. Application and database logs preserve the affected request and response.', label: 'Current controls', value: 'Detection only', discoveryConcepts: ['waf', 'security-logging'] }
    ],
    activity: { type: 'configuration', prompt: 'Which response fixes the root cause while supporting containment and investigation?', options: [
      { id: 'parameterize-contain', label: 'Use parameterized queries and server-side validation, preserve logs, scope exposure, and tune a temporary WAF rule', correct: true, explanation: 'Correct. Parameterization fixes the query boundary, validation enforces expected input, logs support scope, and the WAF can provide temporary protection.' },
      { id: 'waf-only', label: 'Add one WAF signature and leave the vulnerable code unchanged', correct: false, explanation: 'A WAF is useful defense in depth, but signatures can be bypassed and do not remove unsafe query construction.' },
      { id: 'hide-errors', label: 'Hide database errors from users without changing the query', correct: false, explanation: 'Reducing error detail may limit information leakage but does not prevent injection.' },
      { id: 'block-quotes', label: 'Delete quotation marks from every request and consider the issue fixed', correct: false, explanation: 'Ad hoc character blocking is brittle. Parameterized queries keep data separate from SQL syntax regardless of encoding tricks.' }
    ] },
    hint: 'Repair the boundary between data and SQL instructions, then use validation, logging, and the WAF as supporting layers.',
    debrief: 'SQL injection occurs when untrusted data becomes executable query syntax. Parameterized queries address the root cause; server-side validation, logging, scoping, and WAF tuning add defense and response support.',
    masteryEvidence: [
      { conceptId: 'sql-injection', evidenceType: 'reasoning', contextId: 'brightpath-search-injection', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'parameterized-queries', evidenceType: 'application', contextId: 'brightpath-search-injection', firstAttemptRequired: true, hintDisqualifies: true, independent: true },
      { conceptId: 'input-validation', evidenceType: 'application', contextId: 'brightpath-search-injection', firstAttemptRequired: true, hintDisqualifies: true, independent: true }
    ],
    rewards: { xp: 240, cyberDexEntries: ['sql-injection', 'input-validation', 'parameterized-queries', 'waf', 'security-logging'] }
  },
  {
    missionId: 'splus-c1-m12',
    title: 'The Alert Flood',
    description: 'Classify SIEM outcomes and improve detection without hiding dangerous gaps.',
    objectives: ['Classify positive and negative detection outcomes', 'Prioritize and tune alerts using risk.'],
    prerequisites: ['splus-c1-m11'],
    concepts: ['alert-quality', 'true-positive', 'false-positive', 'true-negative', 'false-negative', 'alert-tuning', 'detection-risk', 'analyst-prioritization'],
    briefing: 'The BrightPath SIEM produces a flood of mixed-quality alerts. Maya asks you to classify outcomes before changing any detection rules.',
    investigations: [
      { evidenceId: 'alert-volume', title: 'Review alert volume', body: 'Analysts receive hundreds of events, but severity and context do not consistently match actual risk.', label: 'Problem', value: 'High volume, uneven quality', discoveryConcepts: ['alert-quality', 'analyst-prioritization'] },
      { evidenceId: 'detection-matrix', title: 'Review the detection matrix', body: 'Every outcome depends on two facts: whether the detection fired and whether malicious activity was actually present.', label: 'Outcomes', value: 'TP, FP, TN, FN', discoveryConcepts: ['true-positive', 'false-positive', 'true-negative', 'false-negative'] },
      { evidenceId: 'tuning-risk', title: 'Review tuning risk', body: 'Reducing noise can help analysts, but overly broad exceptions may suppress real attacks.', label: 'Tradeoff', value: 'Noise reduction versus missed detection', discoveryConcepts: ['alert-tuning', 'detection-risk'] }
    ],
    activity: { type: 'classification', prompt: 'A SQL-injection alert fires, and investigation confirms malicious query manipulation. Classify it.', options: [
      { id: 'sql-tp', label: 'True positive', correct: true, explanation: 'Correct. The detection fired and the malicious condition was present.' },
      { id: 'sql-fp', label: 'False positive', correct: false, explanation: 'A false positive fires when the condition is benign, but this activity was confirmed malicious.' },
      { id: 'sql-fn', label: 'False negative', correct: false, explanation: 'A false negative would mean the malicious activity occurred without the expected alert.' },
      { id: 'sql-tn', label: 'True negative', correct: false, explanation: 'A true negative has no alert and no malicious condition.' }
    ] },
    activities: [
      { type: 'classification', prompt: 'A SQL-injection alert fires, and investigation confirms malicious query manipulation. Classify it.', options: [
        { id: 'sql-tp', label: 'True positive', correct: true, explanation: 'Correct. The detection fired and the malicious condition was present.' },
        { id: 'sql-fp', label: 'False positive', correct: false, explanation: 'A false positive fires when the condition is benign, but this activity was confirmed malicious.' },
        { id: 'sql-fn', label: 'False negative', correct: false, explanation: 'A false negative would mean the malicious activity occurred without the expected alert.' },
        { id: 'sql-tn', label: 'True negative', correct: false, explanation: 'A true negative has no alert and no malicious condition.' }
      ] },
      { type: 'classification', prompt: 'An impossible-travel alert fires, but investigation confirms an approved corporate VPN changed the location. Classify it.', options: [
        { id: 'vpn-fp', label: 'False positive', correct: true, explanation: 'Correct. The alert fired, but the investigated activity was benign.' },
        { id: 'vpn-tp', label: 'True positive', correct: false, explanation: 'The condition was explained by an approved VPN, so this was not confirmed malicious activity.' },
        { id: 'vpn-fn', label: 'False negative', correct: false, explanation: 'The system did alert, so this cannot be a negative detection outcome.' },
        { id: 'vpn-tn', label: 'True negative', correct: false, explanation: 'A true negative would not generate an alert.' }
      ] },
      { type: 'classification', prompt: 'A normal employee login occurs, and no risky-authentication alert fires. Classify it.', options: [
        { id: 'normal-tn', label: 'True negative', correct: true, explanation: 'Correct. No alert fired and no malicious condition was present.' },
        { id: 'normal-fn', label: 'False negative', correct: false, explanation: 'A false negative requires malicious activity that the detection missed.' },
        { id: 'normal-tp', label: 'True positive', correct: false, explanation: 'No positive alert occurred.' },
        { id: 'normal-fp', label: 'False positive', correct: false, explanation: 'A false positive requires an alert on benign activity.' }
      ] },
      { type: 'classification', prompt: 'Confirmed data exfiltration occurs, but the expected transfer alert never fires. Classify it.', options: [
        { id: 'exfil-fn', label: 'False negative', correct: true, explanation: 'Correct. Malicious activity was present, but the detection failed to alert.' },
        { id: 'exfil-tn', label: 'True negative', correct: false, explanation: 'A true negative requires that no malicious activity occurred.' },
        { id: 'exfil-tp', label: 'True positive', correct: false, explanation: 'No alert fired, so this cannot be a positive result.' },
        { id: 'exfil-fp', label: 'False positive', correct: false, explanation: 'No alert fired, and the activity was truly malicious.' }
      ] }
    ],
    hint: 'Ask two questions: did the detection fire, and was the malicious condition actually present?',
    debrief: 'Alert classification separates detection output from reality. Tuning should reduce false positives while protecting against false negatives, and analyst priority should reflect credible risk and impact.',
    masteryEvidence: [
      { conceptId: 'alert-quality', evidenceType: 'application', contextId: 'confirmed-sql-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'true-positive', evidenceType: 'application', contextId: 'confirmed-sql-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'analyst-prioritization', evidenceType: 'reasoning', contextId: 'confirmed-sql-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'alert-quality', evidenceType: 'application', contextId: 'vpn-location-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'false-positive', evidenceType: 'application', contextId: 'vpn-location-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'alert-tuning', evidenceType: 'reasoning', contextId: 'vpn-location-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'alert-quality', evidenceType: 'application', contextId: 'normal-login-no-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 },
      { conceptId: 'true-negative', evidenceType: 'application', contextId: 'normal-login-no-alert', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 },
      { conceptId: 'alert-quality', evidenceType: 'reasoning', contextId: 'missed-exfiltration', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 3 },
      { conceptId: 'false-negative', evidenceType: 'reasoning', contextId: 'missed-exfiltration', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 3 },
      { conceptId: 'detection-risk', evidenceType: 'reasoning', contextId: 'missed-exfiltration', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 3 }
    ],
    rewards: { xp: 260, cyberDexEntries: ['alert-quality', 'true-positive', 'false-positive', 'true-negative', 'false-negative', 'alert-tuning', 'detection-risk', 'analyst-prioritization'] }
  },
  {
    missionId: 'splus-c1-m13',
    title: 'Stop the Spread',
    description: 'Contain a compromised web server before the attacker reaches more internal systems.',
    objectives: ['Contain affected systems and accounts', 'Determine scope while preserving evidence', 'Prepare safe eradication.'],
    prerequisites: ['splus-c1-m12'],
    concepts: ['incident-response', 'containment', 'incident-scope', 'evidence-preservation', 'lateral-movement', 'eradication'],
    briefing: 'BrightPath confirms that the compromised portal is communicating with internal systems. Act quickly without destroying the evidence needed to understand the intrusion.',
    investigations: [
      { evidenceId: 'east-west-traffic', title: 'Inspect internal traffic', body: 'The web server opened unusual administrative connections to two application hosts after the injection activity began.', label: 'Risk', value: 'Possible lateral movement', discoveryConcepts: ['lateral-movement', 'incident-scope'] },
      { evidenceId: 'compromised-service-account', title: 'Inspect authentication logs', body: 'A service account used by the portal authenticated to internal systems from the compromised server.', label: 'Identity status', value: 'Credentials potentially compromised', discoveryConcepts: ['containment', 'incident-response'] },
      { evidenceId: 'volatile-evidence', title: 'Inspect response readiness', body: 'Memory, active connections, process details, and centralized logs are still available for collection before destructive remediation.', label: 'Evidence', value: 'Volatile and persistent sources available', discoveryConcepts: ['evidence-preservation', 'eradication'] }
    ],
    activity: { type: 'configuration', prompt: 'What should the response team do first?', options: [
      { id: 'isolate-disable-preserve', label: 'Isolate the server, disable the compromised service account, preserve evidence, and begin scope analysis', correct: true, explanation: 'Correct. This limits further access while preserving the information needed to understand and eradicate the incident.' },
      { id: 'wipe-immediately', label: 'Immediately wipe the server before collecting evidence or checking connected systems', correct: false, explanation: 'Wiping may remove the visible host but can destroy evidence and leave attacker access elsewhere undiscovered.' },
      { id: 'watch-only', label: 'Leave all access active until the complete investigation is finished', correct: false, explanation: 'Waiting for perfect certainty allows additional lateral movement and harm.' },
      { id: 'block-public-only', label: 'Block only public HTTPS while leaving internal sessions and credentials unchanged', correct: false, explanation: 'Public blocking alone does not contain the internal connections or compromised identity.' }
    ] },
    activities: [
      { type: 'configuration', prompt: 'What should the response team do first?', options: [
        { id: 'isolate-disable-preserve', label: 'Isolate the server, disable the compromised service account, preserve evidence, and begin scope analysis', correct: true, explanation: 'Correct. This limits further access while preserving the information needed to understand and eradicate the incident.' },
        { id: 'wipe-immediately', label: 'Immediately wipe the server before collecting evidence or checking connected systems', correct: false, explanation: 'Wiping may remove the visible host but can destroy evidence and leave attacker access elsewhere undiscovered.' },
        { id: 'watch-only', label: 'Leave all access active until the complete investigation is finished', correct: false, explanation: 'Waiting for perfect certainty allows additional lateral movement and harm.' },
        { id: 'block-public-only', label: 'Block only public HTTPS while leaving internal sessions and credentials unchanged', correct: false, explanation: 'Public blocking alone does not contain the internal connections or compromised identity.' }
      ] },
      { type: 'classification', prompt: 'Which evidence best expands the incident scope beyond the original web server?', options: [
        { id: 'correlate-hosts-identities', label: 'Correlate destination hosts, service-account activity, timestamps, and centralized logs', correct: true, explanation: 'Correct. Correlation establishes which systems and identities were touched and when.' },
        { id: 'server-name-only', label: 'Treat the web server hostname as the complete scope', correct: false, explanation: 'The observed internal connections and identity use show that scope may extend beyond the first host.' },
        { id: 'alert-count-only', label: 'Use only the number of SIEM alerts as the affected-system count', correct: false, explanation: 'Alert volume does not directly define the systems, accounts, data, or time period affected.' }
      ] },
      { type: 'configuration', prompt: 'When should eradication begin?', options: [
        { id: 'after-containment-scope', label: 'After adequate containment and scoping, remove persistence, rotate credentials, and remediate the exploited weakness', correct: true, explanation: 'Correct. Eradication should remove the attacker and root cause without overlooking connected compromise.' },
        { id: 'before-evidence', label: 'Before preserving evidence or identifying affected accounts', correct: false, explanation: 'Premature destructive action can hide the scope and prevent a complete response.' },
        { id: 'after-production-return', label: 'Only after the original server has returned to production', correct: false, explanation: 'Recovery before eradication risks returning attacker access to service.' }
      ] }
    ],
    hint: 'Contain active access while preserving evidence, then use correlated data to establish scope before eradication.',
    debrief: 'Effective incident response balances speed with evidence. Containment limits damage, scope identifies every affected system and identity, preservation supports reliable analysis, and eradication removes both attacker access and root cause.',
    masteryEvidence: [
      { conceptId: 'containment', evidenceType: 'application', contextId: 'web-server-containment', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'evidence-preservation', evidenceType: 'reasoning', contextId: 'web-server-containment', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'incident-scope', evidenceType: 'reasoning', contextId: 'lateral-movement-scope', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'lateral-movement', evidenceType: 'application', contextId: 'lateral-movement-scope', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'eradication', evidenceType: 'reasoning', contextId: 'post-containment-eradication', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 }
    ],
    rewards: { xp: 280, cyberDexEntries: ['incident-response', 'containment', 'incident-scope', 'evidence-preservation', 'lateral-movement', 'eradication'] }
  },
  {
    missionId: 'splus-c1-m14',
    title: 'The Backup Decision',
    description: 'Choose a trustworthy recovery point and restore BrightPath within business requirements.',
    objectives: ['Evaluate backup integrity', 'Balance RPO and RTO', 'Validate a clean restoration.'],
    prerequisites: ['splus-c1-m13'],
    concepts: ['backup-integrity', 'recovery-testing', 'rpo', 'rto', 'clean-restoration', 'eradication'],
    briefing: 'Containment is holding, but BrightPath must restore its portal. The newest copy is not necessarily the safest one, and business leaders need an honest recovery estimate.',
    investigations: [
      { evidenceId: 'backup-catalog', title: 'Review recovery points', body: 'The newest backup was created after compromise and is untested. An older backup predates the intrusion and passed its last restoration test.', label: 'Candidates', value: 'Recent untested vs. older tested clean point', discoveryConcepts: ['backup-integrity', 'recovery-testing'] },
      { evidenceId: 'business-objectives', title: 'Review business objectives', body: 'BrightPath accepts up to four hours of data loss and targets service restoration within eight hours.', label: 'Objectives', value: 'RPO 4 hours · RTO 8 hours', discoveryConcepts: ['rpo', 'rto'] },
      { evidenceId: 'recovery-runbook', title: 'Review the recovery runbook', body: 'The clean environment must be patched, credentials rotated, data validated, security controls enabled, and monitoring confirmed before production traffic returns.', label: 'Release gate', value: 'Validated clean restoration', discoveryConcepts: ['clean-restoration', 'eradication'] }
    ],
    activity: { type: 'configuration', prompt: 'Which recovery source is the safest defensible choice?', options: [
      { id: 'older-tested-clean', label: 'Use the older tested backup that predates compromise, then validate it in a clean environment', correct: true, explanation: 'Correct. It sacrifices some recent data within the stated RPO while providing stronger integrity and recoverability evidence.' },
      { id: 'recent-untested', label: 'Use the newest untested backup because it contains the most recent data', correct: false, explanation: 'The newest copy may contain attacker changes and has not demonstrated recoverability.' },
      { id: 'post-compromise-snapshot', label: 'Use the snapshot taken after compromise because it restores fastest', correct: false, explanation: 'A post-compromise snapshot can restore malicious artifacts, persistence, and unsafe configuration.' },
      { id: 'infected-production', label: 'Return the still-infected production server to service', correct: false, explanation: 'Speed does not make an untrusted system a clean recovery source.' }
    ] },
    activities: [
      { type: 'configuration', prompt: 'Which recovery source is the safest defensible choice?', options: [
        { id: 'older-tested-clean', label: 'Use the older tested backup that predates compromise, then validate it in a clean environment', correct: true, explanation: 'Correct. It sacrifices some recent data within the stated RPO while providing stronger integrity and recoverability evidence.' },
        { id: 'recent-untested', label: 'Use the newest untested backup because it contains the most recent data', correct: false, explanation: 'The newest copy may contain attacker changes and has not demonstrated recoverability.' },
        { id: 'post-compromise-snapshot', label: 'Use the snapshot taken after compromise because it restores fastest', correct: false, explanation: 'A post-compromise snapshot can restore malicious artifacts, persistence, and unsafe configuration.' },
        { id: 'infected-production', label: 'Return the still-infected production server to service', correct: false, explanation: 'Speed does not make an untrusted system a clean recovery source.' }
      ] },
      { type: 'classification', prompt: 'What do the four-hour RPO and eight-hour RTO mean?', options: [
        { id: 'rpo-data-rto-time', label: 'Up to four hours of data loss is acceptable, and service should return within eight hours', correct: true, explanation: 'Correct. RPO targets the recovery point and acceptable data loss; RTO targets restoration time.' },
        { id: 'reverse-objectives', label: 'Service must return in four hours, and eight hours of data loss is acceptable', correct: false, explanation: 'That reverses the meanings of RPO and RTO.' },
        { id: 'guaranteed-times', label: 'Both values guarantee that recovery will succeed automatically', correct: false, explanation: 'Objectives guide planning and priority; testing and execution determine actual recovery.' }
      ] },
      { type: 'configuration', prompt: 'What must happen before production traffic returns?', options: [
        { id: 'validate-harden-monitor', label: 'Validate data and applications, patch the root cause, rotate credentials, enable controls, and monitor the clean environment', correct: true, explanation: 'Correct. Clean restoration requires both functional testing and evidence that the compromise will not return.' },
        { id: 'loads-homepage', label: 'Return service as soon as the homepage loads', correct: false, explanation: 'A visible page does not prove data integrity, security controls, dependencies, or attacker removal.' },
        { id: 'disable-monitoring', label: 'Disable monitoring to improve restoration performance', correct: false, explanation: 'Recovery needs heightened monitoring to detect recurrence and validate normal operation.' }
      ] }
    ],
    hint: 'Prefer a tested point before compromise, distinguish acceptable data loss from recovery time, and validate security before release.',
    debrief: 'Recovery is a risk decision, not simply a race toward the newest copy. Backup integrity and testing establish trust, RPO and RTO guide tradeoffs, and clean restoration combines validation, remediation, credential security, and monitoring.',
    masteryEvidence: [
      { conceptId: 'backup-integrity', evidenceType: 'reasoning', contextId: 'clean-backup-selection', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'recovery-testing', evidenceType: 'application', contextId: 'clean-backup-selection', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'rpo', evidenceType: 'application', contextId: 'recovery-objectives', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'rto', evidenceType: 'application', contextId: 'recovery-objectives', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'clean-restoration', evidenceType: 'reasoning', contextId: 'validated-production-return', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 }
    ],
    rewards: { xp: 300, cyberDexEntries: ['backup-integrity', 'recovery-testing', 'rpo', 'rto', 'clean-restoration', 'eradication'] }
  },
  {
    missionId: 'splus-c1-m15',
    title: 'Incident Commander',
    description: 'Lead a complete Public Web District incident from initial evidence through recovery and reporting.',
    objectives: ['Correlate evidence across security domains', 'Prioritize containment and remediation', 'Authorize a clean, documented recovery.'],
    prerequisites: ['splus-c1-m14'],
    concepts: ['incident-response', 'analyst-prioritization', 'phishing', 'authentication-logs', 'certificate', 'sql-injection', 'containment', 'clean-restoration', 'incident-reporting'],
    briefing: 'A coordinated attack combines phishing, stolen credentials, certificate misuse, web injection, and lateral movement. As incident commander, you must lead the response from evidence to recovery.',
    investigations: [
      { evidenceId: 'capstone-timeline', title: 'Build the incident timeline', body: 'A cloned login page captured credentials before a suspicious account session changed the portal certificate and application configuration.', label: 'Sequence', value: 'Phishing → account access → service changes', discoveryConcepts: ['phishing', 'authentication-logs', 'incident-response'] },
      { evidenceId: 'capstone-web-evidence', title: 'Inspect application evidence', body: 'Logs show SQL injection against unsafe query construction followed by outbound connections and internal administrative traffic.', label: 'Web evidence', value: 'Injection with possible lateral movement', discoveryConcepts: ['sql-injection', 'lateral-movement', 'incident-scope'] },
      { evidenceId: 'capstone-trust-evidence', title: 'Inspect identity and trust', body: 'The attacker used a stolen account, active sessions, and a replaced certificate chain that does not terminate at the approved root.', label: 'Trust status', value: 'Identity and certificate trust compromised', discoveryConcepts: ['certificate', 'containment', 'evidence-preservation'] },
      { evidenceId: 'capstone-recovery-evidence', title: 'Inspect recovery readiness', body: 'A tested clean backup predates compromise. The rebuilt environment can be patched, validated, monitored, and restored within the approved objectives.', label: 'Recovery status', value: 'Clean restoration candidate ready', discoveryConcepts: ['backup-integrity', 'clean-restoration', 'recovery-testing'] }
    ],
    activity: { type: 'classification', prompt: 'Which evidence best explains the likely initial access?', options: [
      { id: 'phish-credentials', label: 'The cloned login page and subsequent suspicious use of captured credentials', correct: true, explanation: 'Correct. The timeline connects phishing and credential harvesting to the first unauthorized identity activity.' },
      { id: 'expired-backup', label: 'The age of the clean backup', correct: false, explanation: 'Backup age affects recovery, not the initial-access evidence.' },
      { id: 'alert-count', label: 'The total number of SIEM alerts without context', correct: false, explanation: 'Alert count alone does not establish the attack path.' }
    ] },
    activities: [
      { type: 'classification', prompt: 'Which evidence best explains the likely initial access?', options: [
        { id: 'phish-credentials', label: 'The cloned login page and subsequent suspicious use of captured credentials', correct: true, explanation: 'Correct. The timeline connects phishing and credential harvesting to the first unauthorized identity activity.' },
        { id: 'expired-backup', label: 'The age of the clean backup', correct: false, explanation: 'Backup age affects recovery, not the initial-access evidence.' },
        { id: 'alert-count', label: 'The total number of SIEM alerts without context', correct: false, explanation: 'Alert count alone does not establish the attack path.' }
      ] },
      { type: 'configuration', prompt: 'What is the strongest immediate containment order?', options: [
        { id: 'isolate-revoke-preserve', label: 'Isolate affected systems, disable compromised identities and sessions, preserve evidence, and restrict lateral paths', correct: true, explanation: 'Correct. This contains host, identity, and network access while protecting the investigation.' },
        { id: 'public-banner', label: 'Post a maintenance banner but leave systems and sessions active', correct: false, explanation: 'A banner communicates downtime but does not contain attacker access.' },
        { id: 'wipe-all', label: 'Wipe every suspected system immediately without scoping or evidence preservation', correct: false, explanation: 'Uncoordinated destruction can hide scope and still miss compromised identities or systems.' }
      ] },
      { type: 'configuration', prompt: 'Which remediation plan addresses the root causes?', options: [
        { id: 'fix-query-trust-identity', label: 'Parameterize queries, patch systems, rotate credentials, revoke untrusted certificates, and verify the approved trust chain', correct: true, explanation: 'Correct. The plan repairs application, system, identity, and certificate trust rather than treating only symptoms.' },
        { id: 'waf-password-only', label: 'Add one WAF rule and change one user password', correct: false, explanation: 'That leaves unsafe code, other sessions, certificate trust, and wider compromise unresolved.' },
        { id: 'ignore-certificate', label: 'Restore the portal while ignoring the unapproved certificate chain', correct: false, explanation: 'Recovery cannot be trusted while service identity remains compromised.' }
      ] },
      { type: 'configuration', prompt: 'When should the commander authorize production recovery?', options: [
        { id: 'clean-validated-monitored', label: 'After clean restoration is tested, root causes are remediated, credentials and trust are restored, and monitoring is active', correct: true, explanation: 'Correct. Functional and security validation must both pass before production return.' },
        { id: 'homepage-only', label: 'As soon as any restored homepage responds', correct: false, explanation: 'A responding page does not prove clean data, secure identity, fixed code, or attacker removal.' },
        { id: 'infected-fastest', label: 'Use the infected production server because it has the shortest downtime', correct: false, explanation: 'An untrusted system cannot support a safe recovery regardless of speed.' }
      ] },
      { type: 'classification', prompt: 'What completes the incident commander’s responsibility after recovery?', options: [
        { id: 'report-lessons-monitor', label: 'Document scope and decisions, notify required stakeholders, monitor for recurrence, and conduct lessons learned', correct: true, explanation: 'Correct. Reporting, monitoring, and lessons learned complete the response and improve future resilience.' },
        { id: 'delete-records', label: 'Delete incident records once service returns', correct: false, explanation: 'Records support accountability, improvement, compliance, and defensible analysis.' },
        { id: 'no-review', label: 'Skip review because the service is operational', correct: false, explanation: 'Operational recovery does not replace reporting or lessons learned.' }
      ] }
    ],
    hint: 'Follow the incident lifecycle: establish the attack path, contain access, remediate every trust boundary, validate recovery, and document the outcome.',
    debrief: 'You led a complete response across network, identity, cryptography, application, detection, containment, recovery, and reporting. Strong incident command connects evidence to prioritized decisions and restores service only when it is both functional and trustworthy.',
    masteryEvidence: [
      { conceptId: 'phishing', evidenceType: 'assessment', contextId: 'district-capstone-initial-access', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 0 },
      { conceptId: 'analyst-prioritization', evidenceType: 'assessment', contextId: 'district-capstone-containment', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'containment', evidenceType: 'assessment', contextId: 'district-capstone-containment', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 1 },
      { conceptId: 'sql-injection', evidenceType: 'assessment', contextId: 'district-capstone-remediation', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 },
      { conceptId: 'certificate', evidenceType: 'assessment', contextId: 'district-capstone-remediation', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 2 },
      { conceptId: 'clean-restoration', evidenceType: 'assessment', contextId: 'district-capstone-recovery', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 3 },
      { conceptId: 'incident-response', evidenceType: 'assessment', contextId: 'district-capstone-reporting', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 4 },
      { conceptId: 'incident-reporting', evidenceType: 'assessment', contextId: 'district-capstone-reporting', firstAttemptRequired: true, hintDisqualifies: true, independent: true, activityIndex: 4 }
    ],
    rewards: { xp: 500, cyberDexEntries: ['incident-response', 'analyst-prioritization', 'phishing', 'authentication-logs', 'certificate', 'sql-injection', 'containment', 'clean-restoration', 'incident-reporting'] }
  }
]
