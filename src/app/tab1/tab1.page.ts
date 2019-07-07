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

  public Init(){
    microgear.on('connected', () => {
      console.log("เชื่อมต่อสำเร็จ");
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
    console.log(dt.getHours() + " " + dt.getMinutes());
  }
  public timeNow(){
    setInterval(()=>{
      let time = new Date();
      this.timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },1000);
  }

}
