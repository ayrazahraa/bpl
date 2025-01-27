exports.listUsers = functions.https.onCall(async (data, context) => {
    if (!context.auth.token.admin) return { error: "Unauthorized" };
    
    const users = await admin.auth().listUsers();
    return users.users.map(user => ({
        uid: user.uid,
        email: user.email,
        admin: user.customClaims?.admin || false
    }));
});

exports.setAdmin = functions.https.onCall(async (data, context) => {
    if (!context.auth.token.admin) return { error: "Unauthorized" };
    
    await admin.auth().setCustomUserClaims(data.uid, { admin: data.admin });
    return { success: true };
});
