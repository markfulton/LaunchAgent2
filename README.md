**Purpose:** This repository instructs a hosted **OpenHands** coding agent to autonomously research a product/app and generate a complete set of **18 launch deliverables**, plus a polished **static Launch Dashboard** (HTML/CSS/JS) that displays everything with copy-to-clipboard.

The **only required input** from the user is the **product/app URL**. If other details are missing, the agent **must ask clarifying questions**, then proceed with explicit assumptions when answers aren’t provided.

---

## 1) Operating Mode (Ask → Research → Plan → Generate → Package)

1. **Ask (Clarify):** If anything below is unknown, ask succinct questions (batch them into one message if possible). Proceed after either answers or a timeout using explicit assumptions.
    
2. **Research:** Browse and extract facts from the product site and credible sources. Save citations. Build a structured research dossier.
    
3. **Plan:** Draft a concise plan for ICP, positioning, and the content strategy covering all 18 deliverables.
    
4. **Generate:** Produce each deliverable, tailored to the product’s ICP and positioning. Follow the acceptance criteria and channel constraints.
    
5. **Package:**
    
    - Write all outputs to `/deliverables/` as Markdown + a compiled `deliverables.json` index.
        
    - Build `/dashboard/` — a zero-build static Launch Dashboard (clean HTML/CSS/JS) with copy buttons and source links.
        
    - Persist all research artifacts and logs.
        

---

## 2) Inputs & Repository Contract

- **Minimum required input**: `product_url` (from user or `/data/product_url.txt`).
    
- **Optional inputs** (if available, else ask):
    
    - Brand name / short description
        
    - Launch date & stage (beta/GA)
        
    - ICP hints (roles, industries, geos)
        
    - Pricing / packaging
        
    - Brand voice (e.g., confident, playful, technical)
        
    - Channels to prioritize / avoid
        
    - Competitors (if known)
        

> If optional inputs are missing, the agent **must** ask for them first. If unanswered, proceed with reasonable, clearly documented assumptions.

**Repo layout (agent may create if missing):**

/data/
  product_url.txt         # required (single line URL) — or provided in chat
  inputs.json             # optional: user-provided context
/research/
  notes.md
  sources.csv             # url, title, author/site, date_accessed, relevance
  research.json           # structured facts, ICP, competitors, messaging
/deliverables/
  01_icp_and_positioning.md
  02_landing_page_copy.md
  ...
  18_ad_copy.md
  deliverables.json
/dashboard/
  index.html
  styles.css
  app.js
/dashboard/pages/
  01_icp_and_positioning.html
  02_landing_page_copy.html
  ...
/logs/
  session.md              # key decisions, assumptions, cost/time notes
index.html                # Loading page that redirects to /dashboard/
README.md


---

## 3) Clarifying Questions (ask once, grouped)

Ask these in a single message if details are unknown:

1. **Who’s your primary ICP?** (roles, industries, company size, geo)
    
2. **Top 3 pain points** your product solves?
    
3. **Differentiators** vs competitors?
    
4. **Current status** (alpha/beta/GA) and **launch date** target?
    
5. **Brand voice & tone** (e.g., friendly, analytical, playful, premium)?
    
6. **Key CTA** (join waitlist, book demo, install app, subscribe)?
    
7. **Constraints** (regulated content, claims to avoid, trademark terms)?
    
8. **Channels to prioritize** (PH, LinkedIn, Reddit, email, ads) and any to avoid?
    
9. **Assets available** (logo, screenshots, brand colors/typography URL)?
    
10. **Pricing** and **free trial** details (if any)?
    

If no reply, proceed using assumptions; **record assumptions** in `/logs/session.md` and annotate them wherever they affect outputs.

---

## 4) Research Protocol

1. **Crawl product_url**: homepage, features, pricing, docs, blog, FAQ, about, careers (signals ICP), changelog/roadmap.
    
2. **Extract**: value props, messaging, features, onboarding flow, pricing tiers, social proof, target personas, technical stack hints.
    
3. **Landscape**: identify category, adjacent categories, 3–5 notable competitors, and alternatives.
    
4. **ICP synthesis**: segment primary vs secondary ICPs; map pains → features → outcomes → proof.
    
5. **Evidence & citations**: record all sources in `/research/sources.csv`. Quote minimally; prefer paraphrase with links.
    
6. **Notes & structure**: consolidate in `/research/notes.md` and `/research/research.json`.
    

**Cost control:** summarize long pages, avoid full-page dumps, store only essential quotes, dedupe facts.

---

## 5) Deliverables (18) — Definition of Done (DoD) & File Targets

> Write each deliverable to its own Markdown file in `/deliverables/` and register a compact entry in `deliverables.json` with keys: `id`, `title`, `summary`, `target_channel`, `length_hint`, `tone`, `citations[]`, `file`.  
> **All deliverables must:** reflect ICP pains & differentiators, be fact-checked, actionable, concise, and **clearly mark any assumptions**.

