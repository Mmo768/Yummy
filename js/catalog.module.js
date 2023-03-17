//========== import =========
import {Header} from "./Header.module.js"
import {apperSpinner,hiddenSpinner} from "./main.js"

export class Catalog{
    constructor(nameOfUrl , objKey ,displayOption){
        this.nameOfUrl = nameOfUrl;
        this.objKey = objKey;
        this.displayOption = displayOption;

        this.getData(this.nameOfUrl,this.objKey);
    };

    //========= get data ==========
    async getData(url,urlWord){
        apperSpinner();
        let data = await fetch(url);
        let dataJson = await data.json();
        this.display(dataJson[urlWord]);
        hiddenSpinner();
    };

    //========= display data ==========
    display(data){
        let res ="";
        if(this.displayOption == "catalog"){
            for(let i=0 ; i< data.length ;i++){
                res +=`<div class="col-md-6 col-lg-4 col-xl-3">
                <div class="imageBox position-relative rounded-3 overflow-hidden cur" name="${data[i].strCategory}">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
                    <div class="details position-absolute bottom-0 start-0 w-100 px-2">
                        <h2 class="m-0 fs-30 lh-35 fw-500 text-dark text-center mt-2">${data[i].strCategory}</h2>
                        <p class="lh-25 fw-400 text-center div-truncate">${data[i].strCategoryDescription.split(".").slice(0,1).toString()}</p>
                    </div>
                </div>
            </div>`;
            };
        }else if(this.displayOption == "Area"){
            for(let i=0 ; i< data.length ;i++){
                res +=`<div class="col-md-6 col-lg-4 col-xl-3">
                <div class="imageBox text-center p-4 rounded-3 cur" name="${data[i].strArea}">
                <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <p class="m-0 fs-30 lh-35 fw-500 text-white">${data[i].strArea}</p>
                </div>
            </div>`;
            };
        }else if(this.displayOption == "irgument"){
            for(let i=0 ; i< 20 ;i++){
                res +=`<div class="col-md-6 col-lg-4 col-xl-3">
                <div class="imageBox text-center cur h-100" name="${data[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                    <h3 class=" fs-25 lh-30 fw-500 text-white">${data[i].strIngredient}</h3>
                    <p class="m-0 lh-25 fw-400 text-white">${data[i].strDescription?.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>`;
            };
        }


    document.querySelector(".main.header .row").innerHTML = res;
    this.next();
    
    };

    //========= click items ==========
    next(){
        let box = document.querySelectorAll(".main .row .imageBox");

        if(this.displayOption == "catalog"){
            for(let i =0 ; i<box.length ;i++){
                box[i].addEventListener('click',function(){
                    let header = new Header(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.getAttribute("name")}`,"meals",document.querySelector(".main.header .row"));
                });
            };
        }else if(this.displayOption == "Area"){
            for(let i =0 ; i<box.length ;i++){
                box[i].addEventListener('click',function(){
                    let header = new Header(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.getAttribute("name")}`,"meals",document.querySelector(".main.header .row"));
                });
            };
        }else if(this.displayOption == "irgument"){
            for(let i =0 ; i<box.length ;i++){
                box[i].addEventListener('click',function(){
                    let header = new Header(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.getAttribute("name")}`,"meals",document.querySelector(".main.header .row"));
                });
            };
        }


    };

    
}