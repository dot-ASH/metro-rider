// import { EmailTemplate } from "./template";
// import { Resend } from "resend";
import axios from "axios";

// const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);
const RESEND_KEY = process.env.REACT_APP_RESEND_API_KEY;
const sendmail = async (mail: string, pin: string) => {
  try {
    const apiUrl = "https://api.resend.com/emails";
    const PROXY_KEY = "temp_ea559f12db16264f3b53beb7b4f6b376";

    const response = await axios.post(
      apiUrl,
      {
        from: "Metro Rider <metro_rider@resend.dev>",
        to: [mail],
        subject: "Your Account is Registered",
        html: `<p>Now you can login using our app<br/>Now login with these pin <strong>${pin}</strong><br />And you should change it from app settings</p>`,
      },
      {
        headers: {
          "x-cors-api-key": PROXY_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_KEY}`,
        },
      }
    );

    console.log("Response:", response.data);
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error:", error);
    // throw new Error('Failed to send email');
  }
};

export default sendmail;
