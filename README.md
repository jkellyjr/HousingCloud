# Housing Cloud Ticketing Application

## Data Models

User:
- id (string | mandatory)
- firstName (string | mandatory)
- lastName (string | mandatory)
- email (string | mandatory)
- role (enum | mandatory)
- tickets (relationship:ticket | optional)
- room (relationship:room | optional)
- authorization (relationship:authorization | optional)

Authorization:
- userId (string | mandatory)
- token (string | mandatory)
- sessionExpiration (date | mandatory)

Ticket:
- id (string | mandatory)
- requestor (relationship:user | mandatory)
- asignee (relationship:user | optional): Nice to have
- subject (string | mandatory)
- category (enum | mandatory)
- priority (enum | mandatory)
- state (enum | optional) default = open
- location (string | optional)
- creationDate (date | mandatory)
- lastEdit (date | mandatory)
- comments (relationship:comments | optional)
<!-- - roomId (relationship:room | optional) -->


Room:
- id (string | mandatory)
- buildingName (string | mandatory)
- roomNumber (string | optional)
- bedNumber (string | mandatory)
- type (enum | mandatory): Single, double, triple, suite, etc.
- purpose (string | optional): athletes, honor students, etc.
- occupants (relationship:user | optional)

<!-- 
Location:
- name (string | mandatory)
- latitude (string | mandatory)
- longitude (string | mandatory) -->

Comment:
- id (string | mandatory)
- ticketId (relationship:ticket | mandatory)
- text (string | mandatory)
- author (relationship:user | mandatory)
- date (date | mandatory)
- visibility (enum | mandatory): which roles can view the comment (default: all)


## APIs

Endpoint: `/api/v1/reports/tickets`

Supported methods: GET, POST, PUT, PATCH, DELETE

GET Params:
- includeComments (boolean): default false
- prioritySort (enum): increasing and decreasing