**ContractIQ \- Technical Documentation Intake**

*Questionnaire and documentation template for technical team inputs*

| Field | Details |
| :---- | :---- |
| Prepared for | Development / Technical Team Input |
| Product | ContractIQ |
| Purpose | Capture technical architecture, AI system details, current feature status, limitations, cost, performance, and roadmap clarity before client presentation. |
| Fill format | Use: Working / Partial / Planned / Not Available / Needs Confirmation. Add exact notes wherever possible. |
| Version | Draft 1.0 \- 2026-05-05 |

# **1\. Product Understanding and Current Scope**

Use this section to lock the current capability story before the client presentation.

| Area | Questions for Technical Team | Response / Notes |
| :---- | :---- | :---- |
| Product definition | What is ContractIQ designed to solve today? Is it a standalone product, PO2PAY module, or internal utility? | t is an enterprise-grade, AI-native contract analysis platform. It functions as the foundational **PO2PAY module**, designed to establish the baseline "Source of Truth" (financial terms, SLAs, pricing) against the contracts which the vendor sends us. |
| Current user problem | What user pain points does the current version address: extraction, review, risk detection, repository, workflow, or reporting? | **Extraction & Review.** It directly solves "Alt-Tab Fatigue" (context-switching between PDFs and ERPs) and the 4% "fat finger" manual data entry error rate. It also solves the "Black Hole of Provenance" by creating a forensic audit trail linking extracted data directly to the source document. |
| User roles | Who is the primary user today: legal, procurement, finance, admin, leadership, or shared services? | 1\. **The Validator** (Procurement/Finance Analyst): The core user who reviews the AI's work via the split-screen UI. 2\. **The Admin**: Uses AI to build zero-code extraction schemas. 3\. **Standard User**: Uploads the raw documents. |
| Current state | Which features are fully working, partially working, planned, or only conceptual? | **Working:** Zero-Code Schema Configuration (Natural Language), AI-powered extraction with reasoning and confidence scores, the "Source of Truth" Split-Screen Validation UI, and Semantic Version Control (V8 vs. V9 diffing). **Planned/Future Scope:** Direct integration from the tool to the ERP systems.  |
| Client-facing promise | What should we confidently say in a client meeting? | We reduce contract handling time from 60 minutes to under 4 minutes (a 15x productivity boost). We enable zero-code vendor onboarding in 15 minutes. Every exported data point includes an immutable, hyperlinked audit trail guaranteeing 100% data provenance. |
| Do-not-say list | What should we avoid claiming because it is not built or not tested? | **Do not claim 100% autonomous/hands-free processing.** The product is strictly architected as a Human-in-the-Loop (HITL) tool. Do not claim it acts as "legal counsel" or autonomously negotiates contract terms. Do not claim it operates without human approval gates. |

# **2\. AI System and Extraction Technology**

| Technical Area | Must-Know Questions | Response / Notes |
| :---- | :---- | :---- |
| AI model/system | Which AI system is being used: OpenAI, Azure OpenAI, Claude, Gemini, open-source model, custom model, or hybrid? | Gemini |
| Model version | What exact model/version is used for extraction, summarization, clause detection, and chat? | Gemini 2.5 Flash |
| OCR / parsing | Are we using OCR, document parser, vision model, LLM-only extraction, or a combined pipeline? | OCR |
| Scanned document handling | Can it process scanned PDFs and images? Which OCR engine is used and what are the quality limits? | Only PDFs supported. OCR service being used is Azure Document Intelligence. The quality is satisfactory for the documents we have encountered till now which include documents with complex table layouts. |
| Prompting strategy | Are prompts fixed, dynamic, or configurable by contract type/client? Where are prompts stored? | All prompts are configurable and are stored in a DB. Note: Clients do not have access to the system prompts. They can control the prompts specific to the question. |
| Schema output | Does the model produce structured JSON? Is there schema validation and retry if fields are missing? | Models are used for multiple purposes. There are cases where structured JSON is the output. Schema validation is done using Pydantic. Retry mechanisms are in place for any validation errors. |
| RAG / vector search | Is RAG used for contract Q\&A, clause library matching, or repository search? | Contract Q\&A: yes |
| Agents | Is it a multi-agent workflow? If yes, list agents: extraction agent, clause agent, risk agent, summary agent, etc. | No |
| Fine-tuning | Is there any fine-tuning or model training? If no, how is domain accuracy improved? | No. Accuracy is improved using a knowledge base of domain specific glossary and proper keyword attribution to questions. The LLM context contains the definitions of terms relevant to the domain and query. |
| Human review | Where does the system require manual review or approval before finalizing output? | After the answers are generated with the citations, human approval/verification is required before downstream business usage. |

