const Server = require("./server/config.server"); //importa la clase server.
const server = new Server(3001); //se crea una nueva instancia en la clase server.
server.listen(); //se llama al metodo listen del Server.

//Mientras menos código tenga el "index.js" renderiza mas rapido.
