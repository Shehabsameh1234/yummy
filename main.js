
// global var
let closeNavBar = document.getElementById("close-nav-bar")
let btnCloseSideBar = document.getElementById("btn-close-nav")
let offcanvasNav = document.getElementById("offcanvas")
let sideBarAnimation = document.querySelectorAll("#offcanvas ul a")
let categoryRow = document.getElementById("row-category")
let areaRow = document.getElementById("row-area")
let IngredientsRow = document.getElementById("row-Ingredients")
let itemsRow = document.getElementById("row-items-category")
let itemDetails = document.getElementById("row-items-details-category")
let tagsCategory = document.getElementById("tags-category")
let IngredientDetailsCategory = document.getElementById("Ingredient-details-category")
let itemsHome = document.getElementById("row-items-home")
let itemDetailsHome = document.getElementById("row-items-details-home")
let homeTags = document.getElementById("tags-home")
let IngredientDetailsHome = document.getElementById("Ingredient-details-home")
let  itemsArea=document.getElementById("row-items-area")
let itemDetailsArea=document.getElementById("row-items-details-area")
let IngredientDetailsArea =document.getElementById("Ingredient-details-area")
let areaTags = document.getElementById("tags-area")
// global var 



// loading spiner
$(document).ready(function () {
    $("#loading").fadeOut(4000)
});
// loading spiner



// sideBar
$(btnCloseSideBar).click(function () {
    let offcanvasWidth = $(offcanvasNav).css("width")
    if ($(closeNavBar).css("left") == "0px") {
        $(offcanvasNav).css("transform", "none")
        $(closeNavBar).css("left", offcanvasWidth)
        $(this).removeClass("fa-bars");
        $(this).addClass("fa-xmark");
        $(sideBarAnimation).css("animation", "sideBarAnimationTop 1s ")
    } else {
        $(offcanvasNav).css("transform", "translateX(-100%)")
        $(closeNavBar).css("left", "0")
        $(this).addClass("fa-bars");
        $(this).removeClass("fa-xmark");
        $(sideBarAnimation).css("animation", "sideBarAnimationBottom 1s ")
    }
})
// sideBar





// categories
async function categories() {
    let urlCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php").catch(error => console.log(error))
    let categoriesData = await urlCategories.json()


    let temp = "";
    // dispaly categories in html
    for (var i = 0; i < categoriesData.categories.length; i++) {
        temp += `<div  id=` + categoriesData.categories[i].strCategory + ` class="col-md-3 col-12">
       <div  id=`+ categoriesData.categories[i].strCategory + ` class="position-relative m-2 ">
           <img  id=`+ categoriesData.categories[i].strCategory + ` src=` + categoriesData.categories[i].strCategoryThumb + ` class="w-100" alt="category">
           <div  id=`+ categoriesData.categories[i].strCategory + `  class="layer">
               <h3 id=`+ categoriesData.categories[i].strCategory + ` >` + categoriesData.categories[i].strCategory + `</h3>
               <p  id=`+ categoriesData.categories[i].strCategory + ` >` + categoriesData.categories[i].strCategoryDescription + `</p>
            </div>
          </div>
        </div> `

    }
    categoryRow.innerHTML = temp

    // display categories in html

}
categories()
// categories



