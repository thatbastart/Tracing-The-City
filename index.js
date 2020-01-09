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
let r=3,c=1,tbl, avg=[[],[],[],[],[],[],[],[],[],[],[],[]];

function preload() {
  //Amt für Statistik Berlin Brandenburg
  //https://creativecommons.org/licenses/by/3.0/
  //https://www.statistik-berlin-brandenburg.de/webapi
  table = loadTable('files/Binnenwanderung_Berlin_2005-2013.csv', 'csv');
}

function setup() {
  canvas = createCanvas(2000, 2000,SVG);
  //canvas.parent("sketch");
  //background(255);
  rectMode(CENTER);
  ellipseMode(CENTER);
  tbl = table.getArray();
  let res=[];
  for (let i=0;i<tbl.length; i++){
    res[i]=tbl[i].map(Number);
  }
  for(let x=0;x<12;x++){
    c=1+x;
    for(let y=0;y<12;y++){
      let val=0;
      r=3+y;
      if(tbl[r][c]=="-"){
        val="-";
      } else {
        for(let i=0;i<=8;i++){
          val+=res[r][c];
          r+=16;
        }
        val=Math.round(val/=9);
      }
      avg[x][y]=val;
    }
  }

  let avg_total=0, sum=0;
  for(let j=0;j<12;j++){
    for(let i=0;i<12;i++){
      if(!isNaN(avg[j][i])){
        sum+=avg[j][i];
      }
    }
    sum/=12;
    sum=Math.round(sum);
    avg_total+=sum;
    sum=0;
  }
  avg_total/=12;
  avg_total=Math.round(avg_total);



  r=3;
  c=1;
  for(let p=0;p<=8;p++){
    noFill();
    if(p==0){
      //Abwanderung
      for(let i=0;i<12;i++){
        for(let j=0;j<12;j++){
          let x1=coord[i][0];
          let y1=coord[i][1];
          let x2=coord[j][0];
          let y2=coord[j][1];
          for(let k=0; k<=Math.round(avg[i][j]*0.002);k++){
            if(avg[i][j]<=avg_total){
              x1*=1.04;
              y1*=1.04;
              x2*=0.96;
              y2*=0.96;
            } else {
              x1*=1.04;
              y2*=1.04;
              x2*=0.96;
              y1*=0.96;
            }
            stroke(0,50,200);
            //stroke(0);
            strokeWeight(5);
            ellipse(x1,y1,2,2);
            strokeWeight(1);
            line(x1,y1,x2,y2);
          }
        }
      }
    }

    //Abwanderung
    for (let i=r; i<=r+11;i++){
      let s=0;
      for(let j=1;j<=12;j++){
        if(!isNaN(res[i][j])){
            s+=res[i][j];
        }
      }
      strokeWeight(1);
      stroke(200,0,0);
      //stroke(0);
      let tmp=Math.round(map(s,5000,25000,0,1000));
      ellipse(coord[i-r][0],coord[i-r][1],tmp,tmp);
    }

    //Zuwanderung
    for (let i=1; i<=12;i++){
      let s=0;
      for(let j=r;j<=r+11;j++){
        if(!isNaN(res[j][i])){
          s+=res[j][i];
        }
      }
      strokeWeight(1);
      stroke(255,106,0);
      //stroke(0);
      let tmp=Math.round(map(s,5000,25000,0,1000));
      ellipse(coord[i-1][0],coord[i-1][1],tmp,tmp);
    }
    
    r+=16;


    
  }    
  save();
}

function draw() {
  

}