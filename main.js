//https://picsum.photos/v2/list?page=1&limit=10

const slider = document.querySelector(".slider");

const dotsContainer = document.querySelector(".dots-container");






async function fetchListOfImages(x){
   
    
   try{
    const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=5`,{
        method:"GET"
    })
    const imageList = await response.json()
    if(imageList && imageList.length >0)displayImages(imageList);
   }
   catch(err){
    console.log(err)
   }
}

function displayImages(getImageList){
    slider.innerHTML = getImageList.map((item)=>
    `
        <div class="slide">
        <img src=${item.download_url} alt=${item.id} />
        </div>
    `
    ).join(" ")

    dotsContainer.innerHTML=getImageList.map((item,index)=>
    `
    <span class="dot ${index===0?"active":""}" data-slide=${index}></span>
    `).join(" ")
}

fetchListOfImages();

setTimeout(()=>{
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".pre");
    const nextBtn = document.querySelector(".next");
    let currentslide = 0;

    function activeDot(slide) {
      document
        .querySelectorAll(".dot")
        .forEach((dotItem) => dotItem.classList.remove("active"));
      document
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add("active");
    }



  
    function changeCurrentSlide(currentslide) {
      slides.forEach(
        (slideItem, index) =>
          (slideItem.style.transform = `translateX(${
            100 * (index - currentslide)
          }%)`)
      );
    }
    changeCurrentSlide(currentslide);

    nextBtn.addEventListener("click", () => {
      // alert("clicked next btn")
      currentslide++;
      if (currentslide > slides.length-1) {
        currentslide = 0;
        
      }
      changeCurrentSlide(currentslide);
        activeDot(currentslide);
    });

    prevBtn.addEventListener("click", () => {
      // alert("clicked prev btn")
      currentslide--;
      if (currentslide < 0) {
        currentslide = slides.length - 1;
       
      }
      changeCurrentSlide(currentslide);
      activeDot(currentslide);
    });

    dotsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        const currentslide = event.target.dataset.slide;
        changeCurrentSlide(currentslide);
        activeDot(currentslide);
      }
    });
 
},1000)