const express = require("express"); //me importo express
const path = require("path");

const app = express(); //inicializar express

app.use(express.json()); //Traducir el body sino es undefined

// app.use(express.static(path.join(__dirname, 'public')));

//./public/index.html
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/", (req, res) => {
//   res.send("Hola alumnos, feliz lunes!!!");
// });

app.get("/home", (req, res) => {
  res.send("Bienvenidos a mi kelly");
});

app.get("/objJson", (req, res) => {
  res.send({
    name: "Pedro",
    apellido: "Garcia",
  });
});

//por parametro
app.get("/myName/:name", (req, res) => {
  console.log(req.params.name);
  res.send("My name is " + req.params.name);
});

//por query
app.get("/myNameQuery", (req, res) => {
  res.send("Hola soy " + req.query.name);
});

app.post("/myNameBody", (req, res) => {
  console.log(req.body);
  res.send("Hola mi nombre es " + req.body.name);
});

//* CRUD con express
const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
    status: "active",
  },
];

//Get members
app.get("/", (req, res) => {
  res.send({msg:"Todos los members",members});
});

//Get member by id
app.get("/id/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id); //devuelve true o false
  if (found) {
    res.send(members.filter((member) => member.id == req.params.id));
  } else {
    res.status(404).send(`Member with id ${req.params.id} not found`);
  }
});

//Post new member
app.post("/", (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!req.body.name || !req.body.email) {
    res.status(400).send("Por favor rellena todos los campos");
  } else {
    members.push(newMember);
    res.send(members);
  }
});

//update by id
app.put("/id/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id); //devuelve true o false
  if (found) {
    members.forEach((member) => {
      if (member.id == req.params.id) {
        (member.name = req.body.name), (member.email = req.body.email);
        res.send(member);
      }
    });
  } else {
    res.status(404).send(`Member with id ${req.params.id} not found`);
  }
});

//delete by id
app.delete("/id/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id); //devuelve true o false
  if (found) {
    res.send(members.filter((member) => member.id !== +req.params.id)); //+ convierte req.params.id en un numero
  } else {
    res.status(404).send(`Member with id ${req.params.id} not found`);
  }
});

app.listen(8080, () => console.log(`Servidor levantado en el puerto 8080`));
