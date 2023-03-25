import emailjs from "@emailjs/browser";

export default function sendEmail(templateData, page) {
  console.log(templateData);
  const SERVICE_ID = "service_ekr887l";
  var TEMPLATE_ID;
  if (page == "safe") {
    TEMPLATE_ID = "template_s8xm61h";
  } else if (page == "token") {
    TEMPLATE_ID = "template_1adssxk";
  }
  const PUBLIC_KEY = "Wd5h0UVRI2iClsFZZ";
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateData, PUBLIC_KEY).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}
