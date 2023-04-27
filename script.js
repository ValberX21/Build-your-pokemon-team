document.querySelector('.callAPI').addEventListener('click', function(){
       
    const request = new XMLHttpRequest();
    let data;
    
    request.open("GET",`https://pokeapi.co/api/v2/pokemon/cyndaquil`);
    request.send();
    request.onload = function(){
        data = JSON.parse(request.responseText)
        const pokeImg = data.sprites.front_default
        document.getElementById('pokeImg').src = pokeImg;
    }
})

