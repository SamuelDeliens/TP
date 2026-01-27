const typePermissions = {
    resource: {
        'logs': 'logs',
        'users': 'users',
        'cards': 'cards',
        'userCards': 'userCards',
    },
    method: {
        'GET': 'read',
        'POST': 'create',
        'PUT': 'update',
        'PATCH': 'update',
        'DELETE': 'delete',
    },
    destination: {
        'self': 'self',
        'all': 'all',
    },
    default: [
        "users:read",
        "cards:read",
        "userCards:read"
    ],
    all: [
        "users:create",
        "users:read",
        "users:update:self",
        "users:update:all",
        "users:delete:self",
        "users:delete:all",

        "cards:read",

        "userCards:read"
    ]
}

export {
    typePermissions
}
