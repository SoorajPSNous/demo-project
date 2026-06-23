# Feature: Sales Pipeline Analytics
Status: NEW
Owner: Astra
Last Updated: 2026-06-23

## Summary
Sales Pipeline Analytics provides web-based analytics capabilities for sales pipeline stage tracking, conversion-rate reporting, and sales forecasting so sales leadership can monitor deal progress, measure sales effectiveness, and plan revenue proactively.

The feature addresses a current manual or incomplete process by delivering end-to-end system support backed by application database data, authenticated access, input validation, persistence and retrieval, UI and API exposure, and handling of errors and edge cases.

This feature includes three source-supported capability areas:
1. **Sales forecasting** for Sales Directors using weighted pipeline data and historical close rates, with monthly and quarterly forecasts and confidence intervals.
2. **Conversion-rate analytics** for Sales Analysts with daily calculation of stage-to-stage conversion rates, excluding invalid or lost deals, and report filtering by sales team and time periods.
3. **Pipeline stage tracking** for Sales Managers with visibility of all active deals by pipeline stage, audit logging of stage changes with timestamps, and dashboard updates reflecting real-time stage status.

Because the source explicitly requests splitting the feature into separate backlog items, this specification defines the contract for those three capability areas while retaining them under the single feature umbrella.

## Scope
### In Scope
- Web application support for Sales Pipeline Analytics.
- End-to-end support for:
  - sales forecasting,
  - conversion-rate calculations,
  - pipeline stage tracking.
- UI exposure for each in-scope capability.
- API exposure for each in-scope capability.
- Use of the application database as the data source.
- Authentication and input validation.
- Core logic and validation for all three capability areas.
- Error and edge-case handling.
- Data persistence and retrieval where required by the stories.
- Forecast generation using weighted pipeline data and historical close rates.
- Forecast outputs for monthly and quarterly intervals.
- Forecast reports including confidence intervals.
- Daily conversion-rate calculations between stages.
- Exclusion of invalid or lost deals from conversion-rate calculations.
- Conversion-rate report filtering by sales team and time periods.
- Display of all active deals categorized by pipeline stages.
- Logging of stage changes with timestamps for audit.
- Dashboard updates that reflect real-time pipeline stage status.

### Out of Scope
- Advanced customization, which each story marks as future work.
- Any forecasting model options, report customizations, analytics dimensions, filters, UI layouts, API endpoint designs, or persistence details not explicitly supported by source material.
- Any application areas unrelated to forecasting, conversion-rate analytics, or stage tracking.

## Application Type & Platform Context
- **Primary target application type:** web
  - Evidence: Feature metadata states “User-selected Application Types: web”.
- **Architecture context:** monolith
  - Evidence: Feature metadata states “User-selected Architecture Style: monolith”.

The source also includes derived signals indicating “mixed” application type because the stories require both UI and API exposure. For this specification:
- The product surface is treated as a **web application with supporting API/service behavior inside the monolith**.
- The API exists to support the feature because “Expose API and UI” is stated in all three stories.

### Open Question
- Should the supporting API be considered internal-to-monolith only, or must it be externally consumable by other clients or systems?

## Actors and Permissions
### Actors
- **Sales Director**
  - Source: US 51498
  - Intended capability: perform sales forecasting.
- **Sales Analyst**
  - Source: US 51489
  - Intended capability: perform conversion-rate calculations and reporting.
- **Sales Manager**
  - Source: US 51480
  - Intended capability: perform sales pipeline stage tracking and dashboard review.

### Permissions Explicitly Supported by Source
- Authenticated users must be required.
  - Evidence: “Security: authentication and input validation” is listed in each story.
- Access must be constrained by role/persona intent as described in the user stories:
  - Sales Director accesses forecasting capability.
  - Sales Analyst accesses conversion-rate analytics capability.
  - Sales Manager accesses pipeline stage tracking capability.

