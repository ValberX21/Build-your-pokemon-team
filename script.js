function buttonText(){
    let e = document.getElementById("Acntname");
    let value = e.value;
    let btn = document.querySelector(".callAPI");

    switch(value){
        case '1':
            btn.textContent = 'Search';
            break;
        case '2':
            btn.textContent = 'Add Pokemon'
            break;    
    }
}

document.querySelector('.callAPI').addEventListener('click', function(){

    document.getElementById('pokeImg').src = 'pokeball.gif';

    let e = document.getElementById("Acntname");
    let value = e.value;

    switch(value){
        case '1':
          searchPokemon();
          break;
        case '2':
            addPokemon()
            break;
        default:
            alert('Please select a action');    
    }
})

function searchPokemon(){

    let pokeName = document.querySelector('.pokeName').value;

    if(pokeName == ''){
        alert('Please type a pokemon')
    }else{
        let pokeNameForm = pokeName.toLowerCase();
        const request = new XMLHttpRequest();
        let data;
        
        request.open("GET",`https://pokeapi.co/api/v2/pokemon/${pokeNameForm}`);
        request.send();
        request.onload = function(){
            try{
                data = JSON.parse(request.responseText)
                const pokeImg = data.sprites.front_default
                document.getElementById('pokeImg').src = pokeImg;
                document.querySelector('.pokeName').value = '';
            }catch(e){
                console.log(`This is the problem: ${e}`);
                alert('Please, check Pokemon\'s name');
            }   
        }
    }
}

function addPokemon(){

    let pokeTeam = [];
    let pokeName = document.querySelector('.pokeName').value;

    if(pokeName == ''){
        alert('Please type a pokemon')
    }else{
        
        let pokeNameForm = pokeName.toLowerCase();
        const request = new XMLHttpRequest();
        let data;
        
        request.open("GET",`https://pokeapi.co/api/v2/pokemon/${pokeNameForm}`);
        request.send();
        request.onload = function(){
            try{
                data = JSON.parse(request.responseText)
                if(data.sprites.versions['generation-v']['black-white']['animated']['front_default'] == null){
                    pokeTeam.push(data.sprites.front_default)
                }else{
                    pokeTeam.push(data.sprites.versions['generation-v']['black-white']['animated']['front_default'])     
                }
                pokeTeam.forEach((item)=>{        
                    const html = `
                      <div class="item">
                      <img  src="${item}"/>
                      </div> 
                    `;   
                  containerMovements.insertAdjacentHTML('afterbegin', html);
                })
                document.querySelector('.pokeName').value = '';
               
            }catch(e){
                console.log(`This is the problem: ${e}`)
                alert('Please, check Pokemon\'s name')
            }   
        }
    }
}

const containerMovements = document.querySelector('.wrapper');

const input = document.getElementById("pokeInput");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnPoke").click();
    }
});