# **3\. Contract Processing Architecture**

Please explain the current architecture from upload to final output.

| Stage | Technology Used | AI / Rule / Manual | Avg Time | Failure Cases / Notes |
| :---- | :---- | :---- | :---- | :---- |
| Document upload | JavaScript, HTTPS, FastAPI, Multi-part Form data |  | Depends on size of the document and the internet speed | File type, size, page count limits |
| Storage | AWS S3 |  |  | Where uploaded files are stored and retained |
| OCR / text extraction | Azure Document Intelligence |  | 1 min/doc | What happens for scanned or low-quality files |
| Chunking / parsing | Custom Python Code |  | 5 sec/doc | How long contracts are split or processed |
| AI extraction | Gemini |  | 30 sec to 1 min/question | Fields extracted and output format |
| Clause detection | Gemini |  | 30 sec to 1 min/question | How clauses are identified and classified |
| Risk analysis | NA |  |  | Rule-based, AI-based, or hybrid logic |
| Summary generation | Gemini |  | 30 sec to 1 min/question | Business summary, legal summary, clause summary |
| User review | JavaScript, FastAPI, Postgres |  | 5 – 10 mins/contract | Edit, approve, reject, override |
| Repository / search | Postgres |  |  | Search across contracts, filters, metadata |
| Audit log | Postgres |  |  | User actions, AI outputs, changes, approvals |
| Export / API | Python, Excel |  |  | Excel, PDF, JSON, API, ERP handoff |

# **4\. Current Feature Inventory**

| Feature | What to Confirm | Status | Demo Ready? | Notes |
| :---- | :---- | :---- | :---- | :---- |
| Contract upload | Supported file types: PDF, scanned PDF, Word, image, bulk upload | Completed | Yes | PDF and Scanned PDF: supported Image: Not supportedWord: Not supportedBulk upload: Not supported |
| Header extraction | Parties, dates, contract title, effective date, expiry date, renewal date | NA |  |  |
| Commercial terms extraction | Payment terms, pricing, penalties, discounts, SLAs, deliverables | Completed | Yes | Terms relevant to the user question are extracted |
| Legal clause extraction | Termination, liability, indemnity, confidentiality, jurisdiction, force majeure | Completed | Yes | Clauses relevant to the user question are extracted |
| Clause summary | Clause-wise explanation in business-friendly language | NA |  |  |
| Risk detection | Risk flags, missing clauses, unusual terms, one-sided clauses | NA |  |  |
| Risk score | Low/Medium/High or numeric risk score and explanation logic | NA |  |  |
| Source highlighting | Page number, clause reference, text evidence, bounding box support | Completed | Yes |  |
| Contract Q\&A | Ask questions against one contract or multiple contracts | Completed | Yes | One contract or multiple documents belonging to the same contract. |
| Repository | Contract list, filters, search, vendor/customer grouping | Completed | Yes | Users can search and filter from the dashboard |
| Renewal tracker | Expiry, renewal, notice period, reminder generation | NA |  |  |
| Obligation tracker | Turn obligations into tasks with owner/status/due date | NA |  |  |
| Approval workflow | Assign, comment, approve, reject, legal/finance review | Completed | Yes |  |
| Export | Export extracted data, summary, risk report, obligations | Completed | Yes | Users can export results to Excel |

# **5\. Data Fields and Output Schema**