### Permissions Not Fully Defined
The source does not specify:
- whether these roles can access each other’s views,
- whether role permissions are read-only or include mutation,
- whether admin users exist,
- whether audit logs are viewable by all roles or only specific roles.

### Open Questions
- Are forecasting, conversion analytics, and stage tracking strictly role-restricted, or may multiple sales roles access all analytics views?
- Which actor, if any, is permitted to change deal stages through this feature versus only viewing tracked changes?
- Who may view audit history of stage changes?

## Feature Development Intent
This is feature-development work to replace manual or incomplete processes with system-supported analytics and visibility across the sales pipeline.

The system must be built or updated to:
- calculate and present forecasts using weighted pipeline data and historical close rates;
- calculate conversion rates between stages on a daily basis;
- display active deals grouped by stage in real time;
- log stage changes with timestamps for audit;
- expose the capability through both UI and API surfaces;
- persist and retrieve required analytics and tracking data;
- validate inputs, enforce authenticated access, and handle errors and edge cases.

The delivered outcome is a working monolithic web feature that enables:
- proactive revenue planning for Sales Directors,
- measurement of sales effectiveness for Sales Analysts,
- visibility into deal progress for Sales Managers.

The source includes placeholder acceptance criteria (“scenario 4/5”) that are not concrete. Those placeholders cannot be treated as authoritative requirements and are captured as open questions requiring replacement before implementation completion.

## UI Design & Interaction Contract
### Source-Supported UI Surfaces
The source supports the existence of UI for all three story areas because each story requires the system to “Expose API and UI”.

The following UI surfaces are supported by source intent:
- **Forecasting UI**
  - A user accesses the feature, performs the required action, the system processes the request, and displays results or confirmation, and the user verifies the outcome.
  - Must display forecast results for monthly and quarterly intervals.
  - Must include confidence intervals in forecast reports.
- **Conversion-rate analytics UI**
  - Must provide reports showing conversion rates between stages.
  - Must support filtering by sales team.
  - Must support filtering by time periods.
- **Pipeline stage tracking dashboard**
  - Must display all active deals categorized by pipeline stages.
  - Must reflect real-time pipeline stage status updates.

### Interaction Contract
- Authenticated users access the relevant analytics capability.
- The user initiates the required action from the UI.
- The system processes the request against application database data.
- The system displays the resulting report, dashboard state, or confirmation.
- The user verifies the displayed outcome.

### UI States Explicitly Supported
- Successful result display for:
  - forecast reports,
  - conversion reports,
  - pipeline dashboard visibility.
- Error and edge-case handling must exist.
- Real-time update state for stage tracking dashboard.
- Filtered result state for conversion-rate reports.

### Validation and Error Handling
The source explicitly requires input validation and error handling but does not define exact messages or field-level behaviors.

The UI must:
- require authenticated access,
- validate user inputs before processing,
- handle errors and edge cases,
- return expected results when valid inputs are provided.

### Accessibility and Design Guidance
No UI design system, layout standard, copy style, accessibility standard, or component guidance is specified in the source.

### Open Questions
- What are the exact UI screens or navigation entry points for forecasting, conversion analytics, and stage tracking?
- What specific inputs must users provide to generate forecasts?
- Which report fields must be displayed in each report and dashboard?
- What exact empty-state, error-state, and validation messages are required?
- What accessibility standard applies to this web feature?
- For real-time dashboard updates, what user-visible latency or refresh mechanism is expected?

## API Contract
The source requires API exposure for all three capability areas but does not define endpoint names, HTTP methods, payload schemas, or error formats. Only source-supported API behavior is specified here.

### Supported API Capabilities
1. **Forecast generation/retrieval API**
   - Must support sales forecasting.
   - Must use weighted pipeline data and historical close rates.
   - Must return forecasts for monthly and quarterly intervals.
   - Must include confidence intervals in forecast outputs.

2. **Conversion-rate analytics API**
   - Must support retrieval of stage-to-stage conversion rates.
   - Must support filtering by sales team.
   - Must support filtering by time periods.
   - Must exclude invalid or lost deals from calculations.

