**InvoiceIQ \- Technical Documentation Intake**

*Questionnaire and documentation template for technical team inputs*

| Field | Details |
| :---- | :---- |
| Prepared for  | Development / Technical Team Input |
| Product | InvoiceIQ |
| Purpose | Capture technical architecture, AI system details, current feature status, limitations, cost, performance, and roadmap clarity before client presentation. |
| Fill format | Use: Working / Partial / Planned / Not Available / Needs Confirmation. Add exact notes wherever possible. |
| Version | Draft 1.0 \- 2026-05-05 |

# **1\. Product Understanding and Current Scope**

Use this section to document what InvoiceIQ does today and how much of the invoice-to-ERP flow is actually working.

| Area | Questions for Technical Team | Response / Notes |
| :---- | :---- | :---- |
| Product definition | What is InvoiceIQ designed to solve today: extraction, validation, exception routing, approval, posting, or full AP operations? | InvoiceIQ (Invoice Processing Platform) is designed to solve extraction, validation, tax/charge-account reasoning, complex exception routing (6 specific cases), and posting-plan preparation. It acts as a Human-in-the-Loop (HITL) gateway to the ERP. |
| Current user problem | What AP pain points are solved in the current version? | Solves "Alt-Tab fatigue" by eliminating the fragmented workflow of switching between PDFs, spreadsheets, and ERP screens to confirm totals, tax lines, and charge accounts. |
| Product boundary | Is InvoiceIQ standalone or a PO2PAY module? What depends on ContractIQ or external systems? | Acts as the Accounts Payable module within the broader Po2Pay suite. It works in tandem with ContractIQ (Contract Financial Intelligence) which provides the baseline PO/Contract truth for validation. |
| Current state | Which features are working, partial, planned, or documented only? | **Working.** The core extraction, validation, HITL UI, and 6 exception workflows are architected and functional. |
| Client-facing promise | What should we confidently say in a client presentation? | We provide an enterprise-grade AI assistant that prepares flawless, SAP-ready invoice payloads while leaving the human entirely in control of the final approval. |
| Do-not-say list | What should we avoid claiming about automation, ERP posting, PO matching, or exception handling? | **Do not claim 100% "hands-free" or "autonomous" ERP posting.** The architecture is strictly "review-first" / HITL. We do not post without human governance. |

# **2\. AI System and Extraction Technology**

| Technical Area | Must-Know Questions | Response / Notes |
| :---- | :---- | :---- |
| AI model/system | Which AI system is being used: OpenAI, Azure OpenAI, Claude, Gemini, open-source model, custom model, or hybrid? | **Hybrid Pipeline.** Utilizes Azure Document Intelligence alongside orchestrated LLMs (AWS Bedrock, Azure AI Foundry, Google Vertex AI). |
| Model version | What exact model/version is used for extraction, validation assistance, exception reasoning, and summary? | Gemini 2.5 Flash, Gemini 2.5 Pro |
| OCR / parsing | Are we using OCR, document parser, vision model, LLM extraction, or a combined pipeline? | Uses Azure Document Intelligence for baseline OCR and structural layout extraction. |
| Line item extraction | How are invoice tables and line items extracted? What table parser or model handles this? | Azure Document Intelligence extracts the tables, and LLMs parse the semantics for complex tax and quantity validation. |
| PO extraction | How is PO number extracted? Is PO matching against CW/ERP/PO data AI-based or deterministic? | AI extracts the PO number from the document, which is then validated deterministically against database/CW PO records. |
| Schema output | Does the model return structured JSON? How is it validated and corrected? | Outputs structured JSON payloads. Validated via FastAPI backend with enforced data typing. |
| Agentic flow | Is the flow multi-agent? List agents: extraction, validation, exception routing, tax, PO, ERP posting, etc. | **Working.** Operates via "Case-Wise Flows" (agents) configured for specific routing like Tax alignment, Non-PO, and LCM. |
| Rule engine | Where are tax matrix, coding matrix, split rules, threshold rules, and LCM factors stored? | Logic (tax matrix, coding matrix, split rules) is handled by the Python (FastAPI/SQLAlchemy) backend and stored in PostgreSQL. |
| RAG / historical data | Is past invoice/vendor data used to improve matching or duplicate detection? | Not currently |
| Human review | Which stages require finance/AP user review before posting? | **Mandatory.** The user must review the AI's extraction and posting plan via the Split-Screen UI before any ERP mutation occurs. |

