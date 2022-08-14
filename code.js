let n = 0;
let courses_data = [];
const search_btn = document.querySelector(".search_btn");
const search_txt = document.querySelector(".search_txt");
fetch("https://my-json-server.typicode.com/HusseinAuf/bld_project-1_phase-2/courses")
    .then(res => res.json())
    .then(json => {
        json.map(data => {
            courses_data[n++] = data;
        })
        search_filter();
    })
function search_filter(){
    search_result();
    search_btn.addEventListener("click", function (event) {
        event.preventDefault();
        search_result();
    });
}
function search_result(){
    let courses_list = document.querySelector(".courses-list");
    courses_list.innerHTML = "";
    for(let i=0; i<n; i++){
        let words = search_txt.value.split(" ").filter(w => w !== '');
        let valid = 0;
        for(let j=0; j<words.length ; j++){
            let target = words[j];
            if(courses_data[i]["title"].toLowerCase().includes(target.toLowerCase())){
                valid = 1;
                break;
            }
        }
        if(valid || words.length === 0){
            let courses_list = document.querySelector(".courses-list");
            courses_list.innerHTML += `
                <div class="course">
                    <img src=${courses_data[i]["image"]} alt="course-image" class="image" />
                    <p class="title">
                    <strong>${courses_data[i]["title"]}</strong>
                    </p>
                    <p class="author">${courses_data[i]["author"]}</p>
                    <div class="rating">
                    <span>${courses_data[i]["rating"]}</span>
                    <img src=${courses_data[i]["star-rating"]} alt="stars-rating" class="image" />
                    </div>
                    <p class="price">${courses_data[i]["price"]}</p>
                </div>
            `;
        }
    }
}