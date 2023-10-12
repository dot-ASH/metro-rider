import * as React from "react";

interface EmailTemplateProps {
  pin: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    pin,
}) => (
  <div>
    <p>
      Now you can login using our app
      <br />
      Now login with these pin <strong>{pin}</strong>
      <br />
      And you should change it from app settings
    </p>
  </div>
);
