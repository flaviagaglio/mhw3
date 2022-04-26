/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const client_id = '742f4e9bd5bc495f844966e6e24258de';
const client_secret = 'e3433552b7de48e79a78363fea6bc44b';
const myanswers = document.querySelectorAll('.choice-grid div');
let selectedAnswer='';
let token;


let answersDB ={
    'one':'',
    'two':'',
    'three':''
}
function isQuizCompleted() {
    for(const k in answersDB){ 
        if(answersDB[k]===''){
            return false;
        }
    }
    return true;
}
function sfsdf(e) {
            let blocchiDomanda=[];
            const rispostaCliccata = e.currentTarget;
            const idDomanda =rispostaCliccata.dataset.questionId
            let 
            
    
}
function handle(e){

    const rispostaCliccata = e.currentTarget;
    
    if(!isQuizCompleted()){
        answersDB[rispostaCliccata.dataset.questionId]=rispostaCliccata.dataset.choiceId;
        
        let unselectedAnswers = [];
        for (const answer of myanswers){
            if(answer.dataset.choiceId === rispostaCliccata.dataset.choiceId && answer.dataset.questionId ===  rispostaCliccata.dataset.questionId){
                selectedAnswer=answer;

            }else if(answer.dataset.questionId ===  rispostaCliccata.dataset.questionId){ 
                unselectedAnswers.push(answer);
            }
            
        }
        console.log(selectedAnswer)
        console.log(unselectedAnswers)

        for (const answer of unselectedAnswers){
            
            let imageChild =answer.querySelector('.checkbox');
            imageChild.src='images/unchecked.png'
            answer.classList.remove('selected');
            answer.classList.add('unselected');
            
           
        }
        let imageChild =selectedAnswer.querySelector('.checkbox');
        selectedAnswer.classList.add('selected');
        selectedAnswer.classList.remove('unselected');
        imageChild.src='images/checked.png'
        ricerca(); // API //
        if(isQuizCompleted()){
            showResult()
        }
    }else{
        
    }
   
   
}

for (const answer of myanswers){
    answer.addEventListener('click',handle);
}
function showResult() {
    const result=  document.querySelector('.result')
    result.addEventListener('click',restartQuiz)
    let max;
    if(answersDB['one'] === answersDB['two'] || answersDB['one'] === answersDB['two'] ){
        max=answersDB['one']
    }
    if(answersDB['two'] === answersDB['one'] || answersDB['two'] === answersDB['three'] ){
        max=answersDB['two']
    }
    if(answersDB['three'] === answersDB['two'] || answersDB['three'] === answersDB['one'] ){
        max=answersDB['three']
    }

    if(max ===undefined){
        max=answersDB['one']
    }

    const testo =result.querySelector('#resultText')
    const titolo =result.querySelector('#resultTitle')
   
    testo.innerHTML=RESULTS_MAP[max].contents
    titolo.innerHTML=RESULTS_MAP[max].title
    result.classList.remove('hidden')
}
function restartQuiz() {
    
    answersDB ={
        'one':'',
        'two':'',
        'three':''
    }
    for (const answer of myanswers){
        answer.classList.remove('unselected');
        answer.classList.remove('selected');
        let imageChild =answer.querySelector('.checkbox');
        imageChild.src='images/unchecked.png'
        const result=  document.querySelector('.result')
        result.classList.add('hidden')
    }
}

function ricerca(){
    if (selectedAnswer.dataset.questionId==='one'){
        const album= encodeURIComponent(selectedAnswer.dataset.type);

        fetch("https://api.spotify.com/v1/search?type=album&q=" + album,
 {
 headers:
 {
 'Authorization': 'Bearer ' + token
 }
 }
 ).then(onResponse).then(Spotify);
 
    }
    if (selectedAnswer.dataset.questionId==='two') {
        const autore= encodeURIComponent(selectedAnswer.dataset.type);
        console.log('Eseguo ricerca: '+autore);
        rest_url= 'http://openlibrary.org/search.json?author=' + autore;
        console.log('URL: ' + rest_url);
        fetch(rest_url).then(onResponse).then(onJsonBook);
        }

}


function onJsonBook(json) {
    
        console.log('JSON ricevuto');
    let num_results=json.num_found;
        if(num_results >= 1)
          num_results = 1;
          const doc = json.docs[num_results];
          const title = doc.title;
        
          
          const isbn = doc.isbn[0];
       
          const cover_url = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg';
        
          const book = document.createElement('div');
          book.classList.add('book');
      
          const img = document.createElement('img');
          img.src = cover_url;
          
          const caption = document.createElement('span');
          caption.textContent = title;
          img.classList.add('foto');
          caption.classList.add('titolo');
      
          book.appendChild(img);
          book.appendChild(caption);
          book.classList.add('style');
         
          selectedAnswer.appendChild(book);
        }
    



function onResponse(response) {
    
    return response.json();
    }
    function onTokenJson(json)
    {
    console.log(json)
    token = json.access_token;
    }


    function onTokenResponse(response)
    {
    return response.json();
    }



fetch("https://accounts.spotify.com/api/token",
{
method: "post",
body: 'grant_type=client_credentials',
headers:
{
'Content-Type': 'application/x-www-form-urlencoded',
'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
}
}
).then(onTokenResponse).then(onTokenJson);

function Spotify(json) {
console.log('JSON ricevuto');
console.log(json);
const results = json.albums.items;
let num_results = results.length;
if(num_results >= 1){

num_results = 1;
const album_data = results[num_results]
console.log(album_data);
const title = album_data.name;
const selected_image = album_data.images[0].url;
const album = document.createElement('div');
const img = document.createElement('img');
const relase= document.createElement('span');
const caption = document.createElement('span');
img.src = selected_image;
caption.textContent = " " + title;
img.classList.add('brano');
caption.classList.add('titolo');
album.appendChild(img);
album.appendChild(caption);
selectedAnswer.appendChild(album);
selectedAnswer.classList.add('style');

    }
}


