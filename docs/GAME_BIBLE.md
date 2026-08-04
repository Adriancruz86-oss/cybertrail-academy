CYBERTRAIL ACADEMY
Cyber World Game Bible and Build Specification
Version 1.0

⸻

1. PRODUCT IDENTITY
Product Name
CyberTrail Academy
Game Universe
Cyber World
First Learning Campaign
Security+ — First Response
Product Description
CyberTrail Academy is a story-driven cybersecurity learning game in which players explore a visual representation of modern computer systems, investigate security incidents, configure defenses, and demonstrate mastery of certification concepts through repeated application.
The first campaign prepares players for CompTIA Security+ by turning terminology, acronyms, technical controls, attacks, and operational procedures into locations, characters, tools, and missions inside Cyber World.
CyberTrail Academy must not feel like a multiple-choice test with decorative graphics. The player should feel like a junior cybersecurity professional making real decisions inside a functioning organization.

⸻

2. NORTH STAR
Players should leave every mission understanding why the correct answer is correct—not merely remembering which answer was marked correct.
Every game feature, mission, character, interface, and reward system must support this principle.
When entertainment and instructional clarity conflict, instructional clarity wins. The game should still be engaging, but it must never obscure the concept being taught.

⸻

3. CORE PURPOSE
CyberTrail Academy exists to solve five common problems in cybersecurity education:
1. Students memorize isolated facts without understanding how systems connect.
2. Acronyms are learned as definitions rather than tools with specific purposes.
3. Students recognize correct answers but struggle to apply concepts in scenarios.
4. Study applications reward repetition and guessing rather than demonstrated understanding.
5. Learners have difficulty forming a complete mental model of enterprise cybersecurity.
CyberTrail Academy addresses these problems by placing concepts into a persistent world where the player must use them.

⸻

4. TARGET PLAYER
Primary Audience
The initial product is designed for:
* Security+ students
* Career changers entering cybersecurity
* Help desk and IT professionals moving toward security roles
* Visual and story-oriented learners
* Students who understand basic technology but struggle with terminology
* Players who prefer scenarios over traditional flashcards
* Mobile and desktop users
Secondary Audience
Future campaigns may support:
* Network+
* CCNA
* CySA+
* PenTest+
* Linux+
* Cloud certifications
* Cybersecurity workforce training
* High school and college cybersecurity programs
Expected Starting Knowledge
The first campaign should accommodate players who know basic computer concepts but may not understand:
* Enterprise networking
* Cryptography
* Identity and access management
* Security operations
* Governance and risk
* Incident response
The game must introduce unfamiliar concepts naturally and provide optional explanations without overwhelming experienced students.

⸻

5. PLATFORM STRATEGY
Initial Platform
The first version will be a mobile-first browser game.
It should run on:
* iPhone
* Android
* Windows
* macOS
* Chromebooks
* Modern school and workplace browsers
It should later support installation as a Progressive Web App.
Initial Technology Recommendation
* HTML5
* CSS
* JavaScript or TypeScript
* Phaser 3 or a comparable lightweight 2D game framework
* JSON-based mission and curriculum data
* Browser local storage or IndexedDB
* Progressive Web App manifest and service worker
* GitHub repository
* GitHub Pages or another free static host
The educational content must be separated from the underlying game engine. Missions, concepts, dialogue, rewards, and assessments should be editable without rewriting core gameplay code.
Future Platforms
After validation, the product may be expanded into:
* Native mobile applications
* Roblox
* Steam
* Classroom dashboards
* Multiplayer study environments
Roblox is not part of the first MVP.

⸻

6. VISUAL AND TONAL DIRECTION
Visual Style
Cyber World should use a clean, colorful, approachable 2D style.
Preferred direction:
* Top-down exploration
* Simplified environments
* Clear icons
* Light animation
* Modern business and technology settings
* Friendly visual language
* Strong readability on phones
The visual style may draw inspiration from classic top-down adventure games, but it must be original.
Explicitly Avoid
* Dark neon cyberpunk environments
* Excessive hacker stereotypes
* Hooded villains typing green code
* Graphic violence
* Military combat framing
* Dense technical dashboards that become unreadable on phones
* Visual clutter
* Childish presentation that alienates adult learners
Tone
The game should feel:
* Encouraging
* Intelligent
* Professional
* Curious
* Lightly humorous
* Never condescending
The player is treated as a developing analyst, not a child taking a quiz.

⸻

7. WORLD PREMISE
Cyber World is a visual representation of a connected digital economy.
Businesses, schools, hospitals, government agencies, cloud services, and infrastructure providers exist as physical locations. Their computer systems, employees, networks, identities, applications, and defenses are represented as buildings, rooms, roads, checkpoints, machines, and characters.
The player works for:
Cyber World Security Solutions
Cyber World Security Solutions, abbreviated CWSS, is a cybersecurity consulting and incident-response organization that assists companies throughout Cyber World.
This structure allows the game to introduce many environments without forcing every mission to occur inside one company.
Clients may include:
* Schools
* Hospitals
* Banks
* Retail businesses
* Factories
* Technology companies
* Local government offices
* Cloud service providers
* Small businesses
* Critical infrastructure operators
Each environment introduces different risks and Security+ objectives.

⸻

