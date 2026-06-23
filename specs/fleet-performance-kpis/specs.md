# Feature: Fleet Performance KPIs
Status: NEW
Owner: Astra
Last Updated: 2026-06-23

## Summary
Fleet Performance KPIs provides web-based access to fleet operational performance information so authorized users can monitor utilization, maintenance, and cost efficiency from system-supported dashboards and reporting views. The feature replaces manual or incomplete processes with end-to-end system support backed by application-database data, API and UI exposure, role-based access control, persistence, retrieval, validation, and handling of errors and edge cases.

Expected outcomes supported by source stories are:
- Fleet Analysts can access KPI dashboards with data refreshed at least daily and filter results by fleet, region, and time period.
- Fleet Maintenance Coordinators can view maintenance cost reporting per vehicle and by fleet segment, see upcoming maintenance schedules, and receive overdue maintenance alerts.
- Fleet Managers can monitor daily and monthly vehicle utilization percentages, identify idle vehicles for review, and use utilization data integrated with scheduling systems.

## Scope
In scope:
- KPI dashboard access for fleet performance insights.
- Display of fleet KPIs related to utilization, maintenance, and cost efficiency.
- Daily-or-better dashboard data refresh.
- Filtering KPI results by fleet, region, and time period.
- Role-based access control for dashboard access.
- Maintenance cost tracking per vehicle.
- Aggregation of maintenance costs by fleet segment.
- Visibility of upcoming maintenance schedules on dashboards.
- Generation of alerts for overdue maintenance.
- Reporting of daily and monthly utilization percentages per vehicle.
- Flagging of idle vehicles for review.
- Integration of utilization data with scheduling systems.
- API and UI support for the feature.
- Core logic, validation, data persistence and retrieval, authentication, input validation, and error/edge-case handling.
- Use of the application database as a data source.

Out of scope:
- Advanced customization, identified as a future story.

## Application Type & Platform Context
Target platform:
- Web application.

Source evidence:
- Feature metadata specifies user-selected application type: web.
- User stories require dashboard access and dashboard visibility, indicating browser-based UI behavior.
- Story descriptions explicitly state "Expose API and UI."

Architecture context:
- User-selected architecture style: monolith.

Additional context:
- The source also includes a derived signal of "Application Type: mixed" based on API and UI exposure. The authoritative platform selection explicitly states web, while API support is also required for the feature.

Open Question:
- Should the API be treated as internal-to-monolith support for the web application, or as an externally consumable contract for additional clients/integrations beyond the scheduling-system integration?

## Actors and Permissions
Actors explicitly supported by source:
- Fleet Analyst
- Fleet Maintenance Coordinator
- Fleet Manager

Permissions and access constraints explicitly supported:
- Dashboard access must be controlled by role-based permissions.
- Authentication is required.
- Input validation is required.

Actor-specific supported capabilities from source:
- Fleet Analyst:
  - Access KPI dashboards.
  - Filter KPIs by fleet, region, and time period.
- Fleet Maintenance Coordinator:
  - Access maintenance cost reporting.
  - View upcoming maintenance schedules on dashboards.
  - Receive or view alerts for overdue maintenance.
- Fleet Manager:
  - Monitor daily and monthly utilization percentages per vehicle.
  - Review idle vehicle flags.
  - Use utilization data integrated with scheduling systems.

Open Questions:
- What precise role-to-capability matrix is required for Fleet Analyst, Fleet Maintenance Coordinator, and Fleet Manager?
- Are users permitted to access only their assigned fleets/regions, or all fleets/regions?
- Are alert acknowledgment, dismissal, or workflow actions required, and if so, by which roles?

## Feature Development Intent
This is feature-development work to build end-to-end fleet KPI monitoring capabilities where the current process is manual or incomplete. The implementation must add or complete:
- UI dashboards and reporting views for fleet KPIs.
- API support for KPI retrieval and related data operations.
- Business logic for utilization reporting, maintenance cost reporting, overdue maintenance alerting, and KPI filtering.
- Data persistence and retrieval from the application database.
- Role-based authorization, authentication, and input validation.
- Error and edge-case handling sufficient to return expected results.

The delivered outcome is a working system that satisfies the story acceptance criteria and supports real-world operational insight into fleet performance.

## UI Design & Interaction Contract
Source-supported UI behavior:
- Users access the feature through dashboard-based UI.
- Dashboards must present fleet KPIs.
- KPI dashboards must support filtering by:
  - fleet
  - region
  - time period
- Dashboards must show:
  - updated KPI data refreshed at least daily
  - maintenance costs per vehicle
  - aggregated maintenance costs by fleet segment
  - upcoming maintenance schedules
  - overdue maintenance alerts
  - daily utilization percentages per vehicle
  - monthly utilization percentages per vehicle
  - idle vehicles flagged for review

Interaction flow supported by source:
1. User accesses the feature.
2. User performs the required action.
3. System processes the request.
4. System displays results or confirmation.
5. User verifies the outcome.

UI states supported by source:
- Successful result display.
- Error and edge-case handling.
- Access-controlled behavior based on role permissions.

Validation and security expectations:
- Authentication required before access.
- Input validation required for user-supplied inputs such as filters.

Open Questions:
- What exact dashboard layout, navigation entry points, widgets, table/chart formats, and labels are required?
- How should "real-time fleet performance insights" be represented when the acceptance criterion requires refresh at least daily?
- What UI treatment is required for overdue maintenance alerts: banner, list, card, badge, or other?
- What user-facing validation and error messages should be shown for invalid filters, unavailable data, integration failure, or authorization failure?
- Are there accessibility, responsive-design, localization, or visual-design standards from the product that must be applied?

## API Contract
Source-supported API expectations:
- The feature must expose API and UI.
- API behavior must support system processing, persistence, and retrieval for fleet KPI use cases.
- API must use the application database as a data source.
- API must enforce authentication and input validation.
- API must handle errors and edge cases.
- API must support retrieval of data needed for:
  - KPI dashboards
  - filtering by fleet, region, and time period
  - maintenance cost reporting per vehicle
  - maintenance cost aggregation by fleet segment
  - upcoming maintenance schedules
  - overdue maintenance alerts
  - daily and monthly utilization percentages per vehicle
  - idle vehicle flags
  - utilization integration with scheduling systems

Integration behavior explicitly supported:
- Utilization data must be integrated with scheduling systems.

Open Questions:
- What API endpoints, methods, request parameters, response schemas, authentication mechanism, and error codes are required?
- Is the scheduling-system integration inbound, outbound, bidirectional, batch, or synchronous?
- What data contract is required between fleet utilization and scheduling systems?
- Are there idempotency requirements for any write/update operations related to KPI persistence, alert generation, or data refresh?
- Is the API intended for public consumption, internal UI consumption only, or both?

## Business Logic & Rules
Supported business rules:
- KPI dashboard data must refresh at least daily.
- Users must be able to filter KPIs by fleet, region, and time period.
- Dashboard access must be restricted by role-based permissions.
- Maintenance costs must be tracked per vehicle.
- Maintenance costs must be aggregated by fleet segment.
- Upcoming maintenance schedules must be visible on dashboards.
- Alerts must be generated for overdue maintenance.
- The system must report daily utilization percentages per vehicle.
- The system must report monthly utilization percentages per vehicle.
- Idle vehicles must be flagged for review.
- Utilization data must be integrated with scheduling systems.
- The system must process requests, return expected results, and handle errors and edge cases.
- Authentication and input validation are required for operations.

Open Questions:
- What is the authoritative formula for utilization percentage?
- What business rule determines when a vehicle is considered idle and must be flagged?
- What business rule determines when maintenance is overdue and an alert must be generated?
- What constitutes a fleet segment for maintenance aggregation?
- What is the trigger and cadence for maintenance alert generation?
- Does "refresh data at least daily" require scheduled batch refresh, on-demand refresh, or both?
- How should conflicting or missing data from the application database or scheduling systems be resolved?

## Data Model & Validation
Source-supported data/domain entities and fields:
- Fleet
- Region
- Time period
- Vehicle
- Fleet segment
- Maintenance cost
- Maintenance schedule
- Overdue maintenance alert
- Utilization percentage:
  - daily
  - monthly

Source-supported data constraints and validation:
- Inputs must be validated.
- Data must be persisted and retrieved.
- Data source is the application database.
- Maintenance costs must be attributable per vehicle and aggregatable by fleet segment.
- Utilization must be reportable per vehicle at daily and monthly levels.
- Dashboard data must be refreshable at least daily.

