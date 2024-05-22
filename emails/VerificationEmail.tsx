import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationProps {
  username: string;
  otp: string;
}

export function VerificationEmail({ username, otp }: VerificationProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fontWeight={400}
          fontStyle="normal"
          fallbackFontFamily={"Verdana"}
        />
      </Head>
      <Preview>Here&apos;s  your verification code : {otp}</Preview>
      <Section>
        <Row>
            <Heading as='h2'>Hello {username},</Heading>
        </Row>
        <Row>
            <Text>
                Thank you  for registering with us. Please use the following verification code to complete your registration:
            </Text>
        </Row>
        <Row>
            <Text>{otp}</Text>
        </Row>
        <Row>
            <Text>
                If you did not request this login code, please ignore this email
            </Text>
        </Row>
        {/* <Row>
            <Button href={``}
            style={{color: '#61dafb'}}>
                Verify Here
            </Button>
        </Row> */}
      </Section>
    </Html>
  );
}

export default VerificationEmail;
