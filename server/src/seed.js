/**
 * ============================================================================
 * MODULE: Database Seed Script
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - This script seeds the database with initial training categories, modules,
 *   and lessons. Run it once to populate the database.
 * - All content is strictly database-driven — this seed data demonstrates
 *   the dynamic content architecture.
 * ============================================================================
 */
require('dotenv').config();
const { createRepository } = require('./repositories/repositoryFactory');

const categoryRepo = createRepository('categories');
const moduleRepo = createRepository('modules');
const lessonRepo = createRepository('lessons');

// ---------------------------------------------------------------------------
// Seed Data: Training Categories
// ---------------------------------------------------------------------------
const categories = [
    {
        id: 'cat-sharepoint',
        name: 'SharePoint',
        description: 'Master enterprise document management, team sites, and collaboration with SharePoint Online.',
        icon: 'share-2',
        color: '#0078D4',
        order: 1,
        moduleCount: 3,
    },
    {
        id: 'cat-teams',
        name: 'Microsoft Teams',
        description: 'Unlock the full potential of Teams for communication, meetings, and workflow automation.',
        icon: 'users',
        color: '#6264A7',
        order: 2,
        moduleCount: 3,
    },
    {
        id: 'cat-onedrive',
        name: 'OneDrive',
        description: 'Secure cloud storage, file sharing, and seamless synchronization across devices.',
        icon: 'cloud',
        color: '#0364B8',
        order: 3,
        moduleCount: 2,
    },
    {
        id: 'cat-office365',
        name: 'Office 365 Suite',
        description: 'Productivity masterclass covering Word, Excel, PowerPoint, and Outlook best practices.',
        icon: 'layout-grid',
        color: '#D83B01',
        order: 4,
        moduleCount: 3,
    },
    {
        id: 'cat-genai',
        name: 'GenAI & Copilot',
        description: 'Explore the AI revolution — hands-on Copilot prompt engineering and GenAI use cases.',
        icon: 'sparkles',
        color: '#8B5CF6',
        order: 5,
        moduleCount: 3,
    },
    {
        id: 'cat-security',
        name: 'Security & Compliance',
        description: 'Enterprise security best practices, data governance, and compliance frameworks.',
        icon: 'shield',
        color: '#10B981',
        order: 6,
        moduleCount: 2,
    },
];

