var Rnumbers = Math.floor(Math.random() * 7);
var kolor = ['#c609c6', '#02ade0', '#1dd405', '#ebff01', '#bc6c00', '#b074f7', '#d90e16'];
var kleur = kolor[Rnumbers];

var SpelTetris = {};

//Speel veld aanmaken


SpelTetris.veld = function () {
	for (var rij=0;rij<22;rij++){
		$('#veld').append('<tr class="'+rij+'"></tr>');
		for (var kol=0;kol<10;kol++){
			$('tr.'+rij).append('<td id="'+kol+'"></td>');
		}
	}
}

//Start punt.
SpelTetris.model = {rij:2,kol:5};
SpelTetris.HuidigeVorm = 'Z';
SpelTetris.Coor;


//Hier maak ik mijn eerste door de cellen te vullen met een kleur
SpelTetris.Blok = function(coordinates,color){
	for(var i=0;i<coordinates.length;i++){
		var rij = coordinates[i].rij;
		var kol = coordinates[i].kol;
		var blokje = $('.'+rij).find('#'+kol);
		blokje.attr('bgcolor',color);
	}
}

//bewegen huidige vorm
SpelTetris.bewegen = function(richting){
	this.Blok(this.Coor,'');

	//bewegen model(testCoordinaat) hier ga ik bewegen met de blok van links naar rechts en als het aan de rand komt kan het niet meer verder gaan.
    
	if(richting === 'rechts'){
		this.model.kol++;
	} else if (richting === 'links'){
		this.model.kol--;
	}

	this.Coor = this.Vormen(this.HuidigeVorm,this.model);

	if(this.AlsOmgekeerd()){
		if(richting === 'rechts'){
			this.model.kol--;
		} else if (richting === 'links'){
			this.model.kol++;
		}
	}

	this.Coor = this.Vormen(this.HuidigeVorm,this.model);

	this.Blok(this.Coor,kleur);
}

//rotatie van huidige vorm

SpelTetris.rotatie = function(){
	var laatsteVorm = this.HuidigeVorm;
	this.Blok(this.Coor,'');

	if(this.HuidigeVorm === 'L'){
		this.HuidigeVorm = 'L90';
	} else if(this.HuidigeVorm === 'L90'){
		this.HuidigeVorm = 'L180';
	} else if(this.HuidigeVorm === 'L180'){
		this.HuidigeVorm = 'L270';
	} else if(this.HuidigeVorm === 'L270'){
		this.HuidigeVorm = 'L';
	} else if(this.HuidigeVorm === 'J'){
		this.HuidigeVorm = 'J90';
	} else if(this.HuidigeVorm === 'J90'){
		this.HuidigeVorm = 'J180';
	} else if(this.HuidigeVorm === 'J180'){
		this.HuidigeVorm = 'J270';
	} else if(this.HuidigeVorm === 'J270'){
		this.HuidigeVorm = 'J';
	} else if(this.HuidigeVorm === 'Lijn'){
		this.HuidigeVorm = 'Lijn90';
	} else if(this.HuidigeVorm === 'Lijn90'){
		this.HuidigeVorm = 'Lijn';
	} else if(this.HuidigeVorm === 'S'){
		this.HuidigeVorm = 'S90';
	} else if(this.HuidigeVorm === 'S90'){
		this.HuidigeVorm = 'S';
	} else if(this.HuidigeVorm === 'Z'){
		this.HuidigeVorm = 'Z90';
	} else if(this.HuidigeVorm === 'Z90'){
		this.HuidigeVorm = 'Z';
	} else if(this.HuidigeVorm === 'T'){
		this.HuidigeVorm = 'T90';
	} else if(this.HuidigeVorm === 'T90'){
		this.HuidigeVorm = 'T180';
	} else if(this.HuidigeVorm === 'T180'){
		this.HuidigeVorm = 'T270';
	} else if(this.HuidigeVorm === 'T270'){
		this.HuidigeVorm = 'T';
	}

	this.Coor = this.Vormen(this.HuidigeVorm,this.model);

	for(var i=0;i<this.Coor.length;i++){
		if(this.AlsOmgekeerd()){
			this.HuidigeVorm = laatsteVorm;
		}
	}

	this.Coor = this.Vormen(this.HuidigeVorm,this.model);
	this.Blok(this.Coor,kleur);
}