| Data Category | Fields to Document | Current Availability | Source Evidence Available? |
| :---- | :---- | :---- | :---- |
| Contract identity | Contract title, contract type, document ID, version, language | Yes | Yes |
| Parties | Party names, addresses, signatories, entity role, country | NA | NA |
| Dates | Effective date, execution date, expiry date, renewal date, notice date | Yes | Yes |
| Financials | Amount, currency, payment terms, late fees, tax terms, billing cycle | Yes | Yes |
| Obligations | Deliverables, service obligations, reporting duties, compliance duties | Yes | Yes |
| Legal clauses | Termination, indemnity, limitation of liability, confidentiality, jurisdiction | Yes | Yes |
| Risks | Risk type, severity, explanation, recommended action | No | No |
| Workflow metadata | Status, owner, reviewer, approval stage, audit logs | Yes | Audit logs availability is partial |

# **6\. Performance, Token Usage, and Cost**

| Document Type | Avg Pages | Avg Questions | Avg Input Tokens | Avg Output Tokens | Avg AI Calls | Avg Cost / Doc | Avg Time |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Short contract | 50 | 30 | 500/page, 20K/query | 6K/query | 3/query | ₹181 | 5 min |
| Medium contract | 100 | 30 | 500/page, 20K/query | 6K/query | 3/query | ₹278 | 7 min |
| Long contract | 400 | 30 | 500/page, 20K/query | 6K/query | 3/query | ₹857 | 10 min |
| Scanned contract |  |  |  |  |  |  |  |
| Contract with annexures |  |  |  |  |  |  |  |

| Question | Response / Notes |
| :---- | :---- |
| What causes extraction time or token cost to increase? | Number of Pages, Number of Questions |
| Are failed/retried extractions counted in token cost? | No. |
| Is OCR billed separately from LLM calls? | No. Billing is on the number of pages in the contract with a threshold of number of questions. |
| Is there monitoring for per-document token usage and monthly cost? | Yes. |
| Can processing happen in parallel for bulk contracts? | No. Currently bulk processing feature is not available. |

# **7\. Integrations and Data Security**

| Area | Questions | Response / Notes |
| :---- | :---- | :---- |
| ContractIQ to InvoiceIQ | Does ContractIQ currently pass payment terms, pricing, contract status, or clauses to InvoiceIQ? | No |
| External systems | Does it integrate with ERP, CRM, DMS, SharePoint, Google Drive, e-signature, or ticketing systems? | No |
| APIs | Are APIs available for extraction, contract search, and data retrieval? | No. But can be provided. |
| Authentication | How are users authenticated? SSO, password, Azure AD, Google, internal? | Password |
| RBAC | What roles and permissions exist today? | User (Only View), Validator (Only view and verify answers), Admin (All permissions) |
| Data storage | Where are documents and extracted data stored? | AWS |
| Encryption | Is data encrypted at rest and in transit? | Yes |
| AI training | Is client data used to train any external model? | No |
| Tenant isolation | Can the system isolate data client-wise? | Yes |
| Compliance | Any SOC 2, ISO, GDPR, audit, retention, or deletion controls available/planned? | Yes |

# **8\. Limitations, Failure Scenarios, and Improvement Scope**

| Limitation Area | Questions to Answer | Current Limitation / Mitigation |
| :---- | :---- | :---- |
| Document quality | What happens with blurry scans, rotated pages, handwriting, missing pages? | Blurry Scans: Can handle to a certain extentRotated Pages: Can handle Handwriting: Can handle (however not tested and not in the current product requirements) Missing pages: Validation should be done by the user before upload. |
| Long contracts | What page count/token limits exist? How is truncation avoided? | 1000 pages limit (must be split into multiple documents if this limit is exceeded) |
| Table extraction | What kinds of contract tables fail or require manual review? | Tables generally work. Unless it is too complex. |
| Legal interpretation | What should not be treated as legal advice? | We are not providing any type of legal advice. Our scope is to provide answers as close to the wording in the uploaded documents with citations. |
| Risk scoring | What risks are not detected today? | NA |
| Clause library | Is approved clause comparison available or planned? | NA |
| Search/Q\&A | Can it hallucinate? Does it cite source clauses? | Citations are provided for the generated answers |
| Workflow | Which review/approval features are missing today? | All features proposed by the client are implement w.r.t review/approval |
| Scalability | How many contracts can be processed per hour/day? | Depends on the server capacity and LLM API rate liimts. Currently limited to a concurrency of 4 POs. (sets of documents) |
| Security | Known limitations in access control, audit, tenant isolation, or retention? | Basic audit capability is available. No dedicated page. |

