import {Details} from "./Details.module.js"
export class Search{
    constructor(){

        this.displayPage();
        this.place = document.querySelector(".main .row.g-4.mt-5");
        this.spinner = document.querySelector(".spinner");

        document.querySelectorAll(".main input")[0].addEventListener('input',(e)=>{
            if(e.target.value !=""){this.getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value.trim()}`,"meals");};
        });
        document.querySelectorAll(".main input")[1].addEventListener('input',(e)=>{
            if(e.target.value !="" && e.target.value.length === 1){this.getData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value.trim()}`,"meals");};
        });
    };

    //========= appear origin page ==========
    displayPage(){
        let res = `
            <div class="col-md-6">
                <input class="form-control text-white bg-transparent " type="text" placeholder="Search By Name...">
            </div>
            <div class="col-md-6">
                <input class="form-control text-white bg-transparent " type="text" placeholder="Search By One Letter...">
            </div>
    <div class="row g-4 mt-5">  
    </div>`;
    document.querySelector(".main .box .row").innerHTML = res;
    };

    //========= get data ==========
    async getData(url,urlWord){
        this.place.innerHTML = "";
        this.spinner.classList.remove("d-none");

        let data = await fetch(url);
        let dataJson = await data.json();

        if(data.status === 200 && dataJson[urlWord] != null){
            this.display(dataJson[urlWord]);
        };
        this.spinner.classList.add("d-none");

    };

    //========= display data ==========
    display(data){
        let res ="";
        for(let i=0 ; i< data.length ;i++){
            res +=`<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="imageBox position-relative rounded-3 overflow-hidden" name="${data[i].strMeal}">
                <img class="w-100" src="${data[i].strMealThumb}" alt="">
                <div class="details position-absolute bottom-0 start-0 w-100 overflow-hidden d-flex justify-content-start align-items-center ps-4">
                    <p class="m-0 fs-20 lh-30 fw-600 text-dark">${data[i].strMeal}</p>
                </div>
            </div>
        </div>`;
        };

    this.place.innerHTML = res;
    this.next();
    
    };

    //========= click element ==========
    next(){
        let box = document.querySelectorAll(".main .row.g-4.mt-5 .imageBox");
        for(let i =0 ; i<box.length ;i++){
            box[i].addEventListener('click',function(){
                let detail = new Details(this.getAttribute("name"));
            });
        };
    };

    
}