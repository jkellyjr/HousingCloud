"use strict";

const ticketService = require("../../services/ticket");
const enums = require("../../data/enums");
const apiMessages = require("../../data/api-strings");
const utils = require("../../utils");

let controller = {};

controller.post = async (req, res) => {
    console.log("src/controllers/api/tickets/post");

    let statusCode = apiMessages.OK.STATUS_CODE;
    let resObject = apiMessages.OK.PAYLOAD;

    const requiredFields = ["subject", "category", "priority"];

    const validRequest = await utils.isSuperSet(Object.keys(req.body), requiredFields);

    if (!validRequest) {
        statusCode = apiMessages.MISSING_REQUIRED_BODY.STATUS_CODE;
        resObject = await apiMessages.MISSING_REQUIRED_BODY.getPayload(requiredFields);
    }
    else {
        
        const category = await enums.TICKET_CATEGORY.translate(req.body.category);
        const priority = await enums.TICKET_PRIORITY.translate(req.body.priority);

        if (!category) {
            statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
            resObject = await apiMessages.INVALID_BODY.getPayload(Object.keys(enums.TICKET_CATEGORY.VALUES));
        }
        else if (!priority) {
            statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
            resObject = await apiMessages.INVALID_BODY.getPayload(Object.keys(enums.TICKET_PRIORITY.VALUES));
        }
        else {
            let data = {
                requestor: req.user.id,
                subject: req.body.subject,
                category: category,
                priority: priority,
                location: req.body.location
            };
    
            if (req.body.state) {
                data.state = enums.TICKET_STATE.translate(req.body.state)
            }
            
            try {
                const serviceRes = await ticketService.createTicket(data);

                if (serviceRes) {
                    resObject = await apiMessages.OK_DATA.getPayload(serviceRes);
                }
                else {
                    statusCode = apiMessages.SERVER_ERROR.STATUS_CODE;
                    resObject = apiMessages.SERVER_ERROR.PAYLOAD;
                }
            }
            catch (e) {
                statusCode = apiMessages.SERVER_ERROR.STATUS_CODE;
                resObject = apiMessages.SERVER_ERROR.PAYLOAD;
            }
        }
    }

    res.statusCode = statusCode;
    res.send(resObject);
}

controller.get = async (req, res) => {
    console.log("src/controllers/api/tickets/get");

    let statusCode = apiMessages.OK.STATUS_CODE;
    let resObject = apiMessages.OK.PAYLOAD;

    let params = {
        userRole: req.user.role
    };

    if (req.user.role == enums.USER_TYPES.VALUES.STUDENT) {
        params.userId = req.user.id;   
    }
    else if (Object.keys(req.query).includes("userId")) {
        params.userId = req.query.userId;
    }

    /**
     * Valid arguments: ASC/DESC
     */
    if (Object.keys(req.query).includes("prioritySort") && req.user.role != enums.USER_TYPES.VALUES.STUDENT) {
        const sortVal = await enums.TICKET_API.PRIORITY_SORT.translate(req.query.prioritySort);
        if (sortVal) {
            params.prioritySort = sortVal; 
        }
        else {
            statusCode = apiMessages.INVALID_PARAM_OPTIONS.STATUS_CODE;
            resObject = await apiMessages.INVALID_PARAM_OPTIONS.getPayload("prioritySort", req.query.prioritySort, Object.keys(enums.TICKET_API.PRIORITY_SORT.VALUES));
        }
    }   

    if (Object.keys(req.query).includes("includeComments")) {
        
        /**
         * Must include ""... === true", otherwise the conditional
         * will result in true because the param exists and the conditional
         * will be evaluated "truthly"
         */
        if (req.query.includeComments === "true") {
            params.includeComments = true;
        }
    }

    if (resObject.ok) {
        try {
            const serviceRes = await ticketService.getTickets(params);
            resObject = await apiMessages.OK_DATA.getPayload(serviceRes);
        }
        catch (e) {
            statusCode = apiMessages.SERVER_ERROR.STATUS_CODE;
            resObject = apiMessages.SERVER_ERROR.PAYLOAD;
        }
    }
    
    res.statusCode = statusCode;
    res.send(resObject);
}

