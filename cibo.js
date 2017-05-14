function Cibo (x,y,type) {
  
  this.pos = createVector(x,y);
  
  this.show = function () {
	if(type==verdi)
		stroke(200,200,200);
	if(type==rossi)
		stroke(150,0,0);
	
    strokeWeight(5);
    point(this.pos.x,this.pos.y);

  }
}