8. PLAYER ROLE
The player begins as a newly hired junior security analyst.
The player is not presented as a superhuman hacker. They are part of a team and must:
* Gather evidence
* Ask questions
* Follow procedures
* Consult specialists
* Select appropriate tools
* Make risk-based decisions
* Document findings
* Learn from mistakes
The player advances through analyst ranks by demonstrating competency.
Suggested Ranks
1. Analyst Trainee
2. Junior Security Analyst
3. Security Analyst
4. Incident Responder
5. Security Engineer
6. Senior Analyst
7. SOC Lead
8. Security Architect
Ranks are not unlocked solely through XP. Major promotions require competency milestones.

⸻

9. CENTRAL HUB
The player’s home location is the Cyber World Security Solutions headquarters.
Headquarters Areas
Operations Desk
Receives new missions and client incidents.
SOC Floor
Displays active alerts, logs, incidents, and operational missions.
Competency Matrix
Shows progress across certification objectives.
CyberDex Library
Provides explanations, concept relationships, and review activities.
Training Lab
Allows optional practice outside the main story.
Player Office
Displays awards, certifications, campaign progress, and visual upgrades.
Briefing Room
Hosts campaign introductions, major incident briefings, and district assessments.
Transit Terminal
Allows travel to client sites and districts.
Menus may still exist for accessibility, but important systems should also have a physical representation in the world.

⸻

10. CYBER WORLD DISTRICTS
10.1 Central Plaza
Purpose:
* Tutorials
* Headquarters
* Progress tracking
* Optional review
* Campaign selection
* Player office
10.2 Gateway District
Represents:
* Firewalls
* Routers
* Switches
* ACLs
* NAT
* PAT
* IDS
* IPS
* VPNs
* Segmentation
* Network access control
Visual metaphors:
* Firewalls as controlled checkpoints
* Routers as transportation junctions
* Switches as internal distribution centers
* ACLs as access lists used by guards
* Network segmentation as separated neighborhoods
10.3 Identity Hall
Represents:
* Authentication
* Authorization
* Accounting
* Active Directory
* LDAP
* Kerberos
* RADIUS
* TACACS+
* MFA
* Federation
* SAML
* OAuth
* OpenID Connect
* Password policies
* Privileged access
Visual metaphors:
* Identity registry
* Badge office
* Ticket desk
* Authentication gates
* Role-based access areas
10.4 Cryptography Vault
Represents:
* Symmetric encryption
* Asymmetric encryption
* AES
* RSA
* ECC
* Diffie-Hellman
* ECDHE
* Hashing
* HMAC
* Digital signatures
* Certificates
* PKI
* OCSP
* CRL
* TPM
* HSM
* Key escrow
Visual metaphors:
* Keys
* Vaults
* Seals
* Identity documents
* Secure exchanges
* Tamper-evident packages
10.5 Public Web District
Represents:
* Web servers
* DNS
* Email
* APIs
* Proxies
* Load balancers
* DMZs
* Databases
* Public-facing services
* Web attacks
This is the first playable district.
10.6 Cloud Harbor
Represents:
* IaaS
* PaaS
* SaaS
* Shared responsibility
* Virtual machines
* Containers
* Serverless computing
* Cloud storage
* CASB
* Cloud identity
* Cloud logging
* Data sovereignty
10.7 Operations Center
Represents:
* SOC operations
* SIEM
* SOAR
* Logging
* Monitoring
* Alert triage
* Incident response
* Forensics
* Backups
* Disaster recovery
* Business continuity
* Change management
10.8 Governance Tower
Represents:
* Policies
* Standards
* Procedures
* Guidelines
* Risk management
* Compliance
* Audits
* Vendor management
* Privacy
* Data classification
* Security awareness
* Governance roles
10.9 Industrial District
Represents:
* Operational technology
* Industrial control systems
* SCADA
* Embedded systems
* IoT
* Safety
* Availability
* Legacy systems
* Physical security
10.10 The Underground
Represents threat activity:
* Malware
* Ransomware
* Phishing
* Credential attacks
* Persistence
* Privilege escalation
* Lateral movement
* Command and control
* Exfiltration
* Threat actors
The Underground is revealed gradually through investigations. It should not function as a fantasy dungeon. It is a visual abstraction of attacker infrastructure and techniques.

⸻

11. RECURRING CHARACTERS
Maya Chen — SOC Director
Role:
* Player mentor
* Teaches evidence-based reasoning
* Assigns early missions
* Conducts debriefs
Personality:
* Calm
* Patient
* Precise
* Encouraging without giving away answers
Recurring line:
What evidence supports that conclusion?
Learning association:
* Investigation
* Analysis
* Decision quality
* Avoiding assumptions
Ben Carter — Help Desk Technician
Role:
* Reports user issues
* Introduces incidents that initially appear routine
* Provides light humor
Personality:
* Friendly
* Busy
* Occasionally disorganized
* More perceptive than he first appears
Learning association:
* User reports
* Ticket triage
* Troubleshooting
* Social engineering indicators
Priya Shah — PKI Engineer
Role:
* Introduces certificates, trust, encryption, signing, and key management
Personality:
* Enthusiastic
* Detailed
* Protective of private keys
Learning association:
* Certificates
* Certificate authorities
* OCSP
* CRLs
* RSA
* ECDHE
* Digital signatures
Alex Rivera — Network Engineer
Role:
* Teaches packet flow, network controls, ports, routing, and segmentation
Personality:
* Visual thinker
* Direct
* Draws diagrams frequently
Learning association:
* Firewalls
* VLANs
* Ports
* Protocols
* Routing
* Segmentation
Sam Brooks — Cloud Architect
Role:
* Introduces cloud services and shared responsibility
Personality:
* Practical
* Frequently corrects the assumption that the provider handles all security
Learning association:
* IaaS
* PaaS
* SaaS
* Cloud identity
* Cloud logging
* Shared responsibility
Jordan Lee — Incident Commander
Role:
* Appears during major incidents
* Teaches containment, communication, and structured response
Personality:
* Serious
* Calm under pressure
* Decisive
Learning association:
* Incident response
* Prioritization
* Communication
* Recovery
Elena Torres — Governance and Risk Manager
Role:
* Teaches policies, risk, compliance, and business impact
Personality:
* Strategic
* Business-focused
* Challenges purely technical solutions
Learning association:
* Risk treatment
* Governance
* Compliance
* Data ownership
* Vendor risk

