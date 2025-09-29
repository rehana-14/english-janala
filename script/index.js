//  synonym array function
const createElements = (arr) =>{
    // console.log(arr);
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));
};

// spinner function
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
         document.getElementById("word-container").classList.remove("hidden");
         document.getElementById("spinner").classList.add("hidden");
    }
}



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
                 <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
                `;


        // 4.append into container
            levelContainer.appendChild(btnDiv);
    }
    
    
        
}

// remove active button function
const removeActive = () =>{
   const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn =>{
        btn.classList.remove("active");
    }))
}

// lesson word load section
const loadLevelWord = (id)=>{
    manageSpinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");



        displayLevelWord(data.data)
    })
};

/**{
    "id": 4,
    "level": 5,
    "word": "Diligent",
    "meaning": "পরিশ্রমী",
    "pronunciation": "ডিলিজেন্ট"
} */

// load word detail function
const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}` ;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    // console.log(details);
    displayWordDetails(details.data);
}

/**{
  "status": true,
  "message": "successfully fetched a word details",
  "data": {
    "word": "Brisk",
    "meaning": "চটপটে / দ্রুত",
    "pronunciation": "ব্রিস্ক",
    "level": 3,
    "sentence": "He took a brisk walk in the morning.",
    "points": 3,
    "partsOfSpeech": "adjective",
    "synonyms": [
      "quick",
      "energetic"
    ],
    "id": 27
  }
} */

// display word detail function
const displayWordDetails = (word) =>{
    // console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
          <div>
            <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class=" font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class=" font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class=" font-bold">Synonyms</h2>
            <div>${createElements(word.synonyms)}</div>
        </div>
    
    
    `;

    document.getElementById("word_modal").showModal();
}


// display level word section
const displayLevelWord = (words) =>{
    // console.log(words);
    // 1.get the container and empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        // alert("no word found");
         wordContainer.innerHTML = `
         <div class="text-center col-span-full gap-5 rounded-xl py-10 space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png">
            <p class="font-bangla text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
        </div>`;
        manageSpinner(false);
        return;
    }

    // 2.get into every level word
    words.forEach(word =>{
        // console.log(word);

        //3. create element
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
         <div class="bg-white rounded-xl text-center shadow-sm py-10 px-5 space-y-4 h-full">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "Word not found"}</h2>
            <p class="font-medium">Meaning /Pronounciation</p>
            <div class="font-bangle text-2xl font-semibold"> ${word.meaning ? word.meaning : "Word meaning not found"} / ${word.pronunciation ? word.pronunciation : "word pronunciation not found"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]
                hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                
            </div>

        </div>   
        `;

        // append into container
        wordContainer.appendChild(wordCard);
    })

    manageSpinner(false);
};



loadLessons();
