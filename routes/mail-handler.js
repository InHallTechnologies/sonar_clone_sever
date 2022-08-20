const express = require('express');
const nodemailer = require('nodemailer');

const mailRouter = express.Router();


mailRouter.get("/send-exceptional-request", (req, res) => {
    const { projectId, userId, time, reason, requestUID } = req.query;
    const mailTransport = nodemailer.createTransport({    
        host: "smtpout.secureserver.net",  
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        auth: {
            user: "krati@inhall.in",
            pass: "Rishabhmylove#1" 
        }
    });

    const mailOptions = {
        from: `krati@inhall.in`,
        to: `sougata.choudhury@diageo.com`,
        subject: `Exceptional Approval for ${projectId}`,
        html: `
            <h3>Exceptional Approval for <strong>${projectId}</strong></h3>
            <p><strong>Request By: </strong> Rishabh Verma</p>
            <p><strong>Reason: </strong> ${reason}</p>
            <p><strong>requestByUID: </strong> ${userId}</p>
            <p><strong>requestUID: </strong> ${requestUID}</p>
            <p><strong>requestTime: </strong> ${time}</p>
            <hr/>
            <h4>Access the project <a href="http://localhost:3000/?viewport=IZAnalyser">here</a></h4>
        `,
    };

    mailTransport.sendMail(mailOptions).then((result) => {
        res.send(result)
    })
})

mailRouter.get('/send-exceptional-request-mail-response', (req, res) => {
    const { projectId, userId, time, reason, requestUID, mailTo, status } = req.query;
    const mailTransport = nodemailer.createTransport({    
        host: "smtpout.secureserver.net",  
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        auth: {
            user: "krati@inhall.in",
            pass: "Rishabhmylove#1" 
        }
    });

    const mailOptions = {
        from: `krati@inhall.in`,
        to: mailTo,
        subject: `Response: Exceptional Approval for ${projectId}`,
        html: `
            <h3>Exceptional Approval for <strong>${projectId}</strong></h3>
            <p><strong>Request By: </strong> Rishabh Verma</p>
            <p><strong>Reason: </strong> ${reason}</p>
            <p><strong>requestByUID: </strong> ${userId}</p>
            <p><strong>requestUID: </strong> ${requestUID}</p>
            <p><strong>requestTime: </strong> ${time}</p>
            <hr />
            <p>Your request for exceptional approval is ${status}ED.</p>
            <hr />
            <h4>Access the project <a href="http://localhost:3000/?viewport=IZAnalyser">here</a></h4>
        `,
    };

    mailTransport.sendMail(mailOptions).then((result) => {
        res.send(result);
        console.log(result);
    })
})

module.exports = mailRouter