Open Questions:
- What exact data fields are required for fleet, vehicle, region, fleet segment, maintenance schedule, cost record, alert, and utilization record?
- What formats and allowable values apply to time period filters?
- What validation rules apply when filter combinations are empty, invalid, unauthorized, or produce no results?
- What data-retention requirements apply to KPI history, maintenance history, alerts, and utilization records?
- Are there source-of-truth rules for region, fleet segment, and scheduling data?
- How should duplicate, late-arriving, or corrected records be handled?

## Functional Requirements
FR-1. The system shall provide authorized users access to fleet performance KPI dashboards via the web application.

FR-2. The system shall refresh KPI dashboard data at least daily.

FR-3. The system shall allow users to filter KPI results by fleet.

FR-4. The system shall allow users to filter KPI results by region.

FR-5. The system shall allow users to filter KPI results by time period.

FR-6. The system shall enforce role-based permissions for dashboard access.

FR-7. The system shall require authentication before allowing access to feature UI or API operations.

FR-8. The system shall validate user-provided inputs used by the feature, including filter inputs.

FR-9. The system shall track maintenance costs per vehicle.

FR-10. The system shall aggregate maintenance costs by fleet segment.

FR-11. The system shall display upcoming maintenance schedules on dashboards.

FR-12. The system shall generate alerts for overdue maintenance.

FR-13. The system shall report daily utilization percentages per vehicle.

FR-14. The system shall report monthly utilization percentages per vehicle.

FR-15. The system shall flag idle vehicles for review.

FR-16. The system shall integrate utilization data with scheduling systems.

FR-17. The system shall expose API support for feature processing, persistence, and retrieval required by the KPI dashboards and reporting capabilities.

FR-18. The system shall persist and retrieve feature data using the application database.

FR-19. The system shall handle supported errors and edge cases and return expected results.

FR-20. The system shall display results or confirmation after processing a user action supported by the feature.

FR-21. The implementation shall exclude advanced customization from this feature release.

FR-22. The system shall support end-to-end capability for KPI dashboard access, maintenance cost reporting, and fleet utilization monitoring as described in the user stories.

FR-23. The system shall satisfy the expected results for scenario 4 in US 51579, US 51570, and US 51561 once those scenarios are defined.

FR-24. The system shall satisfy the expected results for scenario 5 in US 51579, US 51570, and US 51561 once those scenarios are defined.

## Non-Functional Requirements
NFR-1. The feature shall be implemented within the web application context.

NFR-2. The feature shall operate within the monolith architecture context identified for the feature.

NFR-3. The feature shall use the application database as its data source.

NFR-4. The feature shall meet applicable SLA requirements referenced by the source.

NFR-5. The feature shall enforce authentication and input validation as security requirements.

NFR-6. The feature shall support error and edge-case handling without critical defects in production.

NFR-7. The feature shall provide reliable daily-or-better KPI data refresh.

Open Questions:
- What specific SLA targets apply to page load, API response time, refresh completion, and integration latency?
- What logging, monitoring, and operational alerting are required?
- What reliability expectations apply to failed refreshes, failed integrations, or partial data availability?
- Are there auditability requirements for dashboard access, alert generation, or KPI data changes?

## Acceptance Scenarios
### AS-1: Authorized Fleet Analyst accesses KPI dashboard
Given an authenticated user with a role permitted to access KPI dashboards  
When the user opens the Fleet Performance KPIs feature  
Then the system displays the KPI dashboard  
And access is granted according to role-based permissions.

### AS-2: KPI dashboard data is refreshed at least daily
Given KPI dashboard data exists in the system  
When the dashboard data refresh process runs  
Then dashboard data is refreshed at least once per day  
And users see KPI data based on the refreshed dataset.

### AS-3: User filters KPIs by fleet, region, and time period
Given an authenticated authorized user is viewing the KPI dashboard  
When the user applies fleet, region, and time period filters  
Then the system validates the inputs  
And the dashboard shows KPI results matching the selected filters.

### AS-4: Unauthorized user attempts dashboard access
Given a user who is authenticated but does not have a role permitted for dashboard access  
When the user attempts to open the KPI dashboard  
Then the system denies access according to role-based permissions.

### AS-5: Maintenance costs are reported per vehicle and by fleet segment
Given maintenance cost data exists for vehicles in the application database  
When an authorized user views maintenance cost reporting  
Then the system shows maintenance costs per vehicle  
And the system shows aggregated maintenance costs by fleet segment.