//Define all vorms
SpelTetris.Vormen = function(vorm,model){
	if(vorm === 'L'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij+1,kol:model.kol+1}]
	} else if(vorm === 'J'){ 
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij+1,kol:model.kol-1}]
	} else if(vorm === 'Lijn'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij-2,kol:model.kol},{rij:model.rij+1,kol:model.kol}]
	} else if(vorm === 'O'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij-1,kol:model.kol+1},{rij:model.rij,kol:model.kol+1}]
	} else if(vorm === 'S'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij-1,kol:model.kol+1}]
	} else if(vorm === 'T'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij,kol:model.kol+1}]
	} else if(vorm === 'Z'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij-1,kol:model.kol-1},{rij:model.rij,kol:model.kol+1}]
	} else if(vorm === 'L90'){
  	return [{rij:model.rij,kol:model.kol},{rij:model.rij,kol:model.kol+1},{rij:model.rij,kol:model.kol-1},{rij:model.rij+1,kol:model.kol-1}];
  } else if(vorm === 'L180'){
  	return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij-1,kol:model.kol-1}];
  } else if(vorm === 'L270'){
  	return [{rij:model.rij,kol:model.kol},{rij:model.rij,kol:model.kol+1},{rij:model.rij,kol:model.kol-1},{rij:model.rij-1,kol:model.kol+1}];
  } else if(vorm === 'J90'){ 
		return [{rij:model.rij,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij,kol:model.kol+1},{rij:model.rij-1,kol:model.kol-1}]
	} else if(vorm === 'J180'){ 
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij-1,kol:model.kol+1}]
	} else if(vorm === 'J270'){ 
		return [{rij:model.rij,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij,kol:model.kol+1},{rij:model.rij+1,kol:model.kol+1}]
	} else if(vorm === 'Lijn90'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij,kol:model.kol+1},{rij:model.rij,kol:model.kol+2}]
	} else if(vorm === 'S90'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij-1,kol:model.kol-1},{rij:model.rij-2,kol:model.kol-1}]
	} else if(vorm === 'Z90'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij-1,kol:model.kol+1},{rij:model.rij-2,kol:model.kol+1}]
	} else if(vorm === 'T90'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij,kol:model.kol+1}]
	} else if(vorm === 'T180'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij,kol:model.kol-1},{rij:model.rij,kol:model.kol+1}]
	} else if(vorm === 'T270'){
		return [{rij:model.rij,kol:model.kol},{rij:model.rij-1,kol:model.kol},{rij:model.rij+1,kol:model.kol},{rij:model.rij,kol:model.kol-1}]
	} 
}

//vallen het Blokje per rij 
SpelTetris.vallen = function(){
	var richtingveranderen = false;

	this.Blok(this.Coor,'');
	this.model.rij++;
	for(var i=0;i<this.Coor.length;i++){
		this.Coor[i].rij++;
		if(this.AlsOmgekeerd()){
			richtingveranderen = true;
		}
	}

	if(richtingveranderen){
		for(var i=0;i<this.Coor.length;i++){
			this.Coor[i].rij--;
		}
		this.model.rij--;
	}

	this.Blok(this.Coor,kleur);

	if(richtingveranderen){
		this.Blok(this.Coor,kleur);
		this.verwijdervollerijen();
		this.nieuwblokje();
	}

}

//nieuwblokje als de Huidigeblok al beneden is
SpelTetris.nieuwblokje = function(){
	var random = Math.floor(Math.random()*7);
	var vormArray = ['L','J','Lijn','O','S','T','Z'];
	this.HuidigeVorm = vormArray[random];
	this.model = {rij:2,kol:5};
	this.Coor = this.Vormen(this.HuidigeVorm,this.model);
}

// Blok Van richting veranderen
SpelTetris.AlsOmgekeerd = function(){
	for(var i=0;i<this.Coor.length;i++){
		var rij = this.Coor[i].rij;
		var kol = this.Coor[i].kol;
		var blokje = $('.'+rij).find('#'+kol);
		if(blokje.length === 0 || blokje.attr('bgcolor') === kleur){
			return true;
		}
	}
	return false;
}

