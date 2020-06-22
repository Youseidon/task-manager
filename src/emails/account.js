const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (to, name) => {
    sgMail.send({
        to: to,
        from: 'nou.yousef@gmail.com',
        subject: 'Welcome to Task Manager application',
        text: `welvome to the application ${name}. let me know how you get along with the app `
    })
}
const sendCancelationEmail = (to, name) => {
    sgMail.send({
        to: to,
        from: 'nou.yousef@gmail.com',
        subject: 'Email Cancelation',
        text: `Dear ${name}, I hope you never regret your consumption cancelation. farewell`
    })
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }