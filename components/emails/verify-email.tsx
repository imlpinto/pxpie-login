import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
    username: string, 
    verifyUrl: string, 
}

const VerifyEmail = (props: VerifyEmailProps) => {
    const { username, verifyUrl } = props;
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your account setup</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                Verify Your Email Address
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Thanks {username} for signing up! To complete your account setup and start using our services, 
                please verify your email address by clicking the button below.
              </Text>
              
              <Section className="text-center mb-[32px]">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-medium box-border"
                >
                  Verify Email Address
                </Button>
              </Section>
              
              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                If the button doesn't work, you can copy and paste this link into your browser:
                <br />
                {verifyUrl}
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[32px] leading-[20px]">
                This verification link will expire in 24 hours for security reasons.
              </Text>
            </Section>
            
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                123 Business Street, Suite 100<br />
                San Salvador, El Salvador
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] mt-[8px] m-0">
                © 2026 Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;