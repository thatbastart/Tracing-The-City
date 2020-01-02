let canvas = undefined;
const coord=[ [840,860], //M
              [1040,1020], //FK
              [1045,610], //P
              [565,1040], //CH-W
              [345,900], //Sp
              [475,1300], //ST-Z
              [910,1290], //TS
              [1080,1275], //NK
              [1535,1350], //TK
              [1455,935], //MH
              [1225,890], //L
              [630,600]] //RDF
let table;
let fct=0.05; //scale factor
let Arr,r=3,c=1,tbl, avg=[[],[],[],[],[],[],[],[],[],[],[],[]];

function preload() {
  //Amt für Statistik Berlin Brandenburg
  //https://creativecommons.org/licenses/by/3.0/
  //https://www.statistik-berlin-brandenburg.de/webapi
  table = loadTable('files/Binnenwanderung_Berlin_2005-2013.csv', 'csv');
}

function setup() {
  canvas = createCanvas(2000, 2000,SVG);
  //canvas.parent("sketch");
  background(255);
  rectMode(CENTER);
  ellipseMode(CENTER);
  tbl = table.getArray();
  for(let x=0;x<12;x++){
    c=1+x;
    for(let y=0;y<12;y++){
      let val=0;
      r=3+y;
      if(tbl[r][c]=="-"){
        val="-";
      } else {
        for(let i=0;i<=8;i++){
          val+=parseInt(tbl[r][c],10);
          r+=16;
        }
        val=Math.round(val/=9);
      }
      avg[x][y]=val;
    }
  }

  r=3;
  c=1;
  for(let p=0;p<=8;p++){
    noFill();
    //Abwanderung
    for (let i=r; i<=r+11;i++){
      let s=0;
      for(let j=1;j<=12;j++){
        if(tbl[i][j]!="-"){
            s+=parseInt(tbl[i][j],10);
            if(p==8){
              let x1=coord[i-r][0];
              let y1=coord[i-r][1];
              let x2=coord[j-1][0];
              let y2=coord[j-1][1];
              for(let k=0; k<=Math.round(parseInt(tbl[i][j])*0.003);k++){
                x1*=1.01;
                y1*=1.01;
                x2*=0.99;
                y2*=0.99;
                stroke(0,0,200);
                strokeWeight(5);
                ellipse(x1,y1,2,2);
                strokeWeight(0.5);
                line(x1,y1,x2,y2);
              }
            }
        }
      }
      strokeWeight(1);
      stroke(200,0,0);
      let tmp=map(s,5000,25000,0,1000)
      ellipse(coord[i-r][0],coord[i-r][1],tmp,tmp);
    }
    //Zuwanderung
    for (let i=1; i<=12;i++){
      let s=0;
      for(let j=r;j<=r+11;j++){
        if(tbl[j][i]!="-"){
          s+=parseInt(tbl[j][i],10);
          if(p==8){
            let x1=coord[i-1][0];
            let y1=coord[i-1][1];
            let x2=coord[j-r][0];
            let y2=coord[j-r][1];
            for(let k=0; k<=Math.round(parseInt(tbl[j][i])*0.003);k++){
              x1*=1.01;
              y1*=0.99;
              x2*=0.99;
              y2*=1.01;
              stroke(0,150,200);
              strokeWeight(5);
              ellipse(x1,y1,2,2);
              strokeWeight(0.5);
              line(x1,y1,x2,y2);
            }
          }
        }
      }
      strokeWeight(1);
      stroke(255,106,0);
      let tmp=map(s,5000,25000,0,1000)
      ellipse(coord[i-1][0],coord[i-1][1],tmp,tmp);
    }
    
    r+=16;
  }     

}

function draw() {
  

}