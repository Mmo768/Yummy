import {apperSpinner,hiddenSpinner} from "./main.js"

export class Details{
    constructor(Detailsname){
        this.Detailsname = Detailsname;

        this.getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.Detailsname}`,"meals");

    }

    async getData(url,urlWord){
        apperSpinner();
        let data = await fetch(url);
        let dataJson = await data.json();
        this.display(dataJson[urlWord][0]);
        hiddenSpinner();
    };

    display(data){
        let res ="";
        res =`<div class="col-md-4">
        <div class="image">
            <img class="w-100 rounded-2 overflow-hidden" src="${data.strMealThumb}" alt="">
            <h1 class="text-white fs-30 lh-40 fw-500">${this.Detailsname}</h1>
        </div>
    </div>
    <div class="col-md-8">
        <div class="box text-white">
            <h2 class="fs-30 lh-40 fw-500">Instructions</h2>
            <p class="lh-25 fw-400">${data.strInstructions}</p>
            <ul>
                <li class="fs-30 lh-35 fw-700">Area : <span class="fw-500">${data.strArea}</span></li>
                <li class="fs-30 lh-35 fw-700">Category : <span class="fw-500">${data.strCategory}</span></li>
                <li class="fs-30 lh-35 fw-700">Recipes : 
                    <ul class="my-3">
                    ${this.ul(data)}
                    </ul>
                </li>
                <li class="fs-30 lh-35 fw-500">Tags : 
                    <ul>
                        ${this.strTags(data.strTags)}   
                    </ul>
                </li>
                <li class="mt-2">
                    <a href="${data.strSource}" class="btn btn-success mx-1" target="_blank">source</a>
                    <a href="${data.strYoutube}" class="btn btn-danger mx-1" target="_blank">youtube</a>
                </li>
            </ul>
        </div>
    </div>`;
    document.querySelector(".main.header .row").innerHTML = res;
    }; 

    ul(data){
        let res ="";
        for(let i=1 ; i<20 ;i++){
            if(data[`strIngredient${i}`] != ""){
                res += `<li class="d-inline-block alert-info rounded-1 p-1 mx-1 my-1 fs-15 fw-400 lh-25">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`;
            }else{
                break;
            }
        }
        return res;
    }
    
    strTags(data){
        if(data !== null){
            let res="";
            let dataSplit = data.split(",");
            for(let i=0 ; i<dataSplit.length ; i++){
                res+=`<li  class="d-inline-block text-danger alert-danger  rounded-1 p-1 mx-1 my-1 fw-300 fs-15 lh-15">${dataSplit[i]}</li>`;
            }
            return res;
        }else{
            return "";
        };
    };

}