// lesson api
const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")   //return promise of response
    .then(res => res.json())   
    .then(json => displayLesson(json.data));

}
//  display the lesson
const displayLesson = (lessons) =>{
    console.log(lessons);

//     // 1.get the container and empty it
    const levelContainer = document.getElementById("level-container");
    // console.log(levelContainer);
    levelContainer.innerHTML = "";
    
//     // 2.get into every lesons
    for(let lesson of lessons){
        console.log(lesson);
        //3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                 <button class="btn btn-outline btn-primary">
                 <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
                `;


        // 4.append into container
            levelContainer.appendChild(btnDiv);
    }
    
    
        
}



loadLessons();