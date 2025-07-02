import HttpServer from "../../application/http/HttpServer";
import express from "express";
import cors from "cors";

export default class HttpServerExpress implements HttpServer {
    private app: any = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    public async register(
        parameters: string[], method: string, 
        url: string, middleware: Function[] = [],
        callback: Function
    ): Promise<void> {
        this.app[method](url, ...middleware, async (req: any, res: any) => {
            const request: any[] = [];
            if (parameters) parameters.forEach(parameters => {
                    request.push(req[parameters]);
                });
            request.reverse();
            request.push(res);
            request.push(req); 
            try {
                const result = await callback(...request);
                if (result) res.json(result);
            } catch (e: any) {
                console.log(e.message);
                res.status(422).json({ message: e.message });
            }
        });
    }

    public async registerRoutes(controllerInstance: any): Promise<void> {
        const constructor = controllerInstance.constructor;
        const prefix = constructor.prefix || "";
        if (!constructor.routes) return;
        console.log(`\n------${prefix}------`);
        const routes = constructor.routes;
        for (const route in routes) {
            if (!routes[route].middleware) routes[route].middleware = [];
            const fullPath = prefix + routes[route].path;
            const callback: Function = controllerInstance[route].bind(controllerInstance);
            this.register(
                routes[route].parameters, 
                routes[route].method, fullPath, 
                routes[route].middleware, 
                callback
            );
            console.log(`✅ [${routes[route].method.toUpperCase()}] ${fullPath}`);
        }
    }

    public async listen(port: number): Promise<void> {
        this.app.listen(port, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${port}`)
        })
    }
}