const nodemailer = require("nodemailer");

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
    text: ` Ati primit o notificare de la studentul: ${studentName} \n
              Daca doriti sa verificati proiectul ${projectName}, clickati pe link-ul urmator: ${linkProject}`,
  };

  await new Promise(resolve => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      resolve()
    })
  });
  
  return {
    statusCode: 200
  };
};
