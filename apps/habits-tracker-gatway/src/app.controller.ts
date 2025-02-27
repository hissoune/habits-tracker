import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
const Consul = require('consul');
@Controller()
export class AppController {
  private consul = new Consul();

  constructor(private readonly appService: AppService) {}

  async getServiceAddress(serviceName: string): Promise<string | null> {
    const services = await this.consul.agent.service.list();
    const service = Object.values(services).find((s: any) => s.Service === serviceName) as { Address: string, Port: number } | undefined;
    return service ? `http://${service.Address}:${service.Port}` : null;
  }

  @All('*')
  async proxyRequest(@Req() req, @Res() res) {    
    const [_, serviceName, ...path] = req.url.split('/');
    const serviceUrl = await this.getServiceAddress(serviceName);

    if (!serviceUrl) {
      return res.status(500).json({ error: `Service ${serviceName} not found` });
    }
    
    try {
      const response = await axios({
        method: req.method,
        url: `${serviceUrl}/${path.join('/')}`,
        data: req.body,
        headers: req.headers,
      });
   
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
