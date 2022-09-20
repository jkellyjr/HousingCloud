"use strict";

const USER_TYPES = {
    VALUES: {
        STUDENT: "STUDENT",
        ADMIN: "ADMIN",
        STAFF: "NON_ADMIN_STAFF"
    }
};

const TICKET_PRIORITY = {
    VALUES: {
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH"
    },
    translate: async (str) => {
        return Object.keys(TICKET_PRIORITY.VALUES).find(key => TICKET_PRIORITY.VALUES[key].toLowerCase() === str.toLowerCase());
    }
};

const TICKET_CATEGORY = {
    VALUES: {
        ACCOUNTING: "ACCOUNTING",
        MAINTENANCE: "MAINTENANCE",
        LEAKS: "LEAKS",
        UTILITIES: "UTILITIES",
        OTHER: "OTHER",
    },
    translate: async (str) => {
        return Object.keys(TICKET_CATEGORY.VALUES).find(key => TICKET_CATEGORY.VALUES[key].toLowerCase() === str.toLowerCase()
        );
    }
}

const TICKET_STATE = {
    VALUES: {
        OPEN: "OPEN",
        PENDING: "PENDING",
        FIXED: "FIXED",
        REJECTED: "REJECTED",
        DELETED: "DELETED",
    },
    translate: async (str) => {
        return Object.keys(TICKET_STATE.VALUES).find(key => TICKET_STATE.VALUES[key].toLowerCase() === str.toLowerCase());
    }
}

const TICKET_API = {
    PRIORITY_SORT: {
        VALUES: {
            ASC: "ASC",
            DESC: "DESC"
        },
        translate: async (str) => {
            return Object.keys(TICKET_API.PRIORITY_SORT.VALUES).find(key => TICKET_API.PRIORITY_SORT.VALUES[key].toLowerCase() === str.toLowerCase());
        }
    }
}

const ROOM_TYPE = {
    VALUES: {
        SINGLE: "SINGLE",
        DOUBLE: "DOUBLE",
        TRIPLE: "TRIPLE",
        SUITE: "SUITE"
    },
    translate: async (str) => {
        return Object.keys(ROOM_TYPE.VALUES).find(key => ROOM_TYPE.VALUES[key].toLowerCase() === str.toLowerCase());
    }
}

const ROOM_PURPOSE = {
    VALUES: {
        ATHLETES: "ATHLETES",
        HONORS: "HONOR_STUDENTS",
        MOBILITY_ACCESSIBILITY: "MOBILITY_ACCESSIBILITY"
    },
    translate: async (str) => {
        return Object.keys(ROOM_PURPOSE.VALUES).find(key => ROOM_PURPOSE.VALUES[key].toLowerCase() === str.toLowerCase());
    }
}

const TICKET_COMMENT_VISIBILITY = {
    VALUES: {
        PUBLIC: "PUBLIC",
        INTERNAL: "INTERNAL"
    },
    translate: async (str) => {
        return Object.keys(TICKET_COMMENT_VISIBILITY.VALUES).find(key => TICKET_COMMENT_VISIBILITY.VALUES[key].toLowerCase() === str.toLowerCase());
    }
}


module.exports = {
    USER_TYPES,
    TICKET_PRIORITY,
    TICKET_CATEGORY,
    TICKET_STATE,
    TICKET_API,
    ROOM_TYPE,
    ROOM_PURPOSE,
    TICKET_COMMENT_VISIBILITY
};