// get data from category
async function filterCtegory(categoryNme) {

    let myFilterCtegory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryNme}`).catch(error => console.log(error))
    let myFilterCtegoryDate = await myFilterCtegory.json()

    // make number of items equal 20
    if (myFilterCtegoryDate.meals.length > 20) {
        myFilterCtegoryDate.meals.length = 20
    }
    // make number of items equal 20

    // display category data in html
    temp = "";
    for (var i = 0; i < myFilterCtegoryDate.meals.length; i++) {
        temp += `
        <div id=`+ myFilterCtegoryDate.meals[i].idMeal + ` class="col-md-3 col-12">
        <div id=`+ myFilterCtegoryDate.meals[i].idMeal + `  class="position-relative m-2 ">
            <img id=`+ myFilterCtegoryDate.meals[i].idMeal + ` src=` + myFilterCtegoryDate.meals[i].strMealThumb + ` class="w-100" alt="items category">
            <div id=`+ myFilterCtegoryDate.meals[i].idMeal + ` class="layer">
                <h5 id=`+ myFilterCtegoryDate.meals[i].idMeal + ` class="text-start">` + myFilterCtegoryDate.meals[i].strMeal + `</h5>
            </div>
        </div>
    </div>
        `
    }
    itemsRow.innerHTML = temp
    // display category data in html
}
// get data from category


// get meal data
async function getMealData(id) {

    let myMealDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).catch(error => console.log(error))

    let myMealData = await myMealDetails.json()


    let tagNmae = myMealData.meals[0].strTags
    // get tag name and if it == null write no tag
    if (tagNmae == null) {
        tagNmae = "no tag"
    }
    let tagNmeLength = tagNmae.split(",").length


    // display tag name in html
    let temp = "";
    let tempHome = ""
    let tempArea=""
    for (var i = 0; i < tagNmeLength; i++) {
        temp += `<span class="p-2 rounded bg-danger text-white me-1 mb-3">` + tagNmae.split(",")[i] + `</span> `
        tempHome += `<span class="p-2 rounded bg-danger text-white me-1 mb-3">` + tagNmae.split(",")[i] + `</span> `
        tempArea += `<span class="p-2 rounded bg-danger text-white me-1 mb-3">` + tagNmae.split(",")[i] + `</span> `
    }

    tagsCategory.innerHTML = temp
    homeTags.innerHTML = tempHome
    areaTags.innerHTML=tempArea
    
    // display tag name in html

    // display meal Ingredient in html
    let temp2 = ""
    let tempHome1 = ""
    let tempArea1 = ""
    for (var i = 1; i < 20; i++) {
        if (myMealData.meals[0][`strIngredient${i}`] != "" && myMealData.meals[0][`strMeasure${i}`] != "") {
            temp2 += `
            <span  class="p-2 me-1 mb-3"> `+ myMealData.meals[0][`strMeasure${i}`] + " " + myMealData.meals[0][`strIngredient${i}`] + `   </span>
            `
            tempHome1 += `
            <span  class="p-2 me-1 mb-3"> `+ myMealData.meals[0][`strMeasure${i}`] + " " + myMealData.meals[0][`strIngredient${i}`] + `   </span>
            `
            tempArea1 += `
            <span  class="p-2 me-1 mb-3"> `+ myMealData.meals[0][`strMeasure${i}`] + " " + myMealData.meals[0][`strIngredient${i}`] + `   </span>
            `
        }
    }
    IngredientDetailsCategory.innerHTML = temp2
    IngredientDetailsHome.innerHTML = tempHome1
    IngredientDetailsArea.innerHTML = tempArea1
    // display meal Ingredient in html

    // display category item details data in html
    document.getElementById("meal-name").innerHTML = myMealData.meals[0].strMeal
    document.getElementById("item-category-name").innerHTML = myMealData.meals[0].strCategory
    document.getElementById("item-img-details").setAttribute("src", myMealData.meals[0].strMealThumb)
    document.getElementById("meal-desc").innerHTML = myMealData.meals[0].strInstructions
    document.getElementById("meal-area").innerHTML = "Area : " + myMealData.meals[0].strArea
    document.getElementById("youtube-link").setAttribute("href", myMealData.meals[0].strYoutube)
    document.getElementById("source").setAttribute("href", myMealData.meals[0].strSource)
    // display category item details data in html


    // display home  item details data in html
    document.getElementById("meal-name-home").innerHTML = myMealData.meals[0].strMeal
    document.getElementById("item-home-name").innerHTML = myMealData.meals[0].strCategory
    document.getElementById("item-img-details-home").setAttribute("src", myMealData.meals[0].strMealThumb)
    document.getElementById("meal-desc-home").innerHTML = myMealData.meals[0].strInstructions
    document.getElementById("meal-area-home").innerHTML = "Area : " + myMealData.meals[0].strArea
    document.getElementById("youtube-link-home").setAttribute("href", myMealData.meals[0].strYoutube)
    document.getElementById("source-home").setAttribute("href", myMealData.meals[0].strSource)
    // display  home item details data in html

    // display area  item details data in html
    document.getElementById("meal-name-area").innerHTML = myMealData.meals[0].strMeal
    document.getElementById("item-area-name").innerHTML = myMealData.meals[0].strCategory
    document.getElementById("item-img-details-area").setAttribute("src", myMealData.meals[0].strMealThumb)
    document.getElementById("meal-desc-area").innerHTML = myMealData.meals[0].strInstructions
    document.getElementById("meal-area-area").innerHTML = "Area : " + myMealData.meals[0].strArea
    document.getElementById("youtube-link-area").setAttribute("href", myMealData.meals[0].strYoutube)
    document.getElementById("source-area").setAttribute("href", myMealData.meals[0].strSource)
    // display  area item details data in html

}
// get meal data




// click on meals to get thier details
itemsRow.addEventListener("click", function (e) {
    getMealData(e.target.id)
    categoryRow.style.display = "none"
    itemsRow.style.display = "none"
    itemDetails.classList.remove("d-none")
})
// click on meals to get thier details



// send the category name to filterCtegory() to get data 
categoryRow.addEventListener("click", function (e) {
    filterCtegory(e.target.id)
    categoryRow.style.display = "none"
    itemsRow.style.display = "flex"
})
// send the category name to filterCtegory() to get data 


// click on category ancor to get categories 
function getCategory() {
    if (categoryRow.style.display == "none") {
        categoryRow.style.display = "flex"
        itemsRow.style.display = "none"
        itemDetails.classList.add("d-none")

    }
}
// click on category ancor to get categories


// home page
async function homePage() {
    let myhomePageUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`).catch(error => console.log(error))
    let myHomeData = await myhomePageUrl.json()

    // display data in home page
    temp = ""
    for (var i = 0; i < 20; i++) {
        temp += `
        <div id=`+ myHomeData.meals[i].idMeal + ` class="col-md-3 col-12">
        <div id=`+ myHomeData.meals[i].idMeal + `  class="position-relative m-2 ">
            <img id=`+ myHomeData.meals[i].idMeal + ` src=` + myHomeData.meals[i].strMealThumb + ` class="w-100" alt="items category">
            <div id=`+ myHomeData.meals[i].idMeal + ` class="layer">
                <h5 id=`+ myHomeData.meals[i].idMeal + ` class="text-start">` + myHomeData.meals[i].strMeal + `</h5>
            </div>
        </div>
    </div>
        `
    }
    itemsHome.innerHTML = temp
    // display data in home page

}
homePage()
// home page

