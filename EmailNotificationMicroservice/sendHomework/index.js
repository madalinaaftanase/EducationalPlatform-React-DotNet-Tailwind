const nodemailer = require("nodemailer");

function getDayString(name) {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 12) {
    return "Buna dimineata, {name}!";
  } else if (hour >= 12 && hour < 18) {
    return "Buna ziua, {name}!";
  } else {
    return "Buna seara, {name}!";
  }
}

exports.handler = async (event) => {
  const { teacherEmail, studentName, studentEmail, message, photo } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "platformaeducationala01@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "platformaeducationala01@gmail.com",
    to: "madalina.g.varga@gmail.com",
    subject: "[Tema]",
    text: ` ${getDayString(studentName)} \n\n ${message}`,
    attachments: [
      {
        filename: "tema",
        content: Buffer.from(photo, "base64"),
      },
    ],
  };

  await new Promise((resolve) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      resolve();
    });
  });

  return {
    statusCode: 200,
  };
};
