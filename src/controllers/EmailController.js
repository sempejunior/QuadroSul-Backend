const nodemailer = require('nodemailer');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'quadrosul';
require('dotenv/config');


function decrypt(data) {
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = {

    async sendMail(request, response) {
        var { user, authorization } = request.headers;

        console.log("TESTE ENV: " + process.env.EMAIL);
        console.log("TESTE ENV: " + process.env.PASSWORD);


        var $user = process.env.EMAIL;
        var $authorization = process.env.PASSWORD;

        console.log("Usuario decriptado 2: " + $user);
        console.log("Senha decriptado 2: " + $authorization);

        const { from, subject, message, to } = request.body;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: $user,
                pass: $authorization
            }
        });


        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        return response.json({ "Sucesso": "Email enviado com sucesso" });


    }
}