controller.patch = async (req, res) => {
    console.log("src/controllers/api/tickets/patch");

    let statusCode = apiMessages.OK.STATUS_CODE;
    let resObject = apiMessages.OK.PAYLOAD;

    if (req.user.role == enums.USER_TYPES.VALUES.STUDENT) {
        statusCode = apiMessages.INVALID_AUTH.STATUS_CODE;
        resObject = apiMessages.INVALID_AUTH.PAYLOAD;
    }
    else if (req.params.ticketId == undefined) {
        statusCode = apiMessages.MISSING_PARAM.STATUS_CODE;
        resObject = await api.MISSING_PARAM.getPayload("ticketId");
    }
    else if (!req.body || (!req.body.state && !req.body.priority)) {
        statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
        resObject = await apiMessages.INVALID_BODY.getPayload("state, priority")
    }
    else {

        let data = {};

        if (req.body.state) {
            
            const state = await enums.TICKET_STATE.translate(req.body.state);
            
            /**
             * Users can only set the state to fixed or rejected via Patch
             */
            if (state && (state == enums.TICKET_STATE.VALUES.FIXED || state == enums.TICKET_STATE.VALUES.REJECTED)) {
                data.state = state;
            }
            else {
                statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
                resObject = await apiMessages.INVALID_BODY.getPayload(`${enums.TICKET_STATE.VALUES.FIXED}, ${enums.TICKET_STATE.VALUES.REJECTED}`);
            }
        }

        if (req.body.priority) {
            const priority = await enums.TICKET_PRIORITY.translate(req.body.priority)

            if (priority) {
                data.priority = priority;
            }
            else {
                statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
                resObject = await apiMessages.INVALID_BODY.getPayload(Object.values(enums.TICKET_PRIORITY.VALUES));
            }
        }

        if (resObject.ok) {
            try {
                const res = await ticketService.updateTicket(req.params.ticketId, data);
                if (!res) {
                    statusCode = apiMessages.INVALID_PARAM.STATUS_CODE;
                    resObject = await apiMessages.INVALID_PARAM.getPayload("ticketId", req.params.ticketId);
                }
            }
            catch (e) {
                statusCode = apiMessages.SERVER_ERROR.STATUS_CODE;
                resObject = apiMessages.SERVER_ERROR.PAYLOAD;
            }
        }
    }

    res.statusCode = statusCode;
    res.send(resObject);
}

controller.delete = async (req, res) => {
    console.log("src/controllers/api/tickets/delete");

    let statusCode = apiMessages.OK.STATUS_CODE;
    let resObject = apiMessages.OK.PAYLOAD;

    if (req.user.role != enums.USER_TYPES.VALUES.ADMIN) {
        statusCode = apiMessages.INVALID_AUTH.STATUS_CODE;
        resObject = apiMessages.INVALID_AUTH.PAYLOAD;
    }
    else if (req.params.ticketId == undefined) {
        statusCode = apiMessages.MISSING_PARAM.STATUS_CODE;
        resObject = await api.MISSING_PARAM.getPayload("ticketId");
    }
    else {
        try {
            const res = await ticketService.deleteTicket(req.params.ticketId);
            if (!res) {
                statusCode = apiMessages.INVALID_PARAM.STATUS_CODE;
                resObject = await apiMessages.INVALID_PARAM.getPayload("ticketId", req.params.ticketId);
            }
        }
        catch (e) {
            statusCode = apiMessages.SERVER_ERROR.STATUS_CODE;
            resObject = apiMessages.SERVER_ERROR.PAYLOAD;
        }
    }

    res.statusCode = statusCode;
    res.send(resObject);
}

module.exports = controller;