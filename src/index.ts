import dotenv from "dotenv";
import http from "http";

dotenv.config();

const message = "Hello World!";

http.createServer(function(request,response){

    console.log(message);
    response.end(message);

}).listen(process.env.PORT,  ()=>{
    console.log("Сервер начал прослушивание запросов");
});