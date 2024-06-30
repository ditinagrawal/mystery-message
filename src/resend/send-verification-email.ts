import { resend } from "./resend";
import { VerificationEmailTemplate } from "./templates/verification-email-template";
import { ApiResponse } from "@/types/api-response";

export const sendVerificationEmail = async (
    email: string,
    username: string,
    code: string
): Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Mystery Message | Verification Code",
            react: VerificationEmailTemplate({ username, code }) as React.ReactElement,
        })
        return {
            success: true,
            message: "Verification email sent",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to send verification email",
        }
    }
}