### AS-6: Upcoming maintenance schedules are visible
Given maintenance schedule data exists for vehicles  
When an authorized user views the dashboard  
Then the system displays upcoming maintenance schedules.

### AS-7: Overdue maintenance alerts are generated
Given maintenance schedule data identifies maintenance that is overdue according to configured business rules  
When the system evaluates maintenance status  
Then the system generates overdue maintenance alerts  
And those alerts are available on the dashboard.

### AS-8: Utilization is reported daily and monthly per vehicle
Given utilization data exists for vehicles  
When an authorized user views fleet utilization monitoring  
Then the system reports daily utilization percentages per vehicle  
And the system reports monthly utilization percentages per vehicle.

### AS-9: Idle vehicles are flagged for review
Given utilization or availability data identifies vehicles meeting the idle criteria  
When the system evaluates fleet utilization  
Then the system flags idle vehicles for review.

### AS-10: Utilization data is integrated with scheduling systems
Given utilization data and scheduling-system integration are available  
When the system processes utilization information  
Then utilization data is integrated with scheduling systems  
And the expected utilization-related results are available to authorized users.

### AS-11: Invalid input is handled
Given an authenticated user submits invalid filter input  
When the system processes the request  
Then the system rejects or handles the invalid input according to validation rules  
And the system returns an appropriate error outcome.

### AS-12: Error or edge case is handled during feature operation
Given an authenticated authorized user performs a supported feature action  
When the system encounters an error or edge case  
Then the system handles the condition  
And returns an expected result consistent with the defined acceptance criteria.

### AS-13: Placeholder for undefined scenario 4 criteria
Given the business definition for scenario 4 is provided for a story  
When the corresponding operation is executed  
Then the system returns the expected results for scenario 4.

### AS-14: Placeholder for undefined scenario 5 criteria
Given the business definition for scenario 5 is provided for a story  
When the corresponding operation is executed  
Then the system returns the expected results for scenario 5.

## Traceability Matrix
| Source ID | Requirement | Acceptance Criteria | Test Coverage |
|---|---|---|---|
| Feature 51450 | FR-1, FR-17, FR-18, FR-22 | Feature supports fleet KPI monitoring for utilization, maintenance, and cost efficiency with API/UI and persistence/retrieval | Integration tests for end-to-end feature flows |
| US 51579 AC1 | FR-2 | KPI dashboards refresh data at least daily | Scheduled refresh test; dashboard data currency test |
| US 51579 AC2 | FR-3, FR-4, FR-5 | Users can filter KPIs by fleet, region, and time period | UI/API filter tests for each filter and combined filters |
| US 51579 AC3 | FR-6, FR-7 | Dashboard access controlled by role-based permissions | Authorization tests by role; unauthenticated/unauthorized access tests |
| US 51579 AC4 | FR-23 | System handles the operation correctly and returns expected results for scenario 4 | Pending test definition after scenario 4 is specified |
| US 51579 AC5 | FR-24 | System handles the operation correctly and returns expected results for scenario 5 | Pending test definition after scenario 5 is specified |
| US 51570 AC1 | FR-9, FR-10 | Maintenance costs tracked per vehicle and aggregated by fleet segment | Reporting tests for per-vehicle and aggregated maintenance cost results |
| US 51570 AC2 | FR-11 | Upcoming maintenance schedules visible on dashboards | Dashboard visibility test for maintenance schedules |
| US 51570 AC3 | FR-12 | Alerts generated for overdue maintenance | Alert generation test; dashboard alert display test |
| US 51570 AC4 | FR-23 | System handles the operation correctly and returns expected results for scenario 4 | Pending test definition after scenario 4 is specified |
| US 51570 AC5 | FR-24 | System handles the operation correctly and returns expected results for scenario 5 | Pending test definition after scenario 5 is specified |
| US 51561 AC1 | FR-13, FR-14 | System reports daily and monthly utilization percentages per vehicle | Utilization reporting tests for daily and monthly outputs |
| US 51561 AC2 | FR-15 | Idle vehicles flagged for review | Idle vehicle identification and display test |
| US 51561 AC3 | FR-16 | Utilization data integrated with scheduling systems | Integration test with scheduling-system data exchange/consumption |
| US 51561 AC4 | FR-23 | System handles the operation correctly and returns expected results for scenario 4 | Pending test definition after scenario 4 is specified |
| US 51561 AC5 | FR-24 | System handles the operation correctly and returns expected results for scenario 5 | Pending test definition after scenario 5 is specified |
| Story descriptions | FR-8, FR-19, FR-20 | Implement core logic and validation; handle errors and edge cases; display results or confirmation | Validation tests, negative-path tests, result-display tests |
| Story technical considerations | NFR-3, NFR-4, NFR-5 | Data source is application database; security includes authentication and input validation; performance meets SLA requirements | Configuration/integration tests, security tests, performance tests |