# **3\. Current Invoice Processing Architecture**

Please explain the current architecture from invoice intake to CW / ERP posting.

| Stage | Technology Used | AI / Rule / Manual | Avg Time | Failure Cases / Notes |
| :---- | :---- | :---- | :---- | :---- |
| Invoice intake | HTTPS, FastAPI | Rule |  | Upload, email, vendor portal, CW import, other |
| Storage | AWS S3 | Rule |  | Where invoice files and extracted data are stored |
| OCR / parsing | Azure Document Intelligence | AI | 15 seconds per document | Scanned PDFs, image quality, multilingual invoices |
| AI extraction | Gemini, Agno | AI | 30 seconds | Header data and line items |
| JSON structuring | Gemini, Pydantic | AI |  | Schema, validation, retry logic |
| Validation engine | Python functions | Rule |  | PO, tax, vendor, duplicate, charge code checks |
| Exception routing | Deterministic | Rule |  | Six cases and triggers |
| User review |  | Manual |  | Edit, approve, reject, request info |
| CW / Synthetic App update | HTTPS | Rule |  | What data is updated and how |
| ERP posting | HTTPS API, OData APIs | Rule \+ AI |  | Direct API, file, RPA, manual simulation, or in progress |
| Audit log | Postgres | Rule |  | System actions, user changes, posting outcome |

# **4\. Current Feature Inventory**

| Feature | What to Confirm | Status | Demo Ready? | Notes |
| :---- | :---- | :---- | :---- | :---- |
| Invoice upload/intake | PDF, scanned PDF, image, Excel, EDI, bulk uploads, email intake | Completed | Yes | PDFs and Scanned PDFs are supported |
| Header extraction | Invoice number, vendor, buyer, date, due date, currency, PO, totals | Completed | Yes |  |
| Line item extraction | Descriptions, quantities, UOM, unit price, net, tax, gross, tax rate | Completed | Yes |  |
| PO extraction | PO number extraction from invoice and lookup in CW/ERP/PO data | Completed | Yes |  |
| PO matching | 2-way or 3-way matching; price/quantity/description mismatch detection |  |  |  |
| Tax validation | Tax rates, tax amount, tax code selection from tax matrix | Completed | Yes |  |
| Charge code validation | Coding matrix lookup, charge account suggestion, manual override | Completed | Yes |  |
| Duplicate detection | Invoice number/vendor/amount/date/PO similarity checks | NA |  |  |
| Exception center | Tax, PO, Non-PO, Split, LCM, HDRC, vendor issues |  |  |  |
| Approval workflow | Assign, comment, approve, reject, request missing data | Completed | Yes |  |
| CW update | Corrected invoice data pushed to CW/Synthetic App | Completed | Yes |  |
| ERP posting | Direct ERP posting, posting preview, failure handling, retry mechanism | Completed | Yes |  |
| Audit trail | Every extraction, correction, approval, and posting action logged | Completed | Yes |  |
| Reporting | Processing time, exception rates, posted invoices, blocked invoices | Completed | Yes |  |

# **5\. InvoiceIQ Exception Case Readiness**