⸻

12. CORE GAMEPLAY LOOP
Every major mission should follow this structure.
Step 1: Briefing
The player receives:
* A problem
* Basic context
* Known impact
* Initial objectives
Step 2: Investigation
The player gathers information from:
* NPC conversations
* Logs
* Devices
* Network diagrams
* Alerts
* Configuration screens
* Emails
* Tickets
* Files
* Environmental clues
Step 3: Hypothesis
The player identifies:
* What may be happening
* What evidence supports the theory
* What remains unknown
Step 4: Decision
The player chooses or performs an action such as:
* Selecting a control
* Configuring a rule
* Inspecting a certificate
* Isolating a device
* Classifying an event
* Matching a tool to a requirement
* Ordering response steps
* Identifying the strongest evidence
Step 5: Consequence
The game demonstrates what the decision caused.
Correct decisions may:
* Restore service
* Stop an attack
* Reveal new evidence
* Reduce risk
Incorrect decisions may:
* Fail to solve the problem
* Create additional exposure
* Delay containment
* Destroy evidence
* Produce a visible operational consequence
The game must explain the result in context.
Step 6: Debrief
The player receives:
* What happened
* Why the successful action worked
* Why common alternatives were weaker
* Related concepts
* Mastery progress
Step 7: Delayed Reinforcement
Important concepts reappear later in different scenarios without announcing that they are review questions.

⸻

13. ACTIVITY TYPES
The game should support multiple activity types.
Dialogue Decisions
Choose how to respond to an NPC or what question to ask.
Tool Selection
Select the correct tool from an inventory.
Examples:
* AES
* RSA
* HMAC
* Firewall
* IPS
* MFA
* Backup
* Packet capture
Configuration Puzzles
Configure:
* Firewall rules
* Ports
* Access control
* VLAN placement
* Authentication methods
* Encryption options
* Logging settings
Evidence Boards
Connect related evidence such as:
* Login source
* Time
* Device
* Failed authentication
* Process creation
* Data transfer
Sequencing
Arrange processes such as:
* Incident response
* Change management
* Certificate validation
* Evidence collection
* Risk assessment
Map Placement
Place systems into appropriate environments.
Examples:
* Public server in the DMZ
* Database on an internal segment
* Guest wireless separated from employees
* Sensitive systems in restricted zones
Classification
Identify:
* Threat
* Vulnerability
* Risk
* Control
* True positive
* False positive
* Policy
* Standard
* Procedure
Reasoning Prompt
The player selects or enters a brief explanation of why a choice is appropriate.
Free-text answers should not be required for core progress during the MVP. Structured reasoning choices are more reliable initially.
Timed Activity
Used sparingly. Cybersecurity reasoning is more important than reflex speed.

⸻

14. LEARNING ENGINE
The learning engine is the most important system in the product.
It tracks what the player has encountered, recognized, applied, explained, forgotten, and mastered.
Concept Record
Every teachable concept should have:
* Unique concept ID
* Name
* Acronym
* Full term
* Plain-language definition
* Technical definition
* Domain
* Exam objective reference
* Prerequisites
* Related concepts
* Common misconceptions
* Recognition challenges
* Application challenges
* Reasoning challenges
* Review interval
* Mastery status
* Evidence history
Competency Stages
Each concept progresses through:
Unknown
The player has not encountered the concept.
Exposed
The player has seen or heard the concept.
Recognized
The player can identify the concept or its purpose.
Applied
The player can select it correctly in a relevant scenario.
Reasoned
The player can distinguish it from plausible alternatives and explain why it fits.
Competent
The player has demonstrated correct application in at least two distinct scenarios without an intervening mistake.
Mastered
The player has demonstrated competency over time across multiple contexts, including a delayed review or district assessment.

⸻

15. CHECKLIST AND COMPETENCY MATRIX
The player must have access to a domain checklist aligned with Security+ objectives.
Each concept or objective appears as a competency tile.
Tile States
* Gray: Not encountered
* White: Introduced
* Blue: In progress
* Green: Competent
* Gold: Mastered
* Orange border: Due for review
* Red marker: Persistent misconception detected
Competency Unlock Rule
A competency box becomes checked only after the player:
1. Solves two separate application or reasoning challenges correctly.
2. Solves both on the first meaningful attempt.
3. Encounters the concept in different contexts or missions.
4. Has no incorrect attempt for that concept between the two successful demonstrations.
A guided tutorial completion does not count as a competency demonstration.
A correct answer after random guessing does not count.
Mistake Handling
A mistake does not erase all learning.
Instead:
* The concept remains introduced or in progress.
* Any active two-success competency streak resets.
* The game records the misconception.
* The concept is scheduled for a different future scenario.
Mastery Rule
A concept becomes mastered when the player:
* Has already reached competent status
* Correctly applies it in a later mission or assessment
* Has passed an appropriate delay since the last successful demonstration
* Correctly distinguishes it from a closely related distractor
Example:
To master AES, the player should not only identify AES as symmetric encryption. They should also distinguish it from RSA, hashing, and digital signatures in applied situations.