// ---------------------------------------------------------------------------
// Seed Data: Training Modules
// ---------------------------------------------------------------------------
const modules = [
    // SharePoint
    { id: 'mod-sp-101', categoryId: 'cat-sharepoint', title: 'SharePoint Fundamentals', description: 'Get started with SharePoint — sites, lists, libraries, and permissions.', duration: '45 min', difficulty: 'Beginner', order: 1, lessonCount: 3 },
    { id: 'mod-sp-201', categoryId: 'cat-sharepoint', title: 'Document Management', description: 'Version control, metadata, content types, and document workflows.', duration: '60 min', difficulty: 'Intermediate', order: 2, lessonCount: 3 },
    { id: 'mod-sp-301', categoryId: 'cat-sharepoint', title: 'SharePoint Administration', description: 'Site collection admin, hub sites, search configuration, and governance.', duration: '90 min', difficulty: 'Advanced', order: 3, lessonCount: 2 },

    // Teams
    { id: 'mod-tm-101', categoryId: 'cat-teams', title: 'Teams Essentials', description: 'Chat, channels, video calls, and getting started with Teams.', duration: '30 min', difficulty: 'Beginner', order: 1, lessonCount: 3 },
    { id: 'mod-tm-201', categoryId: 'cat-teams', title: 'Advanced Meetings', description: 'Breakout rooms, webinars, live events, and recording best practices.', duration: '45 min', difficulty: 'Intermediate', order: 2, lessonCount: 2 },
    { id: 'mod-tm-301', categoryId: 'cat-teams', title: 'Teams Apps & Automation', description: 'Power Automate flows, custom tabs, bots, and third-party integrations.', duration: '75 min', difficulty: 'Advanced', order: 3, lessonCount: 2 },

    // OneDrive
    { id: 'mod-od-101', categoryId: 'cat-onedrive', title: 'OneDrive Basics', description: 'Upload, sync, share files and set up OneDrive on all your devices.', duration: '25 min', difficulty: 'Beginner', order: 1, lessonCount: 2 },
    { id: 'mod-od-201', categoryId: 'cat-onedrive', title: 'Advanced Sharing & Security', description: 'External sharing policies, sensitivity labels, and ransomware recovery.', duration: '40 min', difficulty: 'Intermediate', order: 2, lessonCount: 2 },

    // Office 365
    { id: 'mod-o365-101', categoryId: 'cat-office365', title: 'Excel Power User', description: 'Pivot tables, VLOOKUP, conditional formatting, and data analysis.', duration: '60 min', difficulty: 'Intermediate', order: 1, lessonCount: 3 },
    { id: 'mod-o365-102', categoryId: 'cat-office365', title: 'PowerPoint Mastery', description: 'Design principles, animations, presenter view, and template creation.', duration: '45 min', difficulty: 'Beginner', order: 2, lessonCount: 2 },
    { id: 'mod-o365-103', categoryId: 'cat-office365', title: 'Outlook Productivity', description: 'Rules, focused inbox, calendar management, and email etiquette.', duration: '35 min', difficulty: 'Beginner', order: 3, lessonCount: 2 },

    // GenAI & Copilot
    { id: 'mod-ai-101', categoryId: 'cat-genai', title: 'Introduction to AI & Copilot', description: 'What is generative AI? Understanding Copilot across the M365 ecosystem.', duration: '30 min', difficulty: 'Beginner', order: 1, lessonCount: 3 },
    { id: 'mod-ai-201', categoryId: 'cat-genai', title: 'Prompt Engineering Lab', description: 'Hands-on exercises in crafting effective prompts for Copilot in Word, Excel, and Teams.', duration: '60 min', difficulty: 'Intermediate', order: 2, lessonCount: 3 },
    { id: 'mod-ai-301', categoryId: 'cat-genai', title: 'AI Administration & Governance', description: 'Copilot licensing, data governance, responsible AI practices, and deployment strategies.', duration: '75 min', difficulty: 'Advanced', order: 3, lessonCount: 2 },

    // Security
    { id: 'mod-sec-101', categoryId: 'cat-security', title: 'Security Awareness Essentials', description: 'Phishing detection, MFA setup, password hygiene, and incident reporting.', duration: '25 min', difficulty: 'Beginner', order: 1, lessonCount: 2 },
    { id: 'mod-sec-201', categoryId: 'cat-security', title: 'Data Classification & DLP', description: 'Sensitivity labels, data loss prevention policies, and compliance dashboards.', duration: '50 min', difficulty: 'Intermediate', order: 2, lessonCount: 2 },
];