| Case | Trigger | Logic / Data Used | Current Status | Manual Input Needed? | Demo Ready? |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Case 1 \- Multiple Tax Rates | Multiple tax treatments or domestic tax validation required | Document type, vendor domestic check, tax code matrix, item-tax line relation | Completed | Yes | Yes |
| Case 2 \- Split Invoice | Vendor in split-vendor exception list or rule-based split required | Split vendor list, rule-based split proportions, coding matrix | Completed | Yes | Yes |
| Case 3 \- Non-PO Exception | No PO and invoice exceeds configured threshold | Exchange rate, threshold rule, Non-PO vendor exception list, charge code validation | Completed | Yes | Yes |
| Case 4 \- LCM-PO | PO invoice with freight/insurance landed cost allocation | PO line data, freight and insurance cost factors, CW comparison | Completed | Yes | Yes |
| Case 5 \- LCM | Import/Landed cost invoice with SST, custom duty, handling, knock-off invoice | PO line item data, product mapping, SST/custom duty splits, LCM cost factors | Completed | Yes | Yes |
| Case 6 \- HDRC | Logistics invoice with return cost and home delivery route items | Route/source/destination logic, return cost calculation, tax flow reuse | Completed | Yes | Yes |

# **6\. PO Matching, Validation, and ERP Questions**

| Area | Must-Know Questions | Response / Notes |
| :---- | :---- | :---- |
| PO extraction time | What is the average time to extract PO number and retrieve/match PO details? | 1-2 mins (depends on number of pages) |
| PO data source | Where does PO data come from: CW, ERP, uploaded file, database, API? | Invoice data comes from uploaded PDFs, CW, ERP |
| Matching depth | Is it 2-way or 3-way matching? Are GRN/receipt details used? |  |
| Mismatch handling | How are price, quantity, tax, and description mismatches flagged? | Using validation functions in Python |
| Tax matrix | How are tax codes selected? Can rules vary by country, vendor site, operating unit? | Tax rates are fetched from a SAP table. Managed by the client. |
| Coding matrix | How are GL/charge accounts selected? Can users override them? | Fetched from SAP table. Managed by client |
| Vendor validation | Is vendor master validation available? What fields are checked? | Yes. Name and ID of the vendor are used. |
| Duplicate detection | What duplicate logic exists today and how accurate is it? | No. |
| CW update | What exact data is written back to CW/Synthetic App? | Depends on the exception case |
| ERP posting | Is ERP posting live, simulated, file-based, API-based, RPA-based, or in progress? | API based |
| Failure handling | What happens if CW update or ERP posting fails? Is there retry/rollback? | Currently No. Behavior can be changed based on the requirements. |

# **7\. Performance, Token Usage, and Cost**

| Document Type | Avg Pages | Avg Input Tokens | Avg Output Tokens | Avg AI Calls | Avg Cost / Doc | Avg Time |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Simple invoice | 3 | 40K per Invoice | 2K per invoice | 9 per invoice | 0.10 $ | 120 seconds |
| Complex invoice | 9 | 90K per Invoice | 12K per invoice | 9 per invoice | 0.25 $ | 240 seconds |
| Invoice with many line items | NA | NA | NA | NA | NA | NA |
| Scanned invoice | NA | NA | NA | NA | NA | NA |
| Invoice \+ PO matching | NA | NA | NA | NA | NA | NA |
| Invoice \+ exception case flow | NA | NA | NA | NA | NA | NA |

| Question | Response / Notes |
| :---- | :---- |
| What increases extraction time: page count, line items, scan quality, exception routing, ERP calls? | Page count, line items, scan quality, LLM API calls |
| Are failed/retried extractions counted in token cost? | NO |
| Is OCR billed separately from AI tokens? | YES |
| Is token cost tracked per invoice, per client, and monthly? | YES |
| Can multiple invoices be processed in parallel? What is current throughput per hour/day? | Yes. Throughput estimates are not available. |

# **8\. Data Fields and Output Schema**

