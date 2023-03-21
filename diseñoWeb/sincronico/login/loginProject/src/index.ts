import cors = require("cors")
import * as express from "express"
import helmet from "helmet";
import { AppDataSource } from "./data-source"
import routes from "./routes";


//Siempre hay que declarar la siguiente variable
const PORT = process.env.port || 3000;

AppDataSource.initialize().then(async () => {


    // create express app // configuracion necesaria para el funcionamiento de app
    const app = express();
    app.use(express.json())
    app.use(cors());
    app.use(helmet());
    app.use('/', routes);


    // setup express app here
    // ...

    // start express server
    app.listen(PORT,()=>{console.log(`Servidor express levantado en el puerto ${PORT}`)} );

    

}).catch(error => console.log(error))
