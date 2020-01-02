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
let Arr,c=3,tbl;

function preload() {
  //Amt für Statistik Berlin Brandenburg
  //https://creativecommons.org/licenses/by/3.0/
  //https://www.statistik-berlin-brandenburg.de/webapi
  table = loadTable('files/Binnenwanderung_Berlin_2005-2013.csv', 'csv');
}

function setup() {
  canvas = createCanvas(2000, 2000,SVG);
  //canvas.parent("sketch");
  //background(0);
  rectMode(CENTER);
  ellipseMode(CENTER);
  tbl = table.getArray();
  for(let p=0;p<=8;p++){
    noFill();
    //Abwanderung
    for (let i=c; i<=c+11;i++){
      let s=0;
      for(let j=1;j<=12;j++){
        if(tbl[i][j]!="-"){
          let x1,y1,x2,y2;
          x1=coord[i-c][0];
          y1=coord[i-c][1];
          x2=coord[j-1][0];
          y2=coord[j-1][1];
          for(let k=0; k<=Math.round(parseInt(tbl[i][j])*0.005);k++){
            x1*=1.02;
            y1*=1.02;
            x2*=0.98;
            y2*=0.98;
            strokeWeight(0.2);
            stroke(0,0,200);
            line(x1,y1,x2,y2);
          }
            s+=parseInt(tbl[i][j],10);
        }
      }
      strokeWeight(1);
      stroke(200,0,0);
      let tmp=map(s,5000,25000,0,1000)
      ellipse(coord[i-c][0],coord[i-c][1],tmp,tmp);
    }
    //Zuwanderung
    for (let i=1; i<=12;i++){
      let s=0;
      for(let j=c;j<=c+11;j++){
        if(tbl[j][i]!="-"){
          s+=parseInt(tbl[j][i],10);
        }
      }
      //rect(coord[i-1][0],coord[i-1][1],s*fct,s*fct);
    }
    c+=16;
  }

}

function draw() {
  

}