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
      { title: 'Inspect the protected system', body: 'The database server stores BrightPath student records. The records and the server have value to the organization.', discoveryConcepts: ['asset'] },
      { title: 'Inspect the incident board', body: 'Ransomware could harm the server, while a missing patch creates a weakness it could exploit.', discoveryConcepts: ['threat', 'vulnerability', 'risk', 'security-control'] }
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
      { title: 'Check the web server', body: 'The server is online and internal users can load the portal.', discoveryConcepts: ['https'] },
      { title: 'Check DNS and the firewall', body: 'DNS resolves correctly, but inbound TCP port 443 is blocked at the firewall.', discoveryConcepts: ['tcp-443', 'firewall-rule', 'inbound-traffic', 'least-functionality'] }
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
      { title: 'Review the proposal', body: 'The proposed rule would expose services that BrightPath does not need public users to reach.', discoveryConcepts: ['attack-surface', 'least-functionality'] },
      { title: 'Review the default policy', body: 'The firewall blocks traffic unless a specific rule allows it. Approved traffic can be allowlisted.', discoveryConcepts: ['implicit-deny', 'allowlisting'] }
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
  }
]