⸻

16. ANTI-GUESSING SYSTEM
The game must not reward rapid random selection.
Controls
First-Attempt Weighting
Only the first meaningful attempt can count toward competency.
Interaction Lock
The player cannot click every answer rapidly. A brief selection confirmation or explanation is required.
Consequence Feedback
Incorrect choices show why the action failed.
Distractor Rotation
Choice positions and distractors vary.
Context Variation
The same concept appears in different environments.
Confidence Prompt
Optional prompt:
* I know this
* I think this
* I am guessing
Correct high-confidence answers provide stronger mastery evidence.
Incorrect high-confidence answers signal a misconception requiring correction.
Reduced Progress After Hints
Hints support learning but prevent that encounter from counting as independent mastery evidence.

⸻

17. KNOWLEDGE GRAPH
Concepts must be stored as relationships rather than isolated flashcards.
Example:
HTTPS connects to:
* TCP port 443
* TLS
* Certificates
* Certificate authorities
* Symmetric encryption
* Asymmetric key establishment
* Digital signatures
* DNS
* Firewalls
The knowledge graph allows the system to:
* Identify prerequisite weaknesses
* Recommend review missions
* Explain how concepts connect
* Prevent superficial completion
* Generate future adaptive content
Example dependency:
If a player struggles with certificates, the game should recognize possible difficulty with:
* HTTPS
* TLS
* PKI
* OCSP
* CRLs
* Digital signatures
* Trust chains

⸻

18. CYBERDEX
The CyberDex is the player’s reference library.
Each entry should include:
* Acronym
* Full term
* Plain-language explanation
* Technical explanation
* Why it exists
* When to use it
* When not to use it
* Common beginner mistake
* Related concepts
* Missions where it appeared
* Competency status
* Last reviewed
* Review activity
Example Entry
AES
Advanced Encryption Standard
Fast symmetric encryption used to protect large amounts of data.
Common uses
* File encryption
* Full-disk encryption
* VPN traffic
* Secure web sessions
* Wireless encryption
Not used for
* Hashing
* Digital signatures
* Certificate issuance
* Identity verification
Common misconception
AES does not establish identity by itself. Both sides must possess the appropriate secret key.
Related concepts
* RSA
* ECDHE
* TLS
* BitLocker
* IPsec

⸻

19. PLAYER PROGRESSION
Knowledge XP
Awarded for:
* Completing missions
* Investigating thoroughly
* Correct reasoning
* Identifying relevant evidence
* Reviewing weak concepts
* Completing district assessments
XP supports rank progression but does not replace competency requirements.
Analyst Rank
Rank progression may require:
* Minimum XP
* Specific competency completion
* District assessment
* Campaign milestone
Office Progression
The player’s office changes visually through:
* New monitors
* Certificates
* District maps
* Mission trophies
* Client commendations
* Specialist tools
* Campaign completion items
Cosmetic progression should reinforce achievement without becoming the main focus.

⸻

20. FAILURE PHILOSOPHY
The player does not lose lives.
Incorrect decisions create educational consequences.
Example
The player selects RSA to encrypt a 50 GB database backup.
Result:
* The process becomes impractically slow.
* Priya explains that RSA is designed for small data operations, signatures, or key protection—not bulk encryption.
* The player is asked to choose a more suitable method.
* AES becomes the correct operational choice.
* The encounter teaches the distinction.
Failure Requirements
Every failure should:
* Preserve dignity
* Explain the misconception
* Demonstrate the operational effect
* Allow recovery
* Inform future review
The game should not use humiliation, harsh alarms, or mocking dialogue.

⸻

21. ADAPTIVE REVIEW
The game should quietly reinforce concepts over time.
Review Triggers
A concept may be reviewed when:
* The player recently made a mistake
* The player has not seen it for an appropriate interval
* It is a prerequisite for an upcoming mission
* It is frequently confused with another concept
* Its competency status is incomplete
* The player voluntarily selects review
Hidden Review Example
A player previously learned that HTTPS uses TCP port 443.
Several missions later, a remote portal becomes unavailable. The player must inspect the firewall and recognize that port 443 is blocked.
The game does not label this as an HTTPS quiz.

⸻

22. SECURITY+ DOMAIN STRUCTURE
The game must map its content to the current selected Security+ exam objectives used during development.
Because certification objectives can change, the exact exam code and objective list should be stored as editable content data rather than hardcoded into the engine.
The content model should support five broad areas:
1. General security concepts
2. Threats, vulnerabilities, and mitigations
3. Security architecture
4. Security operations
5. Security program management and oversight
Each objective must map to:
* District
* Concept IDs
* Missions
* Activity types
* Required competency evidence
* Assessment encounters

⸻