| Improvement Bucket | Recommended Improvements to Confirm / Prioritize |
| :---- | :---- |
| Immediate | Confidence score per field, source highlighting, manual correction workflow, clearer contract summary, demo-ready risk panel. |
| Mid-term | Repository search, renewal reminders, obligation tracker, approval workflow, contract-to-invoice validation. |
| Long-term | Client-specific playbooks, approved clause library, full audit/compliance layer, multi-tenant SaaS architecture, integrations with ERP/e-signature/DMS. |

# **9\. Final Client Presentation Readiness**

| Presentation Item | Answer Required |
| :---- | :---- |
| Live demo flows available |  |
| Mockup-only flows |  |
| Roadmap-only features |  |
| Known risks during demo |  |
| Questions we can answer confidently |  |
| Questions that need tech support during call |  |
| Final product positioning line |  |

# **10\. Category-Based Extraction and Field Mapping**

Use this section to document ContractIQ's configurable category-based extraction module. The technical team should confirm every category, every custom field, nearby terms, extraction logic, validation rules, performance impact, and output schema.

Purpose: ContractIQ allows users to select extraction categories and define custom fields under each category. Each field can be mapped to nearby terms/keywords so the system can locate the relevant clause, table, or PO section and perform specific validations.

## **10.1 Category Master List**

Instruction: Confirm whether the below category list is complete. Add missing categories, backend identifiers, current field counts, and current implementation status.

| Category | Field Count in UI | Backend Key / ID | Configurable? Y/N | Validation Available? Y/N | Demo Ready? Y/N | Business Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Price Reduction (Delay) | 11 |  |  |  |  | Delay penalties, price reduction, LD, delivery delay clauses |
| Risk & Cost | 2 |  |  |  |  | Risk ownership and cost responsibility clauses |
| Security | 8 |  |  |  |  | Security deposit, BG, ISD, retention, running bill clauses |
| Steel Plate BG | 2 |  |  |  |  | Steel plate bank guarantee related clauses |
| Advance (Mobilisation) | 5 |  |  |  |  | Mobilisation advance, recovery, BG, timelines |
| GEM doc details | 4 |  |  |  |  | GeM document metadata, bid/order references, compliance details |
| Payment Terms | 2 |  |  |  |  | Payment milestone, invoice approval, deductions, due date rules |

## **10.2 Category Field Builder \- Technical Configuration**

Instruction: Fill this table to explain how categories, custom fields, nearby terms, validations, and outputs are configured in the product.

| Area | Question for Technical Team | Response / Notes |
| :---- | :---- | :---- |
| Category source | Are categories hardcoded, stored in database, JSON config, prompt config, or admin panel? | Categories are configured by the client when they initially setup their account. |
| Custom field management | Can users/admins add, edit, delete, reorder, and disable fields per category? | Yes. |
| Nearby terms logic | Are nearby terms exact keyword matches, semantic matches, regex patterns, or AI guidance? | Yes. Aliases as well. |
| Field types | Which field types are supported: text, amount, percentage, date, clause, yes/no, dropdown, table row? | There is no hardcoded field type support. However we’re not supporting dropdown or tables. |
| Validation rules | Can each field have validation rules? Are they rule-based, AI-based, or hybrid? |  |
| Client-specific setup | Can each client have their own category-field-keyword mapping? | Yes |
| Role/access control | Can categories or fields be enabled/disabled by role or client? | Admin role has the access to manage categories and fields |
| Evidence mapping | Does output include page number, clause, source text, bounding box, or table row? | Yes. Clickable citation with bounding boxes is provided which the user can view on the right-side panel. |
| Version control | Are category/field changes versioned for audit? | Versioned in the backend but not visible to the user. Only PO level versioning is accessible to the user. |
| Learning loop | Do user corrections improve future extraction or update mappings? | At the field level, the user has the option to provide feedback and regenerate answer to a question. However, the said feedback is not utilized for future improvements. Invisible context additions like this lead to regression over time.  |

