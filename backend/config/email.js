const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplate")
const { mailTrapClient, sender } = require("./mailtrap")


const sendVerificationEmail = async(email, verificationToken,req,res) => {
    const recipient = [
        {
            email
        }
    ]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.log("Failed to send email Verification Email", error);
       
    }
}

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "65e1f012-7a14-4aa4-9258-6bcaf56f690d",
      template_variables: {
        company_info_name: "Test_Company_info_name",
        name: name,
      },
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.log("Failed to send Welcome Email", error);
  }
};


const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};


const sendResetSuccessEmail = async (email) => {
  const recipient = [{email}];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to : recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })


    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
}



module.exports = {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail
}