23. FIRST CAMPAIGN
Campaign Title
First Response
Client
BrightPath Learning
Environment
BrightPath operates an online portal used by students, teachers, and administrators.
Its environment includes:
* Public website
* DNS
* Firewall
* DMZ
* Web server
* Application server
* Internal database
* Identity provider
* Email
* Logging platform
* SIEM
* Backups
* Cloud services
Campaign Premise
During the player’s first day at Cyber World Security Solutions, BrightPath’s public learning portal becomes unavailable.
The apparent connectivity issue develops into a broader incident involving:
* A firewall misconfiguration
* An expired or invalid certificate
* A phishing campaign
* Stolen credentials
* Impossible travel
* Suspicious web requests
* Potential SQL injection
* Lateral movement
* Data exfiltration
* Incident containment
* Recovery from backup
* Governance improvements
The campaign should make the player experience the relationship between networking, identity, cryptography, applications, operations, and governance.

⸻

24. FIRST CAMPAIGN LOCATIONS
* BrightPath reception
* Network closet
* Firewall checkpoint
* DMZ
* Public web server room
* DNS office
* Certificate services desk
* Identity administration room
* Internal database vault
* Logging station
* SOC monitoring room
* Backup archive
* Executive briefing room

⸻

25. FIRST FIFTEEN MISSIONS
Mission 1: Welcome to the SOC
Concepts:
* Asset
* Threat
* Vulnerability
* Risk
* Security control
Activity:
The player inspects a simplified SOC environment and classifies objects and situations.
Learning goal:
Understand that these terms are related but not interchangeable.
Competency evidence:
Recognition only. Tutorial activity does not count toward final competency.
Mission 2: The Missing Website
Problem:
External users cannot access the learning portal.
Evidence:
* Server is online
* DNS resolves correctly
* Internal users can reach the server
* TCP port 443 is blocked at the firewall
Correct action:
Allow necessary inbound HTTPS traffic on TCP port 443.
Concepts:
* HTTPS
* TCP 443
* Firewall rules
* Inbound traffic
* Least functionality
Mission 3: The Unsafe Shortcut
Problem:
An employee suggests opening all inbound ports.
Player task:
Reject the proposal and choose a narrowly scoped rule.
Concepts:
* Attack surface
* Least functionality
* Implicit deny
* Allowlisting
* Change control
Mission 4: Who Are You?
Problem:
The browser presents a certificate.
Player inspects:
* Subject
* Issuer
* Validity period
* Domain
* Signature
* Trust chain
Concepts:
* Digital certificate
* Certificate authority
* Identity
* Trust
Mission 5: The Expired Badge
Problem:
The certificate has expired.
Incorrect shortcuts:
* Disable browser validation
* Use HTTP
* Ignore the warning
Correct action:
Renew and deploy a valid certificate.
Concepts:
* Expiration
* Trust
* Secure configuration
* Risk acceptance versus unsafe bypass
Mission 6: The Revoked Certificate
Problem:
A private key may have been exposed.
Player chooses:
* OCSP
* CRL
* Neither
* Ignore the incident
Concepts:
* Revocation
* OCSP
* CRL
* Private key compromise
Mission 7: Secure the Conversation
Player task:
Match security functions to the correct technology.
Examples:
* Bulk encryption: AES
* Key establishment: ECDHE or appropriate asymmetric method
* Integrity and authenticity with a shared secret: HMAC
* Identity and trust: certificate
* One-way digest: hashing
Competency focus:
Symmetric versus asymmetric cryptography.
Mission 8: The Fake Login Page
Problem:
Employees receive a cloned BrightPath login page.
Player investigates:
* Sender
* Domain
* Link
* Attachment
* Urgency
* Login destination
Concepts:
* Phishing
* Credential harvesting
* Typosquatting
* Awareness training
* Reporting procedures
Mission 9: The Reused Password
Problem:
Stolen credentials are tested against BrightPath accounts.
Concepts:
* Credential stuffing
* Password reuse
* MFA
* Authentication logs
* Account lockout tradeoffs
Mission 10: The 2 A.M. Login
Problem:
A user logs in from two distant locations within an impossible timeframe.
Concepts:
* Impossible travel
* Behavioral analytics
* Account compromise
* Context
* False positives
Mission 11: Strange Database Requests
Problem:
The web server logs contain suspicious input targeting database queries.
Concepts:
* SQL injection
* Input validation
* Parameterized queries
* Web application firewall
* Logging
Mission 12: The Alert Flood
Problem:
The SIEM produces many alerts.
Player classifies:
* True positive
* False positive
* True negative
* False negative
Concepts:
* Alert quality
* Tuning
* Detection risk
* Analyst prioritization
Mission 13: Stop the Spread
Problem:
The compromised web server communicates with internal systems.
Player actions:
* Isolate server
* Disable compromised accounts
* Determine scope
* Preserve evidence
* Contain lateral movement
* Prepare eradication
Concepts:
* Incident response
* Containment
* Scope
* Evidence preservation
* Lateral movement
Mission 14: The Backup Decision
Problem:
BrightPath must restore service safely.
Options include:
* Recent untested backup
* Older tested backup
* Snapshot taken after compromise
* Still-infected production system
Concepts:
* Backup integrity
* Recovery testing
* RPO
* RTO
* Clean restoration
Mission 15: Incident Commander
A complete scenario combining:
* Network access
* Certificates
* Authentication
* Phishing
* Logs
* Injection
* Containment
* Recovery
* Reporting
This mission functions as the Public Web District assessment.

⸻