## Open Questions
1. What are the exact business definitions for acceptance criteria "scenario 4" and "scenario 5" in US 51579, US 51570, and US 51561?
2. What exact role-to-permission mapping applies to Fleet Analyst, Fleet Maintenance Coordinator, and Fleet Manager?
3. Is dashboard access limited by assigned fleets, regions, business units, or other authorization dimensions?
4. What formula defines daily and monthly utilization percentages per vehicle?
5. What threshold or rule determines that a vehicle is idle and must be flagged for review?
6. What rule determines that maintenance is overdue and should generate an alert?
7. What exactly constitutes a fleet segment for maintenance cost aggregation?
8. What is the required data refresh mechanism for KPIs: scheduled only, on-demand only, or both?
9. What are the expected UI layouts, navigation locations, chart/table formats, and labels for the dashboards?
10. What user-facing error and validation messages are required?
11. What API contract details are required, including operations, request/response schemas, authentication model, and error responses?
12. What are the scheduling-system integration details, including direction, protocol, timing, and data mapping?
13. What specific SLA targets apply to dashboard load, API response times, data refresh completion, and integration processing?
14. Are there accessibility standards or responsive behavior requirements that must be met for the web UI?
15. What data retention and historical reporting requirements apply to KPI data, maintenance costs, schedules, alerts, and utilization records?
16. How should missing, delayed, duplicate, or conflicting source data be handled?
17. Are users expected to receive proactive alert notifications outside the dashboard, or is in-dashboard visibility sufficient?
18. Is the API internal to the monolith/web application or intended for external consumers as well?

## Source References
- Feature 51450: Fleet Performance KPIs
- User Story US 51579: As Fleet Analyst, I want to perform KPI dashboard access to achieve real-time fleet performance insights
  - Acceptance Criteria 1: KPI dashboards refresh data at least daily
  - Acceptance Criteria 2: Users can filter KPIs by fleet, region, and time period
  - Acceptance Criteria 3: Dashboard access controlled by role-based permissions
  - Acceptance Criteria 4: System handles the operation correctly and returns expected results for scenario 4
  - Acceptance Criteria 5: System handles the operation correctly and returns expected results for scenario 5
- User Story US 51570: As Fleet Maintenance Coordinator, I want to perform maintenance cost reporting to achieve cost control and scheduling efficiency
  - Acceptance Criteria 1: Maintenance costs tracked per vehicle and aggregated by fleet segment
  - Acceptance Criteria 2: Upcoming maintenance schedules visible on dashboards
  - Acceptance Criteria 3: Alerts generated for overdue maintenance
  - Acceptance Criteria 4: System handles the operation correctly and returns expected results for scenario 4
  - Acceptance Criteria 5: System handles the operation correctly and returns expected results for scenario 5
- User Story US 51561: As Fleet Manager, I want to perform fleet utilization monitoring to achieve optimized asset deployment
  - Acceptance Criteria 1: System reports daily and monthly utilization percentages per vehicle
  - Acceptance Criteria 2: Idle vehicles flagged for review
  - Acceptance Criteria 3: Utilization data integrated with scheduling systems
  - Acceptance Criteria 4: System handles the operation correctly and returns expected results for scenario 4
  - Acceptance Criteria 5: System handles the operation correctly and returns expected results for scenario 5
- Additional source signals:
  - User-selected Application Type: web
  - User-selected Architecture Style: monolith
  - Feature description: Monitors key performance indicators for fleet operations including utilization, maintenance, and cost efficiency
  - Story technical considerations: Data source: application database; Security: authentication and input validation; Performance: meet SLA requirements
  - Story out of scope: Advanced customization (future story)
  - Derived design guideline: Users can filter KPIs by fleet, region, and time period