| Data Category | Fields to Document | Current Availability | Source Evidence Available? |
| :---- | :---- | :---- | :---- |
| Header data | Invoice number, issue date, due date, PO number, vendor, buyer, currency, totals | Yes | Yes |
| Vendor data | Vendor name, vendor ID, country, site code, operating unit, bank details if applicable | Yes | Yes |
| Line items | Description, quantity, UOM, unit price, net amount, tax rate, tax amount, gross amount | Yes | Yes |
| PO data | PO number, item number, PO item name, PO quantity, PO amount, receipt/GRN if used | Yes | Yes |
| Tax data | Tax percentage, tax amount, tax code, exempt/reverse charge, tax matrix mapping | Yes | Yes |
| Accounting data | Charge account, GL code, cost center, coding matrix match, split allocation | Yes | Yes |
| Exception metadata | Case type, trigger, status, correction, manual action required | Yes | Yes |
| ERP output | Posted header, ordinary lines, tax lines, charge lines, attachments, status | Yes | Yes |

# **9\. Integrations, Security, and Monitoring**

| Area | Questions | Response / Notes |
| :---- | :---- | :---- |
| InvoiceIQ to ContractIQ | Can InvoiceIQ validate invoice pricing, payment terms, tax terms, or scope against ContractIQ? | No |
| CW / Synthetic App | What is the current role of CW/Synthetic App in the flow? | CW is to mimic the production environment |
| ERP systems | Which ERPs are supported or targeted: SAP, Oracle, Microsoft Dynamics, others? | SAP?? |
| APIs | Are APIs available for invoice upload, extraction output, validation status, and ERP posting? | Yes |
| Authentication | How are users authenticated? SSO, password, Azure AD, Google, internal? | Password |
| RBAC | What roles and permissions exist today? | Admin, User |
| Data storage | Where are documents, extracted fields, matrices, logs, and configs stored? | S3, Postgres |
| Encryption | Is data encrypted at rest and in transit? | Yes |
| AI training | Is client data used to train any external model? | No |
| Monitoring | Are extraction failures, API errors, token usage, and posting failures monitored? | Yes |

# **10\. Limitations, Failure Scenarios, and Improvement Scope**

| Limitation Area | Questions to Answer | Current Limitation / Mitigation |
| :---- | :---- | :---- |
| Document quality | What happens with blurry scans, rotated pages, poor tables, missing pages? | Rotated pages are supported. Missing pages should be validated at the user end. |
| Line items | What is the maximum line item count tested? Where does extraction start failing? | 20\. If there are validation errors. |
| PO matching | Which PO matching scenarios are unsupported today? | NA |
| Tax validation | Which tax cases are not supported or need manual review? |  |
| Exception routing | Which of the six cases are not fully automated? | All cases are automated |
| ERP integration | What is not yet live in SAP/ERP integration? | SAP integration is complete |
| Human review | Where is manual review mandatory? | While posting to ERP |
| AI accuracy | Which fields have the lowest extraction accuracy? | Depends on the image quality and the layout complexity. Not the field. |
| Scalability | How many invoices can be processed per hour/day? | Depends on the server capacity |
| Security | Known limitations in access control, audit, tenant isolation, retention? |  |

| Improvement Bucket | Recommended Improvements to Confirm / Prioritize |
| :---- | :---- |
| Immediate | Field confidence score, source highlighting, manual correction workflow, better exception dashboard, token cost monitoring, posting preview. |
| Mid-term | Bulk processing, configurable exception rules, learning from corrections, duplicate detection, approval workflow, vendor profile. |
| Long-term | Full ERP integration, contract-to-invoice validation, predictive exception handling, multi-tenant SaaS architecture, advanced AP analytics. |

# **11\. Final Client Presentation Readiness**

| Presentation Item | Answer Required |
| :---- | :---- |
| Live demo flows available |  |
| Exception cases demo-ready |  |
| Mockup-only flows |  |
| Roadmap-only features |  |
| Known risks during demo |  |
| Questions we can answer confidently |  |
| Questions that need tech support during call |  |
| Final product positioning line |  |