26. MISSION DATA FORMAT
Missions should be data-driven.
Suggested structure:
{
  "missionId": "splus-c1-m02",
  "title": "The Missing Website",
  "campaignId": "first-response",
  "district": "public-web",
  "difficulty": 1,
  "prerequisites": ["splus-c1-m01"],
  "concepts": [
    "https",
    "tcp-443",
    "firewall-rule",
    "inbound-traffic"
  ],
  "objectives": [
    "Investigate why external users cannot reach the website",
    "Configure a least-privilege firewall rule"
  ],
  "openingDialogue": [],
  "locations": [],
  "evidence": [],
  "activities": [],
  "consequences": [],
  "debrief": {},
  "masteryEvidence": [
    {
      "conceptId": "tcp-443",
      "evidenceType": "application",
      "firstAttemptRequired": true,
      "hintDisqualifies": true
    }
  ],
  "rewards": {
    "xp": 100,
    "cyberDexEntries": ["https", "tcp-443"]
  }
}

⸻

27. CONCEPT DATA FORMAT
Suggested structure:
{
  "conceptId": "aes",
  "name": "AES",
  "fullName": "Advanced Encryption Standard",
  "domain": "general-security-concepts",
  "category": "cryptography",
  "plainDefinition": "Fast symmetric encryption used to protect large amounts of data.",
  "technicalDefinition": "A symmetric block cipher commonly used to protect data at rest and in transit.",
  "whyItExists": "To provide efficient confidentiality for data.",
  "useCases": [
    "File encryption",
    "Disk encryption",
    "VPN traffic",
    "TLS session encryption"
  ],
  "notFor": [
    "Hashing",
    "Digital signatures",
    "Certificate issuance"
  ],
  "prerequisites": [
    "symmetric-encryption"
  ],
  "relatedConcepts": [
    "rsa",
    "ecdh",
    "tls",
    "bitlocker"
  ],
  "commonMisconceptions": [
    "AES is not asymmetric.",
    "AES does not verify identity by itself."
  ],
  "masteryRequirements": {
    "competencyDemonstrations": 2,
    "distinctContexts": 2,
    "delayedReviewRequired": true
  }
}

⸻

28. PLAYER SAVE DATA
Suggested structure:
{
  "playerId": "local-player",
  "displayName": "Analyst",
  "rank": "analyst-trainee",
  "xp": 0,
  "completedMissions": [],
  "unlockedMissions": ["splus-c1-m01"],
  "conceptProgress": {
    "aes": {
      "status": "unknown",
      "exposures": 0,
      "recognitionSuccesses": 0,
      "applicationSuccesses": 0,
      "reasoningSuccesses": 0,
      "currentCompetencyStreak": 0,
      "mistakes": [],
      "lastReviewed": null,
      "nextReview": null
    }
  },
  "settings": {
    "sound": true,
    "reducedMotion": false,
    "textSize": "standard"
  }
}

⸻

29. MVP SCOPE
The minimum viable product should contain:
* One central hub screen
* One small BrightPath map
* Eight to twelve accessible locations
* One player character
* Six recurring NPCs
* Ten to fifteen missions
* Dialogue system
* Tool selection activity
* Basic configuration puzzle
* Evidence inspection
* Sequencing activity
* CyberDex
* Competency Matrix
* Mission log
* XP and rank display
* Local save system
* Responsive phone layout
* Basic sound controls
* Progressive Web App support
* GitHub Pages deployment
Explicitly Excluded from MVP
* Multiplayer
* User accounts
* Cloud database
* Live AI NPC dialogue
* Character creator
* Combat
* Crafting
* Pets
* Vehicles
* Large open world
* Paid services
* Leaderboards
* Classroom administration
* Roblox version
* Native app-store release

⸻

30. MVP USER FLOW
1. Player opens the game.
2. Player selects New Game or Continue.
3. Maya welcomes the player to Cyber World Security Solutions.
4. The player receives a short movement and interaction tutorial.
5. The player enters the SOC.
6. Mission 1 begins.
7. Completing Mission 1 unlocks the BrightPath assignment.
8. The player travels to BrightPath.
9. Missions unlock sequentially with optional review activities.
10. The Competency Matrix updates after qualifying demonstrations.
11. The CyberDex records discovered concepts.
12. Mission 15 evaluates the district.
13. The player receives a Public Web District competency report.
14. The next district is teased but not required in the MVP.

⸻

31. MAIN INTERFACE
Exploration View
Displays:
* Game world
* Player
* NPCs
* Interactable objects
* Current objective
* Interaction button
* Pause or menu button
Mission Log
Displays:
* Active mission
* Objectives
* Evidence collected
* Optional hints
* Completed missions
CyberDex
Displays:
* Search
* Acronym list
* Concept details
* Relationships
* Competency status
* Review option
Competency Matrix
Displays:
* Domains
* Objectives
* Concept tiles
* Status legend
* Required evidence
* Review needs
Tool Inventory
Contains learning tools rather than collectible weapons.
Examples:
* Packet analyzer
* Firewall console
* Certificate viewer
* Hash utility
* MFA token
* Backup console
* Evidence bag
* Network diagram
* Incident playbook
Debrief Screen
Displays:
* Mission result
* Key decisions
* Concept explanations
* Competency evidence earned
* Mistakes corrected
* New CyberDex entries
* Next recommended mission

⸻

32. ACCESSIBILITY
The MVP should include:
* Adjustable text size
* Keyboard support
* Touch controls
* High-contrast interface
* Reduced motion option
* Captions for all spoken content
* No essential information communicated by color alone
* Clear icons with text labels
* Large touch targets
* Ability to replay dialogue
* No strict time limit on core reasoning activities
Future versions should consider screen-reader support and additional localization.

