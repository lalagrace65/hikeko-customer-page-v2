import nodemailer from 'nodemailer';
import { TravelAgencySignUp } from '@/models/SignUp';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}) => {
        try{
            //Create a hashed token
            const hashedToken = await bcryptjs.hash(userId.
                toString(), 10)
            if (emailType === "VERIFY"){
                await TravelAgencySignUp.findByIdAndUpdate(userId,{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000})        
            } else if (emailType === "RESET"){
                await TravelAgencySignUp.findByIdAndUpdate(userId,{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000})
            }

            // Looking to send emails in production? Check out our Email API/SMTP product!
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "195a090978faed",
                pass: "483f3842a0514e"
                }
            });

            const mailOptions = {
                from: 'hikeko.app@gmail.com',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
                 </p>`
            }
            const mailresponse = await transporter.sendMail
            (mailOptions);
            return mailresponse;

        } catch (error){
            throw new Error(error.message);
        }
    }
