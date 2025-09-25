// lesson api
const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")   //return promise of response
    .then(res => res.json())   
    .then(json => displayLesson(json.data));

}
//  display the lesson
const displayLesson = (lessons) =>{
    // console.log(lessons);

//     // 1.get the container and empty it
    const levelContainer = document.getElementById("level-container");
    // console.log(levelContainer);
    levelContainer.innerHTML = "";
    
//     // 2.get into every lesons
    for(let lesson of lessons){
        // console.log(lesson);
        //3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                 <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                 <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
                `;


        // 4.append into container
            levelContainer.appendChild(btnDiv);
    }
    
    
        
}

// lesson word load section
const loadLevelWord = (id)=>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
};

/**{
    "id": 4,
    "level": 5,
    "word": "Diligent",
    "meaning": "পরিশ্রমী",
    "pronunciation": "ডিলিজেন্ট"
} */

// display level word section
const displayLevelWord = (words) =>{
    console.log(words);
    // 1.get the container and empty
    const wordContainer = document.getElementById("word container");
    wordContainer.innerHTML = "";

    // 2.get into every level word
    words.forEach(word =>{
        // console.log(word);

        //3. create element
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
         <div class="bg-white rounded-xl text-center shadow-sm py-10 px-5 space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-medium">Meaning /Pronounciation</p>
            <div class="font-bangle text-2xl font-semibold"> ${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]
                hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                
            </div>

        </div>   
        `;

        // append into container
        wordContainer.appendChild(wordCard);
    })
};



loadLessons();