## **10.3 Complete Category and Custom Field Inventory**

Instruction: This is the main input section. The technical team should list every custom field under every category and provide nearby terms, field type, validation logic, source evidence, status, and notes. Security fields are prefilled from the current UI screenshot; other category fields should be completed by the technical team.

### **Price Reduction (Delay)**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Basis Of Date Of Delivery | {"delivery period","delivery date","PO date","LOA date","completion date"} | Date | User configured |  |  |  |
| 2 | PRD clause | {PRD,deferment,condition,clause,"waiver condition"} | Clause | User configured |  |  |  |
| 3 | Time extension period | {"time extension","extension period","extended date"} | Time Period | User configured |  |  |  |
| 4 | Is PRD deferment applicable | {PRD,deferment,applicable,waiver} | Yes/No | User configured |  |  |  |
| 5 | Is time extension applicable doc attached | {"time extension",extension,applicable,document} | Yes/No | User configured |  |  |  |
| 6 | Approving authority of time extension | {"approving authority","time extension",ED,EIC,approval} | Name / Designation /Organization | User configured |  |  |  |
| 7 | Base for calculation of PRD | {PRD,calculation,base,"PO value","invoice value"} | Amount | User configured |  |  |  |
| 8 | PRD rate | {PRD,rate,percentage,"price reduction","price adjustment"} | Percentage | User configured |  |  |  |
| 9 | Delivery Period mentioned in the PO text | {PRD,"price reduction",delay,"delivery date","lorry receipt","posting date"} | Date | User configured |  |  |  |
| 10 | If yes \- Provide PRD deferment condition | {"Price adjustment","Price reduction","Price adjustment for delay",Delay,"Delay Delivery","Price reduction for delay",PRD,LD,PD} | Clause | User configured |  |  |  |
| 11 | Site hand over date | {"site handover","handover date",site,"work start date"} | Date | User configured |  |  |  |

### **Technical Team**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 |  |  |  |  |  |  |  |

### **Risk & Cost**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |

### **Security**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Document Number (SD/BG) | Bank Guarantee; Initial Security Deposit; Security Deposit; \[additional keyword to confirm\] |  |  |  |  |  |
| 2 | Capex category | Capex Classification; Contract Value Slabs |  |  |  |  |  |
| 3 | Clause (SD/BG) | Security Deposit; Additional Terms and Condition |  |  |  |  |  |
| 4 | SD Amount | Security Deposit |  |  |  |  |  |
| 5 | SD Percentage | Security Deposit |  |  |  |  |  |
| 6 | ISD Amount | Initial Security Deposit |  |  |  |  |  |
| 7 | ISD Percentage | Initial Security Deposit |  |  |  |  |  |
| 8 | SD from Running Bills | Security Deposit; Running Account Bill |  |  |  |  |  |

### **Steel Plate BG**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |

### **Advance (Mobilisation)**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | PO value | {"Contract Value","Mobilization Advance"} | Amount | User configured |  |  |  |
| 2 | MA recovery rate (recovery of installment) | {MA,recovery,installment,"advance recovery",deduction} | Percentage | User configured |  |  |  |
| 3 | % of Mobilisation advance | {"Mobilisation advance",MA,advance,percentage,proforma} | Percentage | User configured |  |  |  |
| 4 | MA clause | {MA,"Mobilisation advance",clause,"advance terms"} | Clause | User configured |  |  |  |
| 5 | MA Interest rate | {MA,interest,"interest rate","advance interest"} | Percentage | User configured |  |  |  |