⸻

33. AUDIO
Audio should be optional.
Suggested audio:
* Light environmental music
* Subtle interface feedback
* Location ambience
* Alert sounds during incidents
Avoid:
* Constant alarms
* Harsh failure sounds
* Distracting voice effects
* Required audio clues
Voice acting is not required for the MVP.

⸻

34. CONTENT QUALITY RULES
Every mission must answer:
1. What certification concept does this teach?
2. What decision must the player make?
3. What evidence is available?
4. How does the world demonstrate the result?
5. What misconception might the player have?
6. What future scenario will reinforce the concept?
Mission Acceptance Criteria
A mission is not ready unless:
* Its learning objective is explicit.
* The correct action is technically defensible.
* Distractors are plausible but clearly weaker.
* The player receives contextual feedback.
* At least one future reinforcement opportunity exists.
* It does not reward memorization alone.
* It does not contain unnecessary exam trivia.
* It avoids ambiguous wording.
* Its mastery evidence is properly defined.

⸻

35. TECHNICAL ARCHITECTURE
Recommended Project Structure
cybertrail-academy/
├── index.html
├── README.md
├── LICENSE
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── audio/
├── src/
│   ├── main.js
│   ├── game/
│   │   ├── config.js
│   │   ├── scenes/
│   │   ├── systems/
│   │   ├── components/
│   │   └── entities/
│   ├── ui/
│   ├── data/
│   │   ├── campaigns/
│   │   ├── missions/
│   │   ├── concepts/
│   │   ├── dialogue/
│   │   └── assessments/
│   ├── services/
│   │   ├── saveService.js
│   │   ├── masteryService.js
│   │   ├── reviewService.js
│   │   └── contentService.js
│   ├── styles/
│   └── assets/
├── tests/
│   ├── mastery/
│   ├── missions/
│   └── save/
└── docs/
    ├── GAME_BIBLE.md
    ├── CONTENT_GUIDE.md
    ├── TECHNICAL_PLAN.md
    └── ROADMAP.md
Architectural Requirements
* Missions must load from external data.
* Concept tracking must be independent of scene code.
* Save data must be versioned.
* Content validation should detect missing concept IDs or invalid mission references.
* The mastery engine must be unit tested.
* The game must remain usable if audio is disabled.
* No sensitive personal data should be collected in the MVP.
* No backend dependency should be required.

⸻

36. MASTERY ENGINE LOGIC
A correct answer may produce one of several evidence types:
* Exposure
* Recognition
* Application
* Reasoning
* Assessment
Qualifying Competency Demonstration
A demonstration qualifies only when:
* It is an application, reasoning, or assessment activity.
* It is the first meaningful attempt.
* No answer-revealing hint was used.
* The scenario is marked as independent.
* The player has not previously completed the identical challenge for credit.
Competency Algorithm
Concept begins with a competency streak of zero.
When the player completes a qualifying demonstration correctly:
* If the scenario context differs from the previous qualifying scenario, increase streak by one.
* Record the evidence.
* When the streak reaches two, set status to competent.
When the player answers incorrectly:
* Record the misconception.
* Reset the active competency streak to zero.
* Keep prior evidence history.
* Schedule a future corrective encounter.
Mastery Algorithm
After competency:
* Wait for a future mission or review interval.
* Present a new scenario with a related distractor.
* Require a correct first-attempt application or reasoning answer.
* Set status to mastered.
Mastery can become due for review later without removing the achievement history.

⸻

37. ANALYTICS FOR FUTURE VERSIONS
The MVP stores data locally.
Future privacy-conscious analytics may measure:
* Mission completion
* Common misconceptions
* Time spent per activity
* Hint use
* Drop-off points
* Competency completion
* Review effectiveness
Analytics must not collect unnecessary personal information.
Classroom dashboards are a future feature, not part of the first build.

⸻

38. FUTURE AI FEATURES
AI should not be required for the MVP.
Possible later uses:
* NPC explanations adapted to player history
* Free-text reasoning evaluation
* Dynamic hints
* Scenario variations
* Personalized review missions
* Instructor content generation
* Misconception summaries
All AI-generated educational content should be validated before being used for competency decisions.
A deterministic rule-based system should control mastery during the initial product.

⸻

39. DEVELOPMENT PHASES
Phase 1: Foundation
Create:
* Repository
* Project structure
* Basic game scene
* Player movement
* NPC interaction
* Dialogue system
* Save system
* Content loader
Phase 2: Learning Systems
Create:
* Concept database
* Mastery engine
* Competency Matrix
* CyberDex
* Mission tracking
* Debrief system
Phase 3: Vertical Slice
Build Missions 1 through 3 with:
* BrightPath environment
* Maya, Ben, and Alex
* Firewall puzzle
* Consequence feedback
* Competency tracking
Phase 4: Full MVP Campaign
Build Missions 4 through 15.
Phase 5: Quality and Accessibility
Add:
* Responsive layout
* Touch controls
* Accessibility settings
* Save migration
* Testing
* Error handling
* Content validation
Phase 6: Deployment and User Testing
Deploy the game and test it with Security+ students.

⸻

40. VERTICAL-SLICE SUCCESS CRITERIA
Before building the entire campaign, the first three missions should prove that:
* The game runs on desktop and phone.
* The player can move and interact.
* Dialogue is readable.
* A mission can be loaded from JSON.
* The player can gather evidence.
* The player can make a configuration decision.
* The consequence is shown.
* Mastery evidence is recorded.
* The Competency Matrix updates.
* Progress survives a page refresh.
* A nontechnical user can understand the objective.
If the vertical slice fails these tests, correct the foundation before adding more missions.

