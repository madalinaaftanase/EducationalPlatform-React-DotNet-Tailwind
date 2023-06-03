const nodemailer = require("nodemailer");

function getDayString() {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 12) {
    return "Buna dimineata!";
  } else if (hour >= 12 && hour < 18) {
    return "Buna ziua!";
  } else {
    return "Buna seara!";
  }
}

exports.handler = async (event) => {
  const { teacherEmail, studentName, projectName, linkProject } = JSON.parse(event.body);

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
    subject: "[Verificare proiect]",
    text: ` ${getDayString()} \n\nAti primit o notificare de la studentul: ${studentName} \nPentru vizualizarea proiectul ${projectName}, accesati link-ul urmator: ${linkProject}`,
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