### **GEM doc details**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | PBG rate | {epbg,ePBG,EPBG,"ePBG %","ePBG percentage"} | Percentage | User configured |  |  |  |
| 2 | Buyer ATC attached or not within GEM contract | {"Buyer ATC",ATC,"Buyer Uploaded ATC"} | Yes/No | User configured |  |  |  |
| 3 | GEM contract creation date | {"Contract Generated Date",date} | Date | User configured |  |  |  |
| 4 | gem contract value | {"Total Contract Value Including All Duties","Contract Value","Total Value Including Addons(INR)"} | Amount | User configured |  |  |  |

### **Payment Terms**

| \# | Field / Question Name | Nearby Terms / Keywords | Field Type | Required? Y/N | Validation Rule / Expected Check | Source Evidence Needed | Status / Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Payment terms | {"payment terms",clause,"payment conditions",terms,"payment schedule",payment} | Clause | User configured |  |  |  |
| 2 | Is Deferment Attached \- BBU | {"payment terms",deferment,BBU,withhold,payment,invoice,"billing break up"} | Yes/No | User configured |  |  |  |

## **10.4 Expected Output Schema for Category Extraction**

Instruction: Confirm whether this is the correct output structure. Modify or complete it based on the actual backend response. (Validation is done by the user with a Validator role)

| Output Field | Description | Example / Response |
| :---- | :---- | :---- |
| category\_name | Selected category name | Security |
| field\_name | Custom field/question being extracted | SD Amount |
| extracted\_value | Final extracted value | INR 10,00,000 |
| normalized\_value | Machine-friendly standardized value | 1000000 |
| nearby\_terms\_matched | Keywords/anchors that helped extraction | Security Deposit |
| source\_page | Page where value was found | Page 12 |
| source\_clause\_or\_section | Clause/section/table reference | Clause 14.2 |
| source\_text | Supporting source snippet from the document | Security Deposit shall be... |
| confidence\_score | AI/system confidence at field level | 0.93 |
| ~~validation\_status~~ | ~~Passed / Warning / Failed / Not Found~~ | ~~Passed~~ |
| ~~validation\_message~~ | ~~Reason for warning/failure~~ | ~~Value found and matches expected range~~ |
| ~~manual\_review\_required~~ | ~~Whether human review is needed~~ | ~~No~~ |

## **10.5 Category Selection Impact on Time and Token Cost**

Instruction: Fill the table to help us explain whether selecting fewer categories reduces processing time and token cost.

| Scenario | Avg Pages Tested | Avg AI Calls | Avg Input Tokens | Avg Output Tokens | Avg Cost | Avg Processing Time |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Single category selected | 50 | 3/query | 20K/query | 6K/query | ₹100 (assuming one query) | 1 min |
| Multiple categories selected | 50 | 3/query | 20K/query | 6K/query | ₹190 (assuming 30 queries) | 5-7 min |
| All categories selected |  |  |  |  |  |  |
| Long PO / contract with many tables |  |  |  |  |  |  |

## **10.6 Validation, Failure Handling, and Scope for Improvement**

| Area | Question for Technical Team | Response / Notes |
| :---- | :---- | :---- |
| Keyword not found | What happens if nearby terms are not found in the document? | Semantic similarity is used. |
| Multiple matches found | How does the system choose the correct clause/value when the same keyword appears multiple times? | We use hybrid search and reranking to order sections by relevance. |
| Ambiguous values | Does the system flag ambiguity or force a best guess? | If multiple sections have relevant information, we present them to the user without deciding ourselves. |
| Conflicting clauses | Can the system detect conflicts across sections? | NA |
| Missing field | Does the system return Not Found, Warning, or Failed? | Yes. Not found is returned when we find nor relevant information in the uploaded documents. |
| Low confidence | What confidence threshold triggers manual review? | Manual review is compulsory regardless of the confidence score. However, the validator can use the confidence score as a marker for a more thorough review. |
| Manual correction | Can users edit extracted values and save corrections? | Yes. Edit option is available. |
| Re-processing | Can users rerun extraction after updating nearby terms or fields? | Yes. |
| Scope for improvement | What improvements are planned for category-field extraction? | NA. |

