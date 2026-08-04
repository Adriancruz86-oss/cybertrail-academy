import type { MissionData } from '../types'

export const missions: MissionData[] = [
  {
    missionId: 'splus-c1-m01',
    title: 'Welcome to the SOC',
    description: 'Understand the difference between asset, threat, vulnerability, risk, and control.',
    objectives: ['Inspect SOC examples', 'Learn how these terms are related but not interchangeable.'],
    prerequisites: [],
    concepts: ['asset', 'threat', 'vulnerability', 'risk', 'security-control'],
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
    masteryEvidence: [
      {
        conceptId: 'asset',
        evidenceType: 'recognition',
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
    concepts: ['https', 'tcp-443', 'firewall-rule', 'inbound-traffic'],
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
    masteryEvidence: [
      {
        conceptId: 'tcp-443',
        evidenceType: 'application',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      },
      {
        conceptId: 'firewall-rule',
        evidenceType: 'application',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      }
    ],
    rewards: {
      xp: 120,
      cyberDexEntries: ['https', 'tcp-443', 'firewall-rule', 'inbound-traffic']
    }
  },
  {
    missionId: 'splus-c1-m03',
    title: 'The Unsafe Shortcut',
    description: 'An employee suggests opening all inbound ports to fix the portal. Choose a safer alternative.',
    objectives: ['Reject the risky shortcut', 'Choose a narrow rule that supports only needed traffic.'],
    prerequisites: ['splus-c1-m02'],
    concepts: ['attack-surface', 'least-functionality', 'implicit-deny', 'allowlisting'],
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
    masteryEvidence: [
      {
        conceptId: 'least-functionality',
        evidenceType: 'reasoning',
        firstAttemptRequired: true,
        hintDisqualifies: true,
        independent: true
      },
      {
        conceptId: 'attack-surface',
        evidenceType: 'reasoning',
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