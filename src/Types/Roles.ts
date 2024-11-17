export type Role = 'admin' | 'editor' | 'viewer';

export const permissions = {
    admin: ['create', 'read', 'update', 'delete'],
    editor: ['create', 'read', 'update'],
    viewer: ['read'],
};

export const canPerformAction = (role: Role, action: string): boolean => {
    return permissions[role]?.includes(action) || false;
};
