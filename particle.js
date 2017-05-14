function Particle (x,y,lista,famiglia,albVec) {
	this.albero=[];
	this.vivo=true;
	this.punti=0;
	this.tempo=0;
	this.pos = createVector(x,y);
	this.prev = createVector(x,y);
	this.vel=p5.Vector.random2D();
	this.acc=createVector();
	
	this.dna=[];
	
	if(lista == undefined) {
	
	//MASSA
		this.dna[0]=random(5,20);
	//VITA
		this.dna[1]=20;
	//VOLONTA VERDE
		this.dna[2]=random(0.1,1);
	//VOLONTA ROSSA
		this.dna[4]=random(-1,-0.1);
	//VISIONE VERDE
		this.dna[3]=random(this.dna[0]+1,100);
	//VISIONE ROSSA
		this.dna[7]=random(this.dna[0]+1,100);
	//VALORE VERDE
		this.dna[5]=1;//random(0,ValoreCibo);
	//VALORE ROSSO
		this.dna[6]=-1;//random(-ValoreCibo,0);
	//MAX VELOCITA
		this.dna[8]=random(1,3);
	//COLORE
		this.dna[9]=0;
	} else {
		
		this.albero=albVec;
		this.albero[generazione]=famiglia;
		this.dna[9]=lista[9]+50;
		
		if(random(100)<mutazione) {
			this.dna[0]=lista[0]+(random(-mut,mut));
			if(this.dna[0] < 1) 
				this.dna[0]=1;
		} else
			this.dna[0]=lista[0];
		
		// if(random(100)<mutazione)
			// this.dna[1]=lista[1]+(random(-mut,mut));
		// else
			this.dna[1]=lista[1];
		
		if(random(100)<mutazione) {
			this.dna[2]=lista[2]+(random(-mut,mut));
			if(this.dna[2] < 0.1) 
				this.dna[2]=0.1;
		} else
			this.dna[2]=lista[2];
		
		if(random(100)<mutazione) {
			this.dna[3]=lista[3]+(random(-mut,mut));
			if (this.dna[3] < this.dna[0]+1)
				this.dna[3]=this.dna[0]+1;
		} else {
			
		this.dna[3]=lista[3];
			if (this.dna[3] < this.dna[0]+1)
				this.dna[3]=this.dna[0]+1;
		}
		
		if(random(100)<mutazione) {
			this.dna[4]=lista[4]+(random(-mut,mut));
			if(this.dna[4] > -0.1)
				this.dna[4]=-0.1;
		} else
			this.dna[4]=lista[4];
		
		// if(random(100)<mutazione)
			// this.dna[5]=lista[5]+(random(-mut,mut));
		// else
			this.dna[5]=lista[5];
		
		// if(random(100)<mutazione)
			// this.dna[6]=lista[6]+(random(-mut,mut));
		// else
			this.dna[6]=lista[6];
		
		if(random(100)<mutazione) {
			this.dna[7]=lista[7]+(random(-mut,mut));
			if (this.dna[7] < this.dna[0]+1)
				this.dna[7]=this.dna[0]+1;
		} else {
			this.dna[7]=lista[7];
			if (this.dna[7] < this.dna[0]+1)
				this.dna[7]=this.dna[0]+1;
		}
		
		if(random(100)<mutazione)
			this.dna[8]=lista[8]+(random(-mut,mut));
		else
			this.dna[8]=lista[8];

	}
	// if(random(1) < 0.5){
		// this.sex = "M";
		//this.rgb = [0,0,0,100];
	// } else {
		// this.sex = "F";
		// this.rgb = [150,100,100,100];
	// }
  
  this.attracted = function (target,index,type,VEL,VAL) {
		var force = p5.Vector.sub(target.pos, this.pos);
		var dsquared = force.magSq();
		//dsquared = constrain(dsquared,VEL,VEL);
    
		var G = 5;
		var strength = G / dsquared;
		force.setMag(VEL);
		this.acc.add(force);
			

		if(Math.abs(this.pos.x-type[index].pos.x) < (this.dna[0]/2) && Math.abs(this.pos.y-type[index].pos.y) < (this.dna[0]/2)) {
			type.splice(index,1);
			//this.dna[0]+=0.1;
			this.tempo-=VAL/4;
			this.punti+=VAL;
			type.push(new Cibo(random(width),random(height),type));
		}
  }
  
  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.dna[8]);
    this.pos.add(this.vel);
    this.acc.mult(0);
	
	this.tempo+=ValoreTempo;
	//this.punti+=0.1;
	if(this.tempo > this.dna[1]) {
		this.vivo=false;
	}
  }
  
  this.show = function () {

    stroke(this.dna[9]);
    strokeWeight(this.dna[0]);
    //point(this.pos.x,this.pos.y);
	if(this.pos.x > width || this.pos.x <0)
		this.vel.x*=-1;
	if(this.pos.y > height || this.pos.y <0)
		this.vel.y*=-1;
    line(this.pos.x,this.pos.y,this.prev.x,this.prev.y);
    //ellipse(this.pos.x,this.pos.y,10,10);
	
	this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
    
	if(debug.checked()) {
	stroke(0,150,0);
	strokeWeight(1);
	noFill();
	ellipse(this.pos.x,this.pos.y,this.dna[3],this.dna[3])
	
	stroke(150,0,0);
	strokeWeight(1);
	noFill();
	ellipse(this.pos.x,this.pos.y,this.dna[7],this.dna[7])
	
	}
	

  }
  
  this.target = function (type,VEL,VAL,VIS) {
		var TOT=Infinity;
		for (var j = 0 ; j < type.length;  j++) {		
			if( ( Math.abs(this.pos.x-type[j].pos.x) + Math.abs(this.pos.y-type[j].pos.y) ) < TOT ) {
				TOT=(Math.abs(this.pos.x-type[j].pos.x)+Math.abs(this.pos.y-type[j].pos.y));
				if (TOT<(VIS/2))
					this.attracted(type[j],j,type,VEL,VAL)
				// else if (this.acc.x==0 && this.acc.y == 0) {
					// this.acc.x=random(-this.dna[2],this.dna[2]);
					// this.acc.y=random(-this.dna[2],this.dna[2]);
				//}
			}
		}
  }
}