// send the id item to getMealData() to get data 
itemsHome.addEventListener("click", function (e) {
    getMealData(e.target.id)
    this.style.display = "none"
    itemDetailsHome.classList.remove("d-none")
})
// send the id item to getMealData() to get data 





// areas name
async function areasName() {
    let myAreaName = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").catch(error => console.log(error))
    let myAreaNameData = await myAreaName.json()
    let temp = "";
    // dispaly areas in html
    for (var i = 0; i < myAreaNameData.meals.length; i++) {
        temp +=
            ` <div id=` + myAreaNameData.meals[i].strArea + ` class="col-md-3 col-12 mb-5 " >
    <img id=`+ myAreaNameData.meals[i].strArea + ` src="img/home (2).png" class="w-50" alt=" home area ">
    <h3 id=`+ myAreaNameData.meals[i].strArea + `>` + myAreaNameData.meals[i].strArea + `</h3>
     </div>`
    }
    areaRow.innerHTML = temp
    // display areas in html

}
areasName()
// areas name


// area items
async function getDataArea(areaName) {
    let myAreaDataUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`).catch(error => console.log(error))
    let myAreaData = await myAreaDataUrl.json()

    console.log(myAreaData.meals[0].idMeal);

    // make number of items equal 20
    if (myAreaData.meals.length > 20) {
        myAreaData.meals.length = 20
    }
    // make number of items equal 20

      // display data in area  page items
      temp = ""
      for (var i = 0; i <  myAreaData.meals.length ; i++) {
          temp += `
          <div id=`+myAreaData.meals[i].idMeal+`  class="col-md-3 col-12">
          <div id=`+myAreaData.meals[i].idMeal+`   class="position-relative m-2 ">
              <img id=`+myAreaData.meals[i].idMeal+`  src=` + myAreaData.meals[i].strMealThumb + ` class="w-100" alt="items area">
              <div id=`+myAreaData.meals[i].idMeal+`  class="layer">
                  <h5 id=`+myAreaData.meals[i].idMeal+` class="text-start">`+ myAreaData.meals[i].strMeal+`</h5>
              </div>
          </div>
      </div>
         `
      }
      itemsArea.innerHTML = temp
      // display data in area  page items
}
// area items


// send the id item to getDataArea() to get data 
areaRow.addEventListener("click",function(e){
getDataArea(e.target.id)
this.style.display="none"
itemsArea.classList.remove("d-none")
})
// send the id item to getDataArea() to get data 

// click on area ancor to get categories 
function getarea() {
    if (areaRow.style.display == "none") {
        areaRow.style.display = "flex"
        itemsArea.classList.add("d-none")
        itemDetailsArea.classList.add("d-none")
    }
}
// click on area ancor to get categories

// send the id item to getMealData() to get data 
itemsArea.addEventListener("click",function(e){
    getMealData(e.target.id)
    itemDetailsArea.classList.remove("d-none")
    this.style.display="none"

})
// send the id item to getMealData() to get data 
















// Ingredients
async function Ingredients() {
    let myIngredientsName = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list").catch(error => console.log(error))
    let myIngredientsData = await myIngredientsName.json()

    let temp = "";
    // dispaly Ingredients in html
    for (var i = 0; i < 20; i++) {
        temp += ` <div   id=`+ myIngredientsData.meals[i].strIngredient + `     class="col-md-3 col-12 px-2  ">
    <img id=`+ myIngredientsData.meals[i].strIngredient + `  src="img/chicken-leg.png" class="w-50 " alt=" Ingredients  ">
    <h4 id=`+ myIngredientsData.meals[i].strIngredient + ` >`+ myIngredientsData.meals[i].strIngredient + `</h4>
    <h6 id=`+ myIngredientsData.meals[i].strIngredient + ` >`+ myIngredientsData.meals[i].strDescription.slice(0, 150) + `</h6>
</div>   `
    }
    IngredientsRow.innerHTML = temp
    // display Ingredients in html
}
Ingredients()
// Ingredients


// Ingredients items
async function getDataIngredients(IngredientsName) {
    let myIngredientsDataUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientsName}`).catch(error => console.log(error))
    let myIngredientsData = await myIngredientsDataUrl.json()







    // // make number of items equal 20
    // if (myIngredientsData.meals.length > 20) {
    //     myIngredientsData.meals.length = 20
    // }
    // // make number of items equal 20

    //   // display data in Ingredients  page items
    //   temp = ""
    //   for (var i = 0; i <  myIngredientsData.meals.length ; i++) {
    //       temp += `
    //       <div id=`+myIngredientsData.meals[i].idMeal+`  class="col-md-3 col-12">
    //       <div id=`+myIngredientsData.meals[i].idMeal+`   class="position-relative m-2 ">
    //           <img id=`+myIngredientsData.meals[i].idMeal+`  src=` + myIngredientsData.meals[i].strMealThumb + ` class="w-100" alt="items Ingredients">
    //           <div id=`+myIngredientsData.meals[i].idMeal+`  class="layer">
    //               <h5 id=`+myIngredientsData.meals[i].idMeal+` class="text-start">`+ myIngredientsData.meals[i].strMeal+`</h5>
    //           </div>
    //       </div>
    //   </div>
    //      `
    //   }
    //   itemsIngredients.innerHTML = temp
    //   // display data in Ingredients  page items
}
// Ingredients items


getDataIngredients("Apple Cider Vinegar")








IngredientsRow.addEventListener("click",function(e){

    console.log(e.target.innerHTML);

})



























