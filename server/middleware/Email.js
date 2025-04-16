import { Verification_Email_Template, Welcome_Email_Template } from '../libs/emailTemplate.js';
import { transporter } from './EmailConfig.js';

export const SendVerificationCode = async (email, fullName, verificationCode) => {
  try {
    const htmlContent = Verification_Email_Template(verificationCode); 

    await transporter.sendMail({
      from: '"NotesApp" <tinkalkumar67693@gmail.com>',
      to: email,
      subject: 'Verify Your Email',
      text: 'Verify your email using the code provided.',
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error on sending verification email:", error);
  }
};

export const WelcomeEmail = async (email, fullName) => {
    try {
      const htmlContent = Welcome_Email_Template(fullName); 
  
      await transporter.sendMail({
        from: '"NotesApp" <tinkalkumar67693@gmail.com>',
        to: email,
        subject: 'Welcome to NotesApp!',
        text: 'Welcome to the community!',
        html: htmlContent,
      });
    } catch (error) {
      console.error("Error on sending welcome email:", error);
    }
  };
  
