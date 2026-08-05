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
  }
]
