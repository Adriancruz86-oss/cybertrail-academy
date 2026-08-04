export const concepts = {
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
    }
};
//# sourceMappingURL=concepts.js.map