var verdi = [];
var rossi = [];
var particles = [];
var generazione = 0;
var morti=0;
var TOTparticelle=100;
var METAparticelle=TOTparticelle/2;
var mutazione=1;
var mut=0.1;
var ValoreTempo=0.01;
var debug;
var button;

function setup() {
	createCanvas(1920,1080);
	for (var i = 0; i < TOTparticelle; i++){
		particles.push(new Particle(random(width),random(height)));
		//particles.push(new Particle(400,400));
	}
  
	for (var i = 0; i < 400; i++){
		verdi.push(new Cibo(random(width),random(height),verdi));
	}
  
	for (var i = 0; i < 200; i++){
		rossi.push(new Cibo(random(width),random(height),rossi));
	}
	
	debug = createCheckbox();
	
	console.log("Generazione = 0");

}

function draw(){
		VITA();
}

function VITA() {
	
	background(175);

	for (var i = 0; i < verdi.length; i++){
		verdi[i].show();
	}
	
	for (var i = 0; i < rossi.length; i++){
		rossi[i].show();
	}
	

	for(var i = 0 ; i < particles.length ; i++) {
		if (particles[i].vivo) {
			particles[i].target(verdi,particles[i].dna[2],particles[i].dna[5],particles[i].dna[3]);
			particles[i].target(rossi,particles[i].dna[4],particles[i].dna[6],particles[i].dna[7]);
			particles[i].update();
			particles[i].show(particles[i].albero);
			
			// if (random(100) < 0.01) {
				// var RECORD = null;
				// var INDEX= null;
				// for(var j = 0 ; j < particles.length ; j++) {
					// if(particles[j].punti > RECORD)
						// RECORD=particles[j].punti;
						// INDEX=j;
				// }
				// particles.push(new Particle(particles[INDEX].pos.x,particles[INDEX].pos.y, particles[INDEX].dna));
				// console.log("NATO");
			// }
		}	
	}
	
	// for(var i = 0 ; i < particles.length ; i++) {
		// if(!particles[i].vivo)
			// particles.splice(i,1);
	// }
	
	var VIVI=TOTparticelle;
	
	for(var i = 0 ; i < particles.length ; i++) {
		if(!particles[i].vivo) {
			VIVI-=1;
			if(VIVI==0) {
				NewGeneration();
			}
		}
	}

//---------------------------------------------------------	
}


function NewGeneration  () {

	generazione+=1;
	console.log("Generazione = "+generazione);

	particles.sort(function (a, b) {return a.punti - b.punti;});
				
	for (var i = METAparticelle; i< TOTparticelle; i++){
		particles.push(new Particle(random(width),random(height),particles[i].dna,i,particles[i].albero));
		particles.push(new Particle(random(width),random(height)));
	}
				
	particles.splice(0,TOTparticelle);
	
}