1. **ICP & Market Positioning Analysis** → `01_icp_and_positioning.md`
    
    - Personas (role, industry, maturity), pains, desired outcomes, JTBD.
        
    - Category, subcategory, POV vs competitors, 1–2 crisp positioning statements.
        
    - 1-page executive summary + table mapping pains → features → benefits → proof.
        
2. **Enhanced Landing Page Copy** → `02_landing_page_copy.md`
    
    - Above-the-fold: headline, subhead, primary CTA.
        
    - Sections: Problem, Solution, Key Features (3–6), Social Proof, Pricing CTA.
        
    - Include wireframe content order and microcopy suggestions.
        
3. **Social Media Announcement Copy** → `03_social_announcement.md`
    
    - Variants for X/Twitter (≤280 chars), LinkedIn (≤1200 chars), Facebook.
        
    - 3 tone options (professional, punchy, friendly). Hashtags limited & relevant.
        
4. **Social Engagement Copy** → `04_social_engagement.md`
    
    - 10 replies/prompts to spark thread conversations; question-led; non-salesy.
        
5. **Lead Magnet + Copy** → `05_lead_magnet.md`
    
    - Concept (checklist, cheatsheet, mini-guide) + outline + landing copy + follow-up CTA. Provide downloadable outline content.
        
6. **Email Launch Announcement** → `06_email_announcement.md`
    
    - Subject (5 options), preview text, body with benefits & single CTA.
        
7. **Drip Email Sequence (Launch Week)** → `07_email_drip_sequence.md`
    
    - 5–7 emails (Day 0, 2, 4, 6, 8, optional 10/12). Objective + subject + body + CTA per email.
        
8. **App Directories Template** → `08_app_directories.md`
    
    - Name, 80/160/250-char descriptions, categories, tags, logo dims, screenshots list, privacy text. Provide a CSV snippet for bulk submissions.
        
9. **Reddit Launch Post (non-salesy)** → `09_reddit_launch.md`
    
    - Story-first, value-add, lessons learned, ask for feedback, rules-aware.
        
10. **Reddit “What are you building?” Comments (×5)** → `10_reddit_comments.md`
    
    - 5 variations tailored for weekly threads; conversational, concise.
        
11. **Product Hunt Launch + First Founder Comment** → `11_producthunt.md`
    
    - Maker’s comment, tagline options, topic tags, gallery copy, FAQ.
        
12. **LinkedIn Post Announcement** → `12_linkedin_post.md`
    
    - Hook, value prop, outcome framing, soft CTA; 3 variants; line breaks for readability.
        
13. **Facebook Groups Announcement** → `13_facebook_groups.md`
    
    - Short, clear value, community-friendly tone; 2 variants.
        
14. **Direct Outreach DM (ICP)** → `14_direct_dm.md`
    
    - 3 variants: cold intro, warm intro, “mutual group” intro; <600 chars; **no pushy CTA**.
        
15. **SEO Articles (2–3)** → `15_seo_articles.md`
    
    - Titles, outlines, intros, and full drafts (~800–1200 words each).
        
    - Intent alignment (informational/commercial), internal link suggestions.
        
16. **Press Release** → `16_press_release.md`
    
    - Standard PR structure (dateline, boilerplate, media contact). Factual tone.
        
17. **Virtual Assistant Hiring & SOP** → `17_va_hiring_and_sop.md`
    
    - Roles to hire (JD bullets), budget ranges, onboarding checklist.
        
    - Weekly marketing SOP with cadences, KPIs, and templates.
        
18. **Ad Copy Generation** → `18_ad_copy.md`
    
    - 5–10 variants per channel (Search, Facebook, LinkedIn).
        
    - Include primary text, headline, description, and 3 CTA options per ad.
        

---

## 6) Launch Dashboard (Static Site) — Requirements

Generate a **multi-page, buildless** micro-site in `/dashboard/` by converting all deliverable markdown into clean HTML and support copying to clipboard of each section and actionable item within each deliverable.

**Tech constraints:**

- Pure **HTML/CSS/JS** (no build step).
    
- Use a minimalist CSS framework via CDN (e.g., **Pico.css** or **Tailwind CDN**).
    
- **No external tracking**, no dependencies beyond CDN CSS.
    
- Mobile-first, accessible (ARIA labels, semantic HTML).
    

**Functional requirements:**

- Left sidebar (sticky): section navigation (18 items + Research & Assumptions).
    
- Main content: each deliverable in a `Card` with:
    
    - Title, short summary, channel tags
        
    - “Copy” button → copies the content block to clipboard (show toast)
        
    - “Open source(s)” button when citations exist (opens modal with links)
        
- Top bar: Product name, primary CTA, link to product_url.
    
- Footer: generation timestamp, model info (if available), disclaimer for assumptions, built with 'Launch Agent'.
    

**Files to create:**

- `index.html` — structure & sections.
    
- `styles.css` — light/dark aware, readable typography.
    
