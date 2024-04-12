import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "AnonHub<onboarding@resend.dev>",
      to: email,
      subject: "AnonHub | Verification Code",
      react: VerificationEmail({ username, otp }),
    });
    return { success: true, message: "Verification email sent" };
  } catch (emailError) {
    console.log("Error sending email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