3. **Pipeline stage tracking API**
   - Must support retrieval of all active deals categorized by pipeline stages.
   - Must support dashboard data that reflects real-time pipeline stage status.
   - Must support retrieval or persistence of stage change logs with timestamps for audit.

### API Security and Validation
- API access must require authentication.
- Inputs must be validated.
- Errors and edge cases must be handled.

### Data Source / Integration
- The application database is the stated data source.
- No external integrations are specified.

### Unsupported API Details
The source does not define:
- endpoint paths,
- HTTP verbs,
- request/response schemas,
- pagination,
- sorting,
- versioning,
- idempotency expectations,
- error status codes,
- whether forecast generation is synchronous or asynchronous.

### Open Questions
- What exact API endpoints and methods are required for the three capability areas?
- What are the request parameters and response schemas for forecast, conversion-rate, and stage-tracking APIs?
- Are forecast requests generated on demand, cached, or persisted for later retrieval?
- Is the real-time dashboard API push-based, polling-based, or request/response only?
- Are audit logs exposed through the same API as stage tracking or a separate one?
- What standard error model should the API follow within the monolith?

## Business Logic & Rules
### Forecasting
- Forecast models must use:
  - weighted pipeline data, and
  - historical close rates.
- Forecasts must be generated for:
  - monthly intervals,
  - quarterly intervals.
- Forecast reports must include confidence intervals.

### Conversion-Rate Analytics
- Conversion rates between stages must be calculated daily.
- Calculations must exclude:
  - invalid deals,
  - lost deals.
- Reports must be filterable by:
  - sales team,
  - time periods.

### Pipeline Stage Tracking
- The system must display all active deals categorized by pipeline stages.
- Stage changes must be logged with timestamps for audit.
- Dashboard updates must reflect real-time pipeline stage status.

### Cross-Cutting Rules
- The source of data is the application database.
- Authenticated access is required.
- Inputs must be validated.
- The system must handle errors and edge cases.
- Persistence and retrieval must be supported where needed to enable the feature end-to-end.

### Business Rules Not Fully Defined
The source does not define:
- the formula for weighted pipeline data,
- the definition of historical close rates,
- how confidence intervals are calculated,
- what constitutes an invalid deal,
- the exact sales pipeline stage list,
- what counts as an active deal,
- what event triggers a stage-change audit log entry,
- what “real-time” means operationally.

### Open Questions
- What is the exact forecast formula, including weighting logic and historical close-rate window?
- How are confidence intervals calculated and presented?
- What concrete business cases should replace forecast “scenario 4” and “scenario 5” acceptance criteria?
- What concrete business cases should replace conversion “scenario 4” and “scenario 5” acceptance criteria?
- What concrete business cases should replace stage tracking “scenario 4” and “scenario 5” acceptance criteria?
- What is the authoritative definition of invalid deal, lost deal, active deal, and each pipeline stage?
- What is the required refresh frequency or latency threshold for “real-time” dashboard updates?

## Data Model & Validation
### Source-Supported Data Concepts
The source supports the following data concepts, but not a full schema:
- pipeline data,
- historical close rates,
- forecasts,
- confidence intervals,
- pipeline stages,
- deals,
- active deals,
- invalid deals,
- lost deals,
- sales team,
- time periods,
- stage changes,
- timestamps,
- audit log records.

### Persistence Expectations
The stories require “Ensure data persistence and retrieval.”
Source-supported persisted or retrievable data includes:
- deal and pipeline stage state from the application database,
- stage change logs with timestamps for audit,
- data needed to generate forecasts and conversion reports,
- any stored outputs if required by implementation, though storage of computed analytics outputs is not explicitly mandated.

### Validation Expectations
- Inputs must be validated.
- Conversion-rate calculations must exclude invalid or lost deals.
- Forecast outputs must include monthly and quarterly intervals and confidence intervals.
- Stage tracking must show only active deals when displaying active-deal pipeline categorization.

