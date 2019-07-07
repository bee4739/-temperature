import { Component } from '@angular/core';

declare var microgear;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public temp: any="25";
  public hum : any="70";
  public status: boolean=false;
  public timeString = "";

  constructor() {
    this.timeNow();
    this.Init();
  }
  public switch(){
    microgear.publish("/cpe/switch", `${this.status}`);
  }

  public Init(){


    microgear.on('connected', () => {
      microgear.subscribe("/cpe/+");
      console.log("เชื่อมต่อสำเร็จ");
    });

    microgear.on("message", (topic:string,msg:string) => {
      if (topic == "/APPIONIC/cpe/dht"){
        this.temp = msg.split(",")[0];
        this.hum = msg.split(",")[1];
      }
      console.log(`${topic} -> ${msg.split(",")[0]}`);
    });

    microgear.on('present', (event: any) => {
      console.log(event);
    });
  
    microgear.on('absent', (event: any) => {
      console.log(event);
    });
  }

  public getTime(time){
    let dt = new Date(time)
    //console.log(dt.getHours() + " " + dt.getMinutes());
    microgear.publish("/cpe/time", `${dt.getHours()}:${dt.getMinutes()}`);
  }
  public timeNow(){
    setInterval(()=>{
      let time = new Date();
      this.timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },1000);
  }

}
