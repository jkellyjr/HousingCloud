"use strict";

let api = {};

api.INVALID_AUTH = {
    STATUS_CODE: 401,
    PAYLOAD: {
        ok: false,
        error: "Invalid Authorization."
    }
};

api.INVALID_BODY = {
    STATUS_CODE: 400,
    getPayload: async (values) => {
        return {
            ok: false,
            error: `Invalid body. Valid properties: ${values}`
        }
    }
}

api.MISSING_REQUIRED_BODY = {
    STATUS_CODE: 400,
    getPayload: async (values) => {
        return {
            ok: false,
            error: `Missing required body arguments. Required properties: ${values}`
        }
    }
}

api.MISSING_PARAM = {
    STATUS_CODE: 400,
    getPayload: async (values) => {
        return {
            ok: false,
            error: `Missing required parameters. Required parameters: ${values}`
        }
    }
}

api.INVALID_PARAM = {
    STATUS_CODE: 400,
    getPayload: async (param, value) => {
        return {
            ok: false,
            error: `Invalid ${param}: ${value}`
        }
    }
}

api.INVALID_PARAM_OPTIONS = {
    STATUS_CODE: 400,
    getPayload: async (param, value, options) => {
        return {
            ok: false,
            error: `Invalid ${param}: ${value}. Valid values are: ${options}.`
        }
    }
}

api.SERVER_ERROR = {
    STATUS_CODE: 500,
    PAYLOAD: {
        ok: false,
        error: "Internal Server Error."
    }
}

api.OK = {
    STATUS_CODE: 200,
    PAYLOAD: {
        ok: true
    }
}

api.OK_DATA = {
    STATUS_CODE: 200,
    getPayload: async (data) => {
        return {
            ok: true,
            data: data
        }
    }
}


module.exports = api;