### Data Model Gaps
The source does not define:
- specific table/entity structures,
- field names,
- data types,
- required/optional fields,
- retention period for audit logs,
- time zone handling for timestamps,
- historical lookback period for forecast inputs,
- source-of-truth definition for sales team assignment.

### Open Questions
- What exact entities and fields exist in the application database for deals, stages, forecast inputs, and stage history?
- Are forecasts persisted as records, or computed at request time only?
- What is the retention requirement for stage-change audit data?
- What time zone standard applies to logged timestamps and time-period filters?
- How is sales team membership determined for report filtering?

## Functional Requirements
### Forecasting
**FR-1.** The system shall provide an authenticated web-accessible forecasting capability for the Sales Director role.  
**FR-2.** The system shall expose API support for forecasting.  
**FR-3.** The system shall generate forecasts using weighted pipeline data and historical close rates.  
**FR-4.** The system shall generate forecast results for monthly intervals.  
**FR-5.** The system shall generate forecast results for quarterly intervals.  
**FR-6.** The system shall include confidence intervals in forecast reports.  
**FR-7.** The system shall validate forecasting inputs before processing.  
**FR-8.** The system shall handle forecasting errors and edge cases and return an error outcome rather than an invalid success result.  
**FR-9.** The system shall support persistence and retrieval of data required to deliver forecasting end to end using the application database.  

### Conversion-Rate Analytics
**FR-10.** The system shall provide an authenticated web-accessible conversion-rate analytics capability for the Sales Analyst role.  
**FR-11.** The system shall expose API support for conversion-rate analytics.  
**FR-12.** The system shall calculate conversion rates between pipeline stages daily.  
**FR-13.** The system shall exclude invalid deals from conversion-rate calculations.  
**FR-14.** The system shall exclude lost deals from conversion-rate calculations.  
**FR-15.** The system shall provide conversion-rate reports filterable by sales team.  
**FR-16.** The system shall provide conversion-rate reports filterable by time periods.  
**FR-17.** The system shall validate conversion-report inputs before processing.  
**FR-18.** The system shall handle conversion analytics errors and edge cases and return an error outcome rather than an invalid success result.  
**FR-19.** The system shall support persistence and retrieval of data required to deliver conversion-rate analytics end to end using the application database.  

### Pipeline Stage Tracking
**FR-20.** The system shall provide an authenticated web-accessible pipeline stage tracking capability for the Sales Manager role.  
**FR-21.** The system shall expose API support for pipeline stage tracking.  
**FR-22.** The system shall display all active deals categorized by pipeline stages.  
**FR-23.** The system shall log each stage change with a timestamp for audit.  
**FR-24.** The system shall update the dashboard so that it reflects real-time pipeline stage status.  
**FR-25.** The system shall validate stage-tracking inputs before processing.  
**FR-26.** The system shall handle stage-tracking errors and edge cases and return an error outcome rather than an invalid success result.  
**FR-27.** The system shall support persistence and retrieval of data required to deliver stage tracking end to end using the application database.  

### Cross-Cutting
**FR-28.** The system shall require authentication for access to Sales Pipeline Analytics capabilities.  
**FR-29.** The system shall use the application database as the data source for this feature.  
**FR-30.** The implementation shall conform to the monolith architecture context selected for the feature.  
**FR-31.** Placeholder acceptance criteria labeled as “scenario 4” and “scenario 5” shall not be considered implementation complete until replaced by concrete, business-verifiable acceptance criteria approved by product ownership.

## Non-Functional Requirements
**NFR-1. Security:** The feature shall require authentication.  
**NFR-2. Security:** The feature shall perform input validation.  
**NFR-3. Reliability:** The feature shall handle errors and edge cases for forecasting, conversion-rate analytics, and stage tracking.  
**NFR-4. Data Source Consistency:** The feature shall use the application database as its source data store.  
**NFR-5. Performance:** The feature shall meet SLA requirements referenced by the stories.
- Note: the source states “Performance: meet SLA requirements” but does not define the SLA values.

