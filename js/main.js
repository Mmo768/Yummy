//========== import =========
import {Header} from "./Header.module.js"
import {Search} from "./Search.module.js"
import {Catalog} from "./catalog.module.js"
import {Contact} from "./contact.js"


//========== global =========
const sections = document.querySelectorAll(".main"); 
const colseBtn = document.querySelector(".closed"); 
const nav = document.querySelector("nav"); 
const linksBtn = document.querySelectorAll("a[my-href]"); 



openClose();
let detail = new Header(`https://www.themealdb.com/api/json/v1/1/search.php?s=` , "meals");


for(let i=0 ; i<linksBtn.length ;i++){
    linksBtn[i].addEventListener('click',function(){
        if(this.getAttribute("my-href") == "Search"){
            let search = new Search();
        }else if(this.getAttribute("my-href") == "Categories"){
            let catalog = new Catalog(`https://www.themealdb.com/api/json/v1/1/categories.php`,"categories","catalog");
        }else if(this.getAttribute("my-href") == "Area"){
            let area = new Catalog(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`,"meals","Area");
        }else if(this.getAttribute("my-href") == "Ingredients"){
            let irgument = new Catalog(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`,"meals","irgument");
        }else if(this.getAttribute("my-href") == "ContactUs"){
            let contact = new Contact();
        };
        //========== color active ==========
        colseBtn.click();
        document.querySelector("a[my-href].active")?.classList.remove("active");
        this.classList.add("active");
    });
};

//========== nav button toggle ==========
function openClose(){
    colseBtn.addEventListener('click',function(){
        if(nav.classList.contains("navPosition")){
            nav.classList.remove("navPosition");
            colseBtn.innerHTML = `<i class="fas fa-xmark fs-3 text-dark  p-2"></i>`;
            addNavAnimation();
        }else{
            nav.classList.add("navPosition");
            colseBtn.innerHTML = `<i class="fas fa-bars fs-2 text-dark  p-2"></i>`;
            removeAavAnimation();
        };
    });
};

//========== spinner ==========
export function apperSpinner(){
    document.querySelector(".main .row").innerHTML = "";
    document.querySelector(".spinner").classList.remove("d-none");
}
export function hiddenSpinner(){
    document.querySelector(".spinner").classList.add("d-none");
}

//========== nav list animation ==========
function addNavAnimation(){
    $("nav article >ul>li").eq(0).css({"animation":"navAnime .3s linear .3s 1 normal both"});
    $("nav article >ul>li").eq(1).css({"animation":"navAnime .3s linear .5s 1 normal both"});
    $("nav article >ul>li").eq(2).css({"animation":"navAnime .3s linear .7s 1 normal both"});
    $("nav article >ul>li").eq(3).css({"animation":"navAnime .3s linear .9s 1 normal both"});
    $("nav article >ul>li").eq(4).css({"animation":"navAnime .3s linear 1.1s 1 normal both"});
}
function removeAavAnimation(){
    $("nav article >ul>li").removeAttr("style");
}