- `app.js` — load `../deliverables/deliverables.json`, render cards, bind copy buttons, open citations modal.

- `pages/01_icp_and_positioning.html`, `pages/02_landing_page_copy.html`, ... — include breadcrumbs, consistent theme, granular copy-to-clipboard functionality
    

**Data source:**  
Render from `/deliverables/deliverables.json`. Each item should contain:

[
  {
    "id": "03",
    "title": "Social Media Announcement",
    "target_channel": ["Twitter","LinkedIn","Facebook"],
    "summary": "Short, medium, long variants for launch.",
    "md_path": "03_social_announcement.md",
    "html_page": "/dashboard/pages/03_social_announcement.html",
    "citations": [{"label":"Pricing page","url":"https://..."}],
    "word_count": 612,
    "generated_at": "2025-09-19T10:03:00Z"
  }
]


---

## 7) Quality Bar, Style & Safety

**Must-haves across all outputs:**

- Tailored to ICP pains and outcomes; avoids generic fluff.
    
- Concrete claims only if supported by research; otherwise “we expect / early results indicate …”.
    
- Channel-appropriate length & tone (e.g., X ≤280 chars).
    
- Clear CTA, not spammy.
    
- Inclusive, compliant, avoids medical/financial/legal advice unless qualified.
    

**Checklists before writing files:**

-  All assumptions recorded in `/logs/session.md`.
    
-  Each deliverable cites sources if referencing data.
    
-  No competitor disparagement; fair positioning only.
    
-  Spelling/grammar pass; remove clichés and filler.
    
-  Consistent terminology (features, plan names, CTA labels).
    

---

## 8) Tooling & Implementation Notes (for the Agent)

- **Browsing:** Use the hosted browser tool to fetch and summarize pages. Respect `robots.txt` where appropriate; throttle requests.
    
- **Parsing:** Prefer HTML→text extraction and summary. Keep quotations minimal; store links in `/research/sources.csv`.
    
- **Storage:**
    
    - Research: `/research/notes.md`, `/research/research.json` (structured: `icp`, `positioning`, `competitors`, `features`, `pricing`, `voice`, `assumptions[]`).
        
    - Deliverables: one Markdown file per deliverable + `deliverables.json`.
        
    - Logs: `/logs/session.md` with a bulleted timeline of major steps, clarifications asked, assumptions, and any cost/time annotations.
        
- **Robustness:** If site content is sparse, broaden research to reputable sources (docs, blog, review sites) and **mark gaps**.
    
- **Cost-awareness:** Summarize long sources first; defer full reads; avoid repeating fetches; reuse notes.
    

---

## 9) Output Formatting Templates (concise)

**Positioning Statement (template):**

`For [ICP/role] who struggle with [primary pain], [Product] is a [category] that provides [core value/outcome] unlike [alt/competitor], because [key differentiator].`

**Email (body skeleton):**

Hi {FirstName},

[Hook tied to pain/outcome].
With {Product}, you can {benefit 1}, {benefit 2}, and {benefit 3}.
Here’s how it works (30–50 words): {how_it_works}.

Want to try it? {CTA_link}

– {FounderName}


**Reddit Launch (non-salesy skeleton):**

`What we built, why (problem story), what we learned, early results, what we tried that didn’t work, what we’re still unsure about. Ask: “Happy to answer questions and share the stack if helpful.”`

**Ad Variant (JSON record for each):**

{
  "channel": "LinkedIn",
  "primary_text": "...",
  "headline": "...",
  "description": "...",
  "cta": "Start free trial"
}

---

## 10) Definition of Done (overall)

-  Clarifying questions asked (or assumptions logged).
    
-  Research dossier complete with citations.
    
-  All **18 deliverables** generated, saved, and indexed in `deliverables.json`.
    
-  **Launch Dashboard** in `/dashboard/` renders all deliverable pages with working copy buttons and citation modals.
        
-  `/logs/session.md` contains assumptions, key decisions, and next-step suggestions.
    

---

## 11) Quick Start (for the Agent)

1. Read `/data/product_url.txt`. If missing, ask the user for the URL.
    
2. Ask grouped clarifying questions (Section 3).
    
3. Crawl and compile `/research/` artifacts.
    
4. Generate all deliverables to `/deliverables/` + `deliverables.json`.
    
5. Build `/dashboard/` (HTML/CSS/JS, no build tool). Index file in root redirects user to /dashboard/.
    
6. Post a short summary with: key ICP, positioning, and a link to `/dashboard/index.html`.
    

---

## 12) Notes for the Founder (human)

- You can edit and upload the provided `PREFERENCES.json` with preferences before running the agent.
    
- After generation, open `/dashboard/index.html` locally or deploy via static hosting (GitHub Pages, Netlify).
    
- If anything looks off, update `/research/research.json` or deliverable files and re-run the “Package” step (the agent can refresh the dashboard automatically).
    

---

**End of README** 🧭