**NFR-6. Quality:** The delivered feature shall satisfy the story acceptance criteria and have no critical defects in production, consistent with stated success metrics.  
**NFR-7. Freshness:** Conversion-rate calculations shall be produced on a daily cadence.  
**NFR-8. Freshness:** Pipeline stage tracking dashboard data shall reflect real-time stage status.

### Open Questions
- What specific SLA targets apply for page load times, API response times, and calculation completion times?
- What reliability targets, uptime targets, or recovery expectations apply?
- What monitoring, logging, or observability standards are required for this feature?
- What exact definition of “real-time” must be met?

## Acceptance Scenarios
### Forecasting
**AS-1: Generate monthly forecast successfully**  
**Given** an authenticated Sales Director accesses forecasting  
**And** required forecast inputs are valid  
**And** application database data includes weighted pipeline data and historical close rates  
**When** the user requests a monthly forecast  
**Then** the system generates a forecast using weighted pipeline data and historical close rates  
**And** displays or returns a monthly forecast result  
**And** includes a confidence interval in the forecast report.

**AS-2: Generate quarterly forecast successfully**  
**Given** an authenticated Sales Director accesses forecasting  
**And** required forecast inputs are valid  
**When** the user requests a quarterly forecast  
**Then** the system generates a quarterly forecast  
**And** includes a confidence interval in the forecast report.

**AS-3: Reject invalid forecasting input**  
**Given** an authenticated Sales Director accesses forecasting  
**When** the user submits invalid input  
**Then** the system validates the input  
**And** does not process the request as a successful forecast  
**And** returns an error outcome.

**AS-4: Forecast API and UI both support end-to-end operation**  
**Given** forecasting capability is available  
**When** an authenticated user performs the supported forecasting action through the UI or API  
**Then** the system processes the request end to end  
**And** returns expected forecast results when inputs are valid.

### Conversion-Rate Analytics
**AS-5: Daily conversion-rate calculation excludes invalid and lost deals**  
**Given** application database data contains deals across pipeline stages  
**And** some deals are marked invalid or lost  
**When** the system performs the daily conversion-rate calculation  
**Then** conversion rates between stages are calculated  
**And** invalid deals are excluded  
**And** lost deals are excluded.

**AS-6: Filter conversion report by sales team and time period**  
**Given** an authenticated Sales Analyst accesses conversion-rate analytics  
**When** the user filters the report by sales team and time period  
**Then** the system returns conversion-rate results restricted to the selected sales team and time period.

**AS-7: Reject invalid conversion-report input**  
**Given** an authenticated Sales Analyst accesses conversion-rate analytics  
**When** the user submits invalid input  
**Then** the system validates the input  
**And** does not process the request as a successful report request  
**And** returns an error outcome.

**AS-8: Conversion analytics API and UI both support end-to-end operation**  
**Given** conversion-rate analytics capability is available  
**When** an authenticated user performs the supported analytics action through the UI or API  
**Then** the system processes the request end to end  
**And** returns expected conversion-rate results when inputs are valid.

### Pipeline Stage Tracking
**AS-9: Display active deals by pipeline stage**  
**Given** an authenticated Sales Manager accesses pipeline stage tracking  
**And** active deals exist in the application database  
**When** the dashboard is displayed  
**Then** the system shows all active deals  
**And** categorizes them by pipeline stage.

**AS-10: Log stage change with timestamp**  
**Given** a deal changes from one pipeline stage to another  
**When** the stage change is recorded by the system  
**Then** the system logs the stage change  
**And** stores a timestamp for audit.

**AS-11: Reflect real-time pipeline stage status on dashboard**  
**Given** pipeline stage tracking is active  
**When** a deal’s stage status changes  
**Then** the dashboard reflects the updated pipeline stage status in real time.

