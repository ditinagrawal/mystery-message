import * as React from 'react';

interface EmailTemplateProps {
    username: string;
    code: string;
}

export const VerificationEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    username,
    code,
}) => (
    <div className='flex flex-col items-center justify-center text-center'>
        <h1>Hello, {username}!</h1>
        <h3>Your Verification Code is, {code}</h3>
    </div>
);