//Verwijder volledige rij(en)
SpelTetris.verwijdervollerijen = function(){
	var vallens = 0;
	for (var i=21; i>=0;i--){
		var vollerijen = true;

		for (var j=0;j<10;j++){
			var blokje = $('.'+i).find('#'+j);
			if(blokje.attr('bgcolor')!==kleur){
				vollerijen = false;
			}

			if(vallens>0){
				var $newCoor = $('.'+(i+vallens)).find('#'+j);
				$newCoor.attr('bgcolor',blokje.attr('bgcolor'));
			}
		}

		if(vollerijen){
			vallens++;
		}
	}
}


$(document).ready(function(){
    //Normale snelheid
    "use strict";
    /*$global**/
    $('#Again').hide();
    
    
    $('#start').click(function(){
    $('#Again').show();
        
    // hier ga ik de pagina refreshen;
    $('#other').click(function(){
    location.reload();
    });
        
    $('#options').hide();
        
    SpelTetris.veld();
	SpelTetris.Coor = SpelTetris.Vormen(SpelTetris.HuidigeVorm,SpelTetris.model);
	SpelTetris.Blok(SpelTetris.Coor,kleur);

	$(document).keydown(function(e){
        
        switch(e.which){
            case 39 : SpelTetris.bewegen('rechts'); 
                    break;
            case 37 : SpelTetris.bewegen('links');
                    break;
            case 38 : SpelTetris.rotatie(); 
                    break;
            case 40 : SpelTetris.vallen();
                    break;
        }
		
	})
    
    // setInterval = voor de blok te laten per milliseconden/ het hang af hoeveel milliseconden je heb in gegeven;
    
	var zwaarteKracht = setInterval(function(){
		SpelTetris.vallen();
	},400);
    });
    
    //Snelheid + 100
    
    $('#level1').click(function(){
    $("tr").css({'background-color':'grey'});
    $("td").css({'background-color':kleur});
        
     $('#Again').show();
        $('#other').click(function(){
           location.reload();
        
        });
        $('#options').hide();
        
    SpelTetris.veld();
	SpelTetris.Coor = SpelTetris.Vormen(SpelTetris.HuidigeVorm,SpelTetris.model);
	SpelTetris.Blok(SpelTetris.Coor,kleur);

	$(document).keydown(function(e){
        
        switch(e.which){
            case 39 : SpelTetris.bewegen('rechts'); 
                    break;
            case 37 : SpelTetris.bewegen('links');
                    break;
            case 38 : SpelTetris.rotatie(); 
                    break;
            case 40 : SpelTetris.vallen();
                    break;
        }
		
	})

	var zwaarteKracht = setInterval(function(){
		SpelTetris.vallen();
	},300);
 
    });
    
    
    
    // Snelheid + 200
    $('#level2').click(function(){
    
        
     $('#Again').show();
        $('#other').click(function(){
           location.reload();
        
        });
        $('#options').hide();
        
    SpelTetris.veld();
	SpelTetris.Coor = SpelTetris.Vormen(SpelTetris.HuidigeVorm,SpelTetris.model);
	SpelTetris.Blok(SpelTetris.Coor,kleur);

	$(document).keydown(function(e){
        
        switch(e.which){
            case 39 : SpelTetris.bewegen('rechts'); 
                    break;
            case 37 : SpelTetris.bewegen('links');
                    break;
            case 38 : SpelTetris.rotatie(); 
                    break;
            case 40 : SpelTetris.vallen();
                    break;
        }
		
	})

	var zwaarteKracht = setInterval(function(){
		SpelTetris.vallen();
	},200);
    });
    
    $('#level3').click(function(){
        
     $('#Again').show();
        $('#other').click(function(){
           location.reload();
        
        });
        $('#options').hide();
    SpelTetris.veld();
	SpelTetris.Coor = SpelTetris.Vormen(SpelTetris.HuidigeVorm,SpelTetris.model);
	SpelTetris.Blok(SpelTetris.Coor,kleur);

	$(document).keydown(function(e){
        
        switch(e.which){
            case 39 : SpelTetris.bewegen('rechts'); 
                    break;
            case 37 : SpelTetris.bewegen('links');
                    break;
            case 38 : SpelTetris.rotatie(); 
                    break;
            case 40 : SpelTetris.vallen();
                    break;
        }	
	})
	var zwaarteKracht = setInterval(function(){
		SpelTetris.vallen();
	},100); 
    });
   
})