"use strict";

const apiMessages = require("../../data/api-strings");
const utils = require("../../utils");
const commentService = require("../../services/ticket-comment");
const db = require("../../models");
const enums = require("../../data/enums");

let controller = {};

controller.post = async (req, res) => {
    console.log("src/controllers/api/ticket-comments/post");

    let statusCode = apiMessages.OK.STATUS_CODE;
    let resObject = apiMessages.OK.PAYLOAD;
    
    const requiredFields = ["ticketId", "text"];

    const validRequest = await utils.isSuperSet(Object.keys(req.body), requiredFields);

    if (!validRequest) {
        statusCode = apiMessages.MISSING_REQUIRED_BODY.STATUS_CODE;
        resObject = await apiMessages.MISSING_REQUIRED_BODY.getPayload(requiredFields);
    } 
    else {
        
        const ticketRecord = await db.Ticket.findOne({
            where: {id: req.body.ticketId},
            include: db.User
        });

        if (!ticketRecord) {
            statusCode = apiMessages.INVALID_PARAM.STATUS_CODE;
            resObject = await apiMessages.INVALID_PARAM.getPayload("ticketId", req.body.ticketId);
        }
        else {
            
            if (req.user.role == enums.USER_TYPES.VALUES.STUDENT && req.user.id != ticketRecord.User.id) {
                statusCode = apiMessages.INVALID_AUTH.STATUS_CODE;
                resObject = apiMessages.INVALID_AUTH.PAYLOAD;
            }
            else {
                let data = {
                    ticketId: req.body.ticketId,
                    text: req.body.text,
                    author: req.user.id,
                }

                if (req.body.visibility) {

                    /**
                     * Students cannot set visibility of ticket comment
                     */
                    if (req.user.role == enums.USER_TYPES.VALUES.STUDENT) {
                        statusCode = apiMessages.INVALID_AUTH.STATUS_CODE;
                        resObject = apiMessages.INVALID_AUTH.PAYLOAD;
                    } 
                    else {
                        const visibility = await enums.TICKET_COMMENT_VISIBILITY.translate(req.body.visibility);
                    
                        if (visibility) {
                            data.visibility = visibility;
                        }
                        else {
                            statusCode = apiMessages.INVALID_BODY.STATUS_CODE;
                            resObject = await apiMessages.INVALID_BODY.getPayload(Object.values(enums.TICKET_COMMENT_VISIBILITY.VALUES));
                        }
                    }
                }

                if (resObject.ok) {
                    try {
                        const serviceRes = await commentService.createTicketComment(data);
                        
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
        }
    }

    res.statusCode = statusCode;
    res.send(resObject);
}

module.exports = controller;