// ---------------------------------------------------------------------------
// Seed Data: Lessons (sample for key modules)
// ---------------------------------------------------------------------------
const lessons = [
    // SharePoint Fundamentals
    { id: 'les-sp-101-1', moduleId: 'mod-sp-101', title: 'What is SharePoint?', content: '## Welcome to SharePoint\n\nSharePoint is Microsoft\'s enterprise content management and collaboration platform. It enables organizations to create websites, store and share documents, and manage information across teams.\n\n### Key Concepts\n- **Sites**: The fundamental building block — team sites and communication sites\n- **Lists**: Structured data storage (like spreadsheets but more powerful)\n- **Libraries**: Document storage with version control and metadata\n- **Permissions**: Granular access control at every level\n\n### Why SharePoint?\nSharePoint integrates deeply with the entire Microsoft 365 ecosystem, making it the backbone of enterprise collaboration.', order: 1 },
    { id: 'les-sp-101-2', moduleId: 'mod-sp-101', title: 'Creating Your First Site', content: '## Creating a SharePoint Site\n\n### Step 1: Choose Your Site Type\n- **Team Site**: Connected to a Microsoft 365 Group, ideal for project collaboration\n- **Communication Site**: For broadcasting information to a broad audience\n\n### Step 2: Configure Settings\n1. Navigate to sharepoint.com and click **+ Create site**\n2. Select your site type\n3. Name your site and set the privacy level\n4. Add members and assign permissions\n\n### Best Practices\n- Use consistent naming conventions\n- Set up metadata standards early\n- Plan your navigation structure before adding content', order: 2 },
    { id: 'les-sp-101-3', moduleId: 'mod-sp-101', title: 'Lists and Libraries Deep Dive', content: '## Working with Lists & Libraries\n\n### Lists\nLists are powerful structured data containers. Think of them as databases with a user-friendly interface.\n\n**Common List Types:**\n- Task Lists\n- Issue Tracking\n- Custom Lists with your own columns\n\n### Document Libraries\nLibraries store files with rich metadata, versioning, and co-authoring support.\n\n**Key Features:**\n- Major and minor versioning\n- Check-in / Check-out\n- Content approval workflows\n- Metadata navigation and filtering\n\n### Pro Tips\n- Always add metadata columns — don\'t rely on folder structures\n- Enable versioning from day one\n- Use views to create different perspectives of your data', order: 3 },

    // Teams Essentials
    { id: 'les-tm-101-1', moduleId: 'mod-tm-101', title: 'Getting Started with Teams', content: '## Welcome to Microsoft Teams\n\nMicrosoft Teams is the hub for teamwork in Microsoft 365. It brings together chat, meetings, files, and apps in one place.\n\n### Core Features\n- **Chat**: 1:1 and group conversations with rich media support\n- **Channels**: Organized conversations by topic within a team\n- **Meetings**: Video conferencing with screen sharing and recording\n- **Files**: Every team gets a SharePoint site for document storage\n\n### First Steps\n1. Download the desktop and mobile apps\n2. Set your profile picture and status\n3. Join or create your first team\n4. Start a conversation in a channel', order: 1 },
    { id: 'les-tm-101-2', moduleId: 'mod-tm-101', title: 'Channels and Conversations', content: '## Mastering Channels\n\n### Channel Types\n- **Standard**: Visible to all team members\n- **Private**: Restricted to specific members\n- **Shared**: Cross-team collaboration channels\n\n### Conversation Best Practices\n- Use **@mentions** to get someone\'s attention\n- **Reply in threads** to keep conversations organized\n- Use **rich text formatting** for clarity\n- Pin important messages for easy reference\n\n### Tips for Productivity\n- Mute channels with low priority\n- Set up channel notifications wisely\n- Use the activity feed as your daily dashboard', order: 2 },
    { id: 'les-tm-101-3', moduleId: 'mod-tm-101', title: 'Effective Video Meetings', content: '## Running Effective Meetings in Teams\n\n### Before the Meeting\n- Create an agenda in the meeting notes\n- Test your audio and video\n- Share relevant documents in advance\n\n### During the Meeting\n- Use **background blur** or virtual backgrounds\n- Share your screen or a specific window\n- Use **reactions** for non-verbal feedback\n- Record the meeting for those who can\'t attend\n\n### After the Meeting\n- Review the automated transcript\n- Share action items via Tasks\n- Follow up in the meeting chat', order: 3 },

    // GenAI Introduction
    { id: 'les-ai-101-1', moduleId: 'mod-ai-101', title: 'What is Generative AI?', content: '## Understanding Generative AI\n\n### The AI Revolution\nGenerative AI refers to AI systems that can create new content — text, images, code, and more — based on patterns learned from training data.\n\n### Key Concepts\n- **Large Language Models (LLMs)**: The engines behind tools like Copilot\n- **Prompts**: Instructions you give to the AI\n- **Tokens**: The units of text that AI processes\n- **Hallucinations**: When AI generates plausible but incorrect information\n\n### AI in the Enterprise\nMicrosoft 365 Copilot brings generative AI directly into the tools you use every day:\n- **Word**: Draft documents, summarize content\n- **Excel**: Analyze data, create formulas\n- **PowerPoint**: Generate presentations from prompts\n- **Teams**: Summarize meetings, draft responses\n- **Outlook**: Write and summarize emails', order: 1 },
    { id: 'les-ai-101-2', moduleId: 'mod-ai-101', title: 'Your First Copilot Experience', content: '## Hands-On: Using Copilot\n\n### Getting Started\n1. Look for the **Copilot icon** in your M365 apps\n2. Click it to open the Copilot pane\n3. Type your first prompt\n\n### Example Prompts\n**In Word:**\n> "Draft a project proposal for migrating our file server to SharePoint Online. Include a timeline, risks, and benefits."\n\n**In Excel:**\n> "Analyze this sales data. Show me trends by quarter and highlight any anomalies."\n\n**In Teams:**\n> "Summarize the key decisions from today\'s meeting and list the action items with assignees."\n\n### Tips for Better Results\n- Be specific about what you want\n- Provide context about your audience\n- Iterate — refine your prompts based on results\n- Always review AI-generated content before sharing', order: 2 },
    { id: 'les-ai-101-3', moduleId: 'mod-ai-101', title: 'Responsible AI Principles', content: '## Using AI Responsibly\n\n### Microsoft\'s Responsible AI Principles\n1. **Fairness**: AI should treat all people equitably\n2. **Reliability**: AI systems should perform reliably and safely\n3. **Privacy**: AI should respect privacy and handle data securely\n4. **Inclusiveness**: AI should empower everyone\n5. **Transparency**: AI systems should be understandable\n6. **Accountability**: People should be accountable for AI systems\n\n### Your Responsibilities\n- **Always review** AI-generated content before sharing\n- **Don\'t share sensitive data** in public AI tools\n- **Report issues** when AI produces biased or incorrect output\n- **Stay informed** about your organization\'s AI policies\n\n### Data Sovereignty\nYour Copilot data stays within the Microsoft 365 compliance boundary. It inherits the same security and compliance policies as the rest of your M365 data.', order: 3 },

    // Prompt Engineering Lab
    { id: 'les-ai-201-1', moduleId: 'mod-ai-201', title: 'The Anatomy of a Great Prompt', content: '## Crafting Effective Prompts\n\n### The RICE Framework\n- **R**ole: Tell the AI who it should act as\n- **I**nstructions: Be clear about what you want\n- **C**ontext: Provide relevant background information\n- **E**xamples: Show what good output looks like\n\n### Example\n```\nRole: You are a technical writer for an enterprise IT department.\nInstruction: Write a user guide for setting up MFA on mobile devices.\nContext: Our users range from tech-savvy to beginners. We use Microsoft Authenticator.\nExample: See the format of our VPN setup guide for tone and structure.\n```\n\n### Common Mistakes\n- Being too vague: "Write something about SharePoint"\n- Being too long: overwhelming the AI with unnecessary detail\n- Not iterating: accepting the first result without refinement', order: 1 },
    { id: 'les-ai-201-2', moduleId: 'mod-ai-201', title: 'Copilot in Word & PowerPoint', content: '## Hands-On Lab: Document & Presentation Creation\n\n### Exercise 1: Policy Document\nUse Copilot in Word to draft a work-from-home policy:\n\n```prompt\nDraft a Work From Home Policy for our organization. Include:\n- Eligibility criteria\n- Equipment requirements\n- Communication expectations\n- Performance measurement\n- Security requirements\nTone: Professional but approachable. Length: 2 pages.\n```\n\n### Exercise 2: Presentation from Document\nUse Copilot in PowerPoint:\n\n```prompt\nCreate a 10-slide presentation summarizing the Work From Home Policy.\nDesign: Professional, use our brand colors (blue and white).\nInclude speaker notes for each slide.\n```\n\n### Iteration Techniques\n- "Make section 3 more concise"\n- "Add statistics to support the benefits"\n- "Change the tone to be more formal"', order: 2 },
    { id: 'les-ai-201-3', moduleId: 'mod-ai-201', title: 'Copilot in Excel & Teams', content: '## Hands-On Lab: Data Analysis & Collaboration\n\n### Exercise 3: Excel Data Analysis\nWith a dataset loaded, try:\n\n```prompt\nAnalyze this data and:\n1. Create a pivot table showing sales by region and quarter\n2. Highlight the top 3 performing products\n3. Add a forecast for the next quarter\n4. Create a chart visualizing the trend\n```\n\n### Exercise 4: Teams Meeting Intelligence\nAfter a meeting with Copilot enabled:\n\n```prompt\nFrom today\'s project status meeting:\n- List all action items with owners and deadlines\n- Summarize the three main discussion topics\n- Flag any decisions that need follow-up approval\n- Draft a follow-up email to the team\n```\n\n### Advanced Technique: Chaining\nUse multiple prompts in sequence, each building on the previous output. This produces more refined and accurate results.', order: 3 },

    // Security Essentials
    { id: 'les-sec-101-1', moduleId: 'mod-sec-101', title: 'Recognizing Phishing Attacks', content: '## Phishing: Your First Line of Defense\n\n### What is Phishing?\nPhishing is a social engineering attack where criminals impersonate trusted entities to steal credentials or distribute malware.\n\n### Red Flags\n- 🚩 Urgent or threatening language\n- 🚩 Suspicious sender addresses\n- 🚩 Links that don\'t match the expected domain\n- 🚩 Unexpected attachments\n- 🚩 Requests for sensitive information\n\n### What To Do\n1. **Don\'t click** suspicious links\n2. **Report** to your IT security team\n3. **Verify** requests through a separate channel\n4. Use the **Report Message** button in Outlook\n\n### Multi-Factor Authentication (MFA)\nEnable MFA on all accounts. Even if your password is stolen, MFA adds a critical second layer of protection.', order: 1 },
    { id: 'les-sec-101-2', moduleId: 'mod-sec-101', title: 'Password Hygiene & MFA Setup', content: '## Securing Your Identity\n\n### Password Best Practices\n- Use a **unique password** for every service\n- Minimum **14 characters** with mixed types\n- Use a **password manager** (your organization may provide one)\n- **Never share** passwords via email or chat\n\n### Setting Up MFA\n1. Download **Microsoft Authenticator** on your phone\n2. Go to myaccount.microsoft.com > Security info\n3. Click **+ Add sign-in method**\n4. Choose **Authenticator app** and follow the wizard\n5. Set up a backup method (phone number or security key)\n\n### Recovery\n- Save your backup codes in a secure location\n- Register at least 2 MFA methods\n- Report lost devices immediately to IT', order: 2 },
];

// ---------------------------------------------------------------------------
// Run Seed
// ---------------------------------------------------------------------------
async function seed() {
    console.log('\n✦  Lumina Learning Suite — Seeding Database\n');
    console.log('   Seeding categories...');
    for (const cat of categories) await categoryRepo.create(cat);
    console.log(`   ✓ ${categories.length} categories created`);

    console.log('   Seeding modules...');
    for (const mod of modules) await moduleRepo.create(mod);
    console.log(`   ✓ ${modules.length} modules created`);

    console.log('   Seeding lessons...');
    for (const lesson of lessons) await lessonRepo.create(lesson);
    console.log(`   ✓ ${lessons.length} lessons created`);

    console.log('\n✦  Seed complete!\n');
}

// If run directly
seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});

module.exports = { seed, categories, modules, lessons };
