import { Body, Container, Text, Section, Button, Html, Head, Tailwind } from '@react-email/components'

interface Props {
    code: string; // code = email
};

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export default function UnsubscribeTemplate({ code }: Props) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="font-sans text-gray-400 bg-gray-100 py-6">
                    <Container className="my-6 bg-white shadow-sm">
                        <Section className="m-6 text-[16px] leading-[23px]">
                            <Text>Click the link to unsubscribe:</Text>
                            <Button
                                style={{ color: "black", padding: "10px 20px"}}
                                href={`${baseUrl}/api/unsubscribe?code=${code}`}
                            >
                                Unsubscribe
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}