**AS-12: Reject invalid stage-tracking input**  
**Given** an authenticated Sales Manager accesses pipeline stage tracking  
**When** the user submits invalid input  
**Then** the system validates the input  
**And** does not process the request as a successful operation  
**And** returns an error outcome.

### Cross-Cutting
**AS-13: Require authentication**  
**Given** a user is not authenticated  
**When** the user attempts to access any Sales Pipeline Analytics capability  
**Then** the system denies access.

**AS-14: Use application database data source**  
**Given** the feature executes forecasting, conversion-rate analytics, or stage tracking  
**When** the system retrieves source data  
**Then** it uses the application database as the source.

## Traceability Matrix
| Source ID | Requirement | Acceptance Criteria | Test Coverage |
|---|---|---|---|
| Feature 51447 | FR-28, FR-29, FR-30 | Feature is web-based, uses application database, and fits monolith context | Architecture validation, authentication tests, data source verification |
| US 51498 AC1 | FR-3 | Forecast models use weighted pipeline data and historical close rates | Unit tests for forecast logic; integration test with database-backed inputs |
| US 51498 AC2 | FR-4, FR-5 | Forecasts are generated for monthly and quarterly intervals | UI/API tests for monthly and quarterly forecast outputs |
| US 51498 AC3 | FR-6 | Forecast reports include confidence intervals | Report rendering/API response validation tests |
| US 51498 Description | FR-1, FR-2, FR-7, FR-8, FR-9 | Expose API and UI; implement core logic, validation, error handling, persistence and retrieval | UI tests, API tests, negative validation tests, persistence tests |
| US 51498 AC4 | FR-31 | Placeholder scenario 4 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| US 51498 AC5 | FR-31 | Placeholder scenario 5 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| US 51489 AC1 | FR-12, NFR-7 | Conversion rates between stages are calculated daily | Scheduled/daily calculation tests; date-based validation tests |
| US 51489 AC2 | FR-13, FR-14 | Calculations exclude invalid or lost deals | Unit tests for exclusion logic; dataset-based integration tests |
| US 51489 AC3 | FR-15, FR-16 | Reports can be filtered by sales team and time periods | UI/API filter tests |
| US 51489 Description | FR-10, FR-11, FR-17, FR-18, FR-19 | Expose API and UI; implement logic, validation, error handling, persistence and retrieval | UI tests, API tests, validation tests, persistence tests |
| US 51489 AC4 | FR-31 | Placeholder scenario 4 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| US 51489 AC5 | FR-31 | Placeholder scenario 5 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| US 51480 AC1 | FR-22 | System displays all active deals categorized by pipeline stages | Dashboard rendering tests with active-deal fixtures |
| US 51480 AC2 | FR-23 | Stage changes are logged with timestamps for audit | Audit-log persistence tests; timestamp presence tests |
| US 51480 AC3 | FR-24, NFR-8 | Dashboard updates reflect real-time pipeline stage status | Real-time refresh/update tests under defined latency criteria once clarified |
| US 51480 Description | FR-20, FR-21, FR-25, FR-26, FR-27 | Expose API and UI; implement logic, validation, error handling, persistence and retrieval | UI tests, API tests, validation tests, persistence tests |
| US 51480 AC4 | FR-31 | Placeholder scenario 4 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| US 51480 AC5 | FR-31 | Placeholder scenario 5 must be replaced before implementation completion | Requirements review gate; no-release checklist |
| All Stories Technical Considerations | NFR-1, NFR-2, NFR-3, NFR-5 | Security requires authentication and input validation; performance must meet SLA requirements | Security tests, validation tests, performance tests against defined SLA |
| All Stories Success Metrics | NFR-6 | Feature works per acceptance criteria and has no critical defects in production | UAT signoff; release quality gate |

## Open Questions
1. What exact backlog split and delivery sequencing is intended for:
   - forecasting,
   - conversion-rate analytics,
   - stage tracking?
