export const STORAGE_KEYS = {
    token: 'grow_token',
    user: 'grow_user',
};

/** Normalize API user shape (_id vs id) for consistent frontend state */
export const normalizeUser = (user) => {
    if (!user) return null;

    return {
        id: user.id || user._id?.toString?.() || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};
