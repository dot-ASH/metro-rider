import emailjs from "@emailjs/browser";

type templateParams = {
  pin: string;
  email: string;
};

const SERVICE_KEY = process.env.REACT_APP_RESEND_API_KEY;
const TEMPLATE_KEY = process.env.REACT_APP_EMAIL_TEMPLATE;
const PUBLIC_KEY = process.env.REACT_APP_EMAIL_PUBLIC;

const sendmail = async (params: templateParams) => {
  const template = {
    email: params.email,
    pin: params.pin,
  };
  emailjs.send(SERVICE_KEY, TEMPLATE_KEY, template, PUBLIC_KEY).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};

export default sendmail;