2. What exact UI screens, routes, and navigation entry points are required for each backlog item?
3. What exact API endpoints, methods, request schemas, response schemas, and error models are required for each backlog item?
4. What are the exact inputs and report fields for forecasting?
5. What are the exact formula and business rules for:
   - weighted pipeline data,
   - historical close rates,
   - forecast confidence intervals?
6. What historical time window should be used for historical close-rate calculations?
7. Are forecasts generated on demand, stored after generation, or both?
8. What exact report fields must appear in conversion-rate analytics?
9. What are the valid values for sales team and time-period filters?
10. What is the authoritative definition of invalid deal and lost deal for conversion calculations?
11. What exact pipeline stages exist, and what is the authoritative stage order?
12. What is the definition of active deal for stage tracking display?
13. What event source records a stage change, and who or what can initiate stage transitions?
14. What audit-log retention period and retrieval requirements apply to stage-change timestamps?
15. What exact refresh frequency, transport mechanism, and latency target define “real-time” dashboard updates?
16. Are the APIs intended for internal web-client use only, or for external consumers as well?
17. What role-based access matrix applies across Sales Director, Sales Analyst, Sales Manager, and any administrative roles?
18. What exact validation and user-facing error messages are required?
19. What SLA values apply to web response times, API response times, forecast generation times, and dashboard refresh times?
20. What concrete acceptance criteria should replace each placeholder “scenario 4” and “scenario 5” in US 51498, US 51489, and US 51480?
21. What accessibility requirements apply to the web UI?
22. What time zone standard applies to:
   - monthly and quarterly forecast intervals,
   - time-period filters,
   - audit timestamps?
23. Are there any required export, print, or sharing behaviors for reports?
24. Does persistence apply only to source and audit data, or also to computed analytics outputs and snapshots?

## Source References
- **Feature ID 51447** — Sales Pipeline Analytics
  - Feature Title: Sales Pipeline Analytics
  - Feature State: New
  - Application Type: web
  - Architecture Style: monolith
  - Feature Description: detailed analytics on pipeline stages, conversion rates, and forecasts
- **US 51498** — Sales forecasting for Sales Director
  - Acceptance Criteria 1: Forecast models use weighted pipeline data and historical close rates
  - Acceptance Criteria 2: Forecasts are generated for monthly and quarterly intervals
  - Acceptance Criteria 3: Forecast reports include confidence intervals
  - Acceptance Criteria 4–5: placeholder scenario criteria requiring clarification
  - Technical Considerations: application database, authentication, input validation, SLA requirements
  - Out of Scope: advanced customization
- **US 51489** — Conversion-rate calculations for Sales Analyst
  - Acceptance Criteria 1: Conversion rates between stages are calculated daily
  - Acceptance Criteria 2: Calculations exclude invalid or lost deals
  - Acceptance Criteria 3: Reports can be filtered by sales team and time periods
  - Acceptance Criteria 4–5: placeholder scenario criteria requiring clarification
  - Technical Considerations: application database, authentication, input validation, SLA requirements
  - Out of Scope: advanced customization
- **US 51480** — Sales pipeline stage tracking for Sales Manager
  - Acceptance Criteria 1: System displays all active deals categorized by pipeline stages
  - Acceptance Criteria 2: Stage changes are logged with timestamps for audit
  - Acceptance Criteria 3: Dashboard updates reflect real-time pipeline stage status
  - Acceptance Criteria 4–5: placeholder scenario criteria requiring clarification
  - Technical Considerations: application database, authentication, input validation, SLA requirements
  - Out of Scope: advanced customization
- **User-provided mitigation for spec generation**
  - Split into separate backlog items for forecasting, conversion-rate analytics, and stage tracking
  - Define exact inputs/data sources, formulas/business rules, required UI screens and API endpoints, report fields/filters, refresh frequency, permissions, persistence needs
  - Replace placeholder scenario-based criteria with concrete acceptance criteria
- **Golden Repo convention references used**
  - None provided in source context.