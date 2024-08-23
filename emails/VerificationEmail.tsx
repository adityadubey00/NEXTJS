import * as React from 'react';
import { Html, Button } from "@react-email/components";

interface EmailProps {
  url?: string;
  username?: string; // Optional username
  otp?: string; // Optional OTP or verification code
}

export function VerificationEmail({ url = "#", username, otp }: EmailProps) {
  return (
    <Html lang="en">
      <div>
        <p>Hello {username},</p>
        <p>Your verification code is: {otp}</p>
        <Button href={url}>Click here to verify</Button>
      </div>
    </Html>
  );
}

export default VerificationEmail;