⸻

41. TESTING REQUIREMENTS
Functional Testing
Test:
* New game
* Continue game
* Save and load
* Mission completion
* Incorrect answers
* Hint use
* Competency streak reset
* Competency unlock
* Mastery unlock
* CyberDex discovery
* Mobile controls
* Keyboard controls
Content Testing
For every mission verify:
* Correct answer
* Distractor quality
* Explanation accuracy
* Objective mapping
* Concept IDs
* Competency evidence
* Review scheduling
Educational Testing
Ask test players:
* What did you learn?
* Why was the correct action correct?
* What would you do in a similar situation?
* Which part was confusing?
* Did the activity feel like a quiz?
* Could you remember the concept several days later?

⸻

42. BUSINESS AND EXPANSION MODEL
The MVP should validate learning before monetization.
Potential future models:
* Free starter campaign
* Paid certification campaigns
* School or workforce licenses
* Instructor dashboards
* Team training
* Premium adaptive study tools
* Certification bundles
The product should never sell mastery status or allow players to bypass competency requirements through payment.

⸻

43. FUTURE CAMPAIGNS
Network+ Campaign
Focus:
* Network architecture
* Devices
* Protocols
* Troubleshooting
* Operations
CCNA Campaign
Focus:
* Routing
* Switching
* VLANs
* Trunking
* Spanning Tree
* OSPF
* Access control
* Device configuration
CySA+ Campaign
Focus:
* Detection
* Threat hunting
* Vulnerability management
* Incident analysis
PenTest+ Campaign
Focus:
* Scoping
* Reconnaissance
* Exploitation concepts
* Reporting
* Remediation
The same city and learning engine should support all campaigns.

⸻

44. NONNEGOTIABLE PRODUCT RULES
1. The game is not a decorated quiz bank.
2. Competency requires repeated first-attempt application.
3. Incorrect choices must produce meaningful explanations.
4. Missions must show how systems connect.
5. Educational content remains separate from engine code.
6. The MVP remains small and testable.
7. The player is never mocked for mistakes.
8. No feature is added merely because other games have it.
9. Technical accuracy must be reviewed.
10. The game teaches professional reasoning, not only exam answers.

⸻

45. INITIAL CODING-AGENT INSTRUCTION
Use the following instruction when handing this project to a coding-focused AI agent:
Build Instruction
You are the lead developer for CyberTrail Academy, a mobile-first, browser-based cybersecurity learning game.
Treat the attached Cyber World Game Bible as the authoritative product specification.
Your immediate assignment is not to build the entire final game. Build a technically clean vertical slice covering the foundation and the first three missions.
Use TypeScript, Phaser 3, Vite, and a responsive HTML/CSS interface unless a major technical limitation makes another lightweight browser stack clearly superior.
Requirements:
1. Create a well-organized repository using the architecture described in the Game Bible.
2. Implement a top-down headquarters and BrightPath environment.
3. Add basic player movement for keyboard and touch.
4. Add NPC interaction and reusable dialogue.
5. Load missions and concepts from JSON or TypeScript data files.
6. Implement Mission 1, Mission 2, and Mission 3.
7. Implement a deterministic mastery engine.
8. A competency box must require two qualifying first-attempt successes in distinct contexts, with an incorrect attempt resetting the active streak.
9. Guided tutorial activities must not count toward competency.
10. Implement the Competency Matrix, CyberDex, mission log, debrief screen, and local save system.
11. Make the game installable as a Progressive Web App.
12. Add automated tests for save behavior and mastery logic.
13. Include clear README setup, development, test, and deployment instructions.
14. Do not add multiplayer, accounts, a backend, AI dialogue, combat, character customization, or unrelated game systems.
15. Use placeholder original art made from simple shapes and icons. Do not use copyrighted assets.
16. Optimize for clarity, maintainability, accessibility, and phone use.
17. Stop after the vertical slice is functional and provide a structured report covering:
* What was built
* File structure
* How to run it
* How mission data works
* How mastery logic works
* Tests completed
* Known limitations
* Recommended next steps
Before coding, produce a concise implementation plan and identify any specification conflicts. Do not redesign the product without documenting the reason.

⸻

46. DEFINITION OF DONE FOR VERSION 0.1
Version 0.1 is complete when:
* A player can launch the game.
* Maya introduces the player to the SOC.
* The player completes the terminology tutorial.
* The player travels to BrightPath.
* The player investigates the inaccessible website.
* The player correctly configures TCP port 443.
* The player sees why opening all ports is unsafe.
* Mission content loads from structured data.
* Progress saves locally.
* The CyberDex records concepts.
* The Competency Matrix displays progress.
* The mastery engine correctly enforces first-attempt and streak rules.
* The experience works on a phone and desktop.
* Automated mastery tests pass.
* The project is deployed to a shareable web address.

⸻

47. FINAL PRODUCT STATEMENT
CyberTrail Academy teaches cybersecurity by allowing players to live inside the systems they are learning.
Firewalls become checkpoints.
Certificates become trusted identity documents.
Encryption keys become tools with distinct jobs.
Logs become evidence.
Incidents become stories.
Security+ becomes the first journey through Cyber World—not a stack of definitions to memorize, but a connected system the player learns to understand and protect.
