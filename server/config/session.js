const session = require('client-sessions');
const secret = require('../config').session.secret;

module.exports = session({
    cookieName: 'session',
    secret: secret,
    duration: 7200000,
    activeDuration: 300000,
    httpOnly: true,
    ephemeral: true
})
