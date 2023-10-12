import { EmailTemplate } from "./template";
import { Resend } from "resend";

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

export async function sendmail(mail: string, pin: string) {
  try {
    const data = await resend.emails.send({
      from: "Metro <metro_rider@resend.dev>",
      to: [mail],
      subject: "Hello world",
      react: EmailTemplate({ pin: pin }),
    });

    console.log(data);
  } catch (error) {
    return console.log({ error });
  }
}
