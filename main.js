//load from local storage
 if(localStorage.getItem('collection')){
    myChars = localStorage.getItem('collection');
    if(myChars){
        let arr = myChars.split(';')
   arr.forEach(char=>{
    addCharacter(char)})
    }  
}

//SOME HELPFUL FUNCTIONS TO CREATE ELEMENTS
const createCharDiv=(name)=>{
    name = name.toLowerCase();
        const ele = document.createElement('div');
        ele.setAttribute('class', 'character');
        ele.setAttribute('id', name);
        return ele;
}
const createCharCard=()=>{
    return document.createElement('img');   
}
const createH3= ()=>{
    return document.createElement('h3');
}
const createH4= ()=>{
   return document.createElement('h4');
}
const createP= ()=>{
   return document.createElement('p');
}


//EVENT LISTENING FOR CLICK
document.querySelector('#submit').addEventListener('click', addNewCharacter);

function addNewCharacter(){
    let choice = document.querySelector('#characterName').value;
   
    //fetch character
    fetch(`https://genshin-app-api.herokuapp.com/api/characters/info/${choice}?infoDataSize=min`)
    .then (res=> res.json())
    .then (data=>{
        console.log(data)
        let lChoice = choice.toLowerCase();
        let id = `#${lChoice}`
        //put character photo and info in 'my characters' section
        const div = createCharDiv(choice);
        const card = createCharCard();
        const name = createH3();
        const subName = createH4();
        const desc = createP();

        card.src = data.payload.character.cardImageURL;
        name.innerText = data.payload.character.name;
        subName.innerText = data.payload.character.nation + ' ; ' + data.payload.character.element + ' ; ' + data.payload.character.weaponType;
        desc.innerText = data.payload.character.description;
        
        document.querySelector('#characters').append(div);

      document.querySelector(id).append(card, name, subName, desc);

     //save this info to local memory
      if(!localStorage.getItem('collection')){
        localStorage.setItem('collection', choice)
      }else{
        let addChar = localStorage.getItem('collection')+';'+choice;
        localStorage.setItem('collection', addChar)
      }

        //show success message
        alert(`Success! ${choice} has been added to your collection`)
    })
    .catch (err=>{
        console.log(`error ${err}`);
        alert('save failed. check spelling')
    })
    
}

function addCharacter(ch){
    let choice = ch
    fetch(`https://genshin-app-api.herokuapp.com/api/characters/info/${choice}?infoDataSize=min`)
    .then (res=> res.json())
    .then (data=>{
        console.log(data)
        choice = choice.toLowerCase();
        let id = `#${choice}`
        //put character photo and info in 'my characters' section
        const div = createCharDiv(choice);
        const card = createCharCard();
        const name = createH3();
        const subName = createH4();
        const desc = createP();

        card.src = data.payload.character.cardImageURL;
        name.innerText = data.payload.character.name;
        subName.innerText = data.payload.character.nation + ' ; ' + data.payload.character.element + ' ; ' + data.payload.character.weaponType;
        desc.innerText = data.payload.character.description;
        
        document.querySelector('#characters').append(div);

      document.querySelector(id).append(card, name, subName, desc);
        //save this info to local memory

        //show success message
        // alert(`Success! ${choice} has been added to your collection`)
    })
    .catch (err=>{
        console.log(`error ${err}`);
    })
    
}