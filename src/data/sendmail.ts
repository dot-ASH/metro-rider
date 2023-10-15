import emailjs from "@emailjs/browser";

type templateParams = {
  pin: string;
  email: string;
};

const sendmail = async (params: templateParams) => {
  const template = {
    email: params.email,
    pin: params.pin,
  };
  emailjs
    .send("service_4vujh4r", "template_wbvn7ze", template, "z0pXu4ltaz77MXeiQ")
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};

export default sendmail;
