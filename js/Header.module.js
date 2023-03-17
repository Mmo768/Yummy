//========== import =========
import {Details} from "./Details.module.js"
import {apperSpinner,hiddenSpinner} from "./main.js"

export class Header{
    constructor(nameOfUrl , objKey){


        this.nameOfUrl = nameOfUrl;
        this.objKey = objKey;
        this.getData(this.nameOfUrl,this.objKey);

    }

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
        for(let i=0 ; i< data.length ;i++){
            res +=`<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="imageBox position-relative overflow-hidden rounded-2" name="${data[i].strMeal}">
                <img class="w-100" src="${data[i].strMealThumb}" alt="">
                <div class="details position-absolute bottom-0 start-0 w-100 overflow-hidden d-flex justify-content-start align-items-center px-3">
                    <p class="m-0 fs-30 lh-35 fw-500 text-dark">${data[i].strMeal}</p>
                </div>
            </div>
        </div>`;
        };

        document.querySelector(".main.header .row").innerHTML = res;
        this.next();
    
    };

    //========= click items ==========
    next(){
        let box = document.querySelector(".main.header .row").querySelectorAll(".imageBox");
        for(let i =0 ; i<box.length ;i++){
            box[i].addEventListener('click',function(){
                let detail = new Details(this.getAttribute("name"));
            });
        };
    };

    
}