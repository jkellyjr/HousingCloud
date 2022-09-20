# Housing Cloud Ticketing Application

## How to Run:

1. Clone the repository to your local environment.
2. Ensure Docker (`v20.10.*`) and Docker-Compose (`v2.10.*`) are installed.
3. Ensure Docker is running.
4. Execute `docker-compose up --build`

<br>

## Data Models

User:
- `id` (string | mandatory)
- `firstName` (string | mandatory)
- `lastName` (string | mandatory)
- `email` (string | mandatory)
- `role` (enum | mandatory)

Authorization:
- `userId` (string | mandatory)
- `token` (string | mandatory)
- `sessionExpiration` (date | mandatory)

Ticket:
- `id` (string | mandatory)
- `requestor` (relationship:user | mandatory)
- `subject` (string | mandatory)
- `category` (enum | mandatory)
- `priority` (enum | mandatory)
- `state` (enum | optional) default = open
- `location` (string | optional)


Room:
- `id` (string | mandatory)
- `buildingName` (string | mandatory)
- `number` (string | optional)
- `bedNumber` (string | mandatory)
- `type` (enum | mandatory): Single, double, triple, suite, etc.
- `purpose` (string | optional): athletes, honor students, etc.

Comment:
- `id` (string | mandatory)
- `ticketId` (relationship:ticket | mandatory)
- `text` (string | mandatory)
- `author` (relationship:user | mandatory)
- `date` (date | mandatory)
- `visibility` (enum | mandatory): which roles can view the comment (default: all)

<br>
<br>

## APIs
<br>

### Authorization:
All API requests require a bearer authorization token be supplied in the headers of the request. The structure should be: `authorization: Bearer {token}`.

<br>

### Content-Type:
Accepted JSON is the only accepted content type.

<br>

### Status Codes:

- 200: Ok (everything worked)
- 400: Bad Request (invalid body and/or parameters)
- 401: Invalid Authorization (incorrect secret or insufficient permissions)
- 500: Server Error (`:(`)

<br>
<br>

### Supported Methods

<br>

**Tickets**:

An endpoint to execute CRUD functions related to Tickets.

Endpoint: `/api/v1/reports/tickets`

Supported methods: `GET`, `POST`, `PATCH`, `DELETE`

<br>

GET:

Retrieve tickets. Access to tickets is controlled by role.

Params:
- `includeComments` (boolean): default false
- `prioritySort` (enum): ASC / DESC
- `userId` (string): default null

Notes:
- Students may only see tickets they created.
- Students cannot sort by priority.
- Students will not see Comments with visibility == INTERNAL.

<br>

POST:

Create a new ticket.

Accepted fields:

- `subject` (string | mandatory)
- `category` (enum | mandatory) -- Valid values: `ACCOUNTING`, `MAINTENANCE`, `LEAKS`, `UTILITIES`, `OTHER`
- `priority` (enum | mandatory) -- Valid values: `LOW`, `MEDIUM`, `HIGH`
- `location` (string | optional)

Notes:
- Anyone may create a ticket.

<br>

PATCH:

Update an existing ticket.

Required URL parameter: `ticketId` (e.g.`/api/v1/reports/tickets/{ticket_id}`).

Accepted fields:

- `category` (enum | mandatory) -- Valid values: `ACCOUNTING`, `MAINTENANCE`, `LEAKS`, `UTILITIES`, `OTHER`
- `priority` (enum | mandatory) -- Valid values: `LOW`, `MEDIUM`, `HIGH`

Notes:
- Students may not update any ticket.
  

<br>

DELETE:

Delete a ticket.

Required URL parameter: `ticketId` (e.g.`/api/v1/reports/tickets/{ticket_id}`).

Notes:
- Only admins may delete a ticket.

<br>
<br>

**TicketComments**:

An endpoint to execute CRUD functions related to Comments of tickets.

Endpoint: `/api/v1/reports/ticketComments`

Supported methods: `POST`

Accepted Fields:

- `ticketId` (string | required)
- `text` (string | required)
- `visibility` (enum | optional) -- Valid values: `INTERNAL` and `PUBLIC`

Notes:
- Students cannot set visibility.