
let eleChoices=document.querySelector(".choices");
let eleChoiceArr=["General","Entertainment","Health","Science","Technology"];
//creating buttons dynamically
for(let i=0;i<eleChoiceArr.length;i++){
    //mehtod 1
    const button=document.createElement("button");
    button.classList.add("btn","choice","col-2");
    button.id=i;
    button.textContent=eleChoiceArr[i];
    eleChoices.appendChild(button);
//method 2
    //eleChoices.innerHTML+=`<button class="btn choice col-2 " id="${i}">${eleChoiceArr}</button>`;
}
//create variable for newly created buttons
const eleChoiceButtons=document.querySelectorAll(".choice");


//taking for  loop for buttons eventlistner
for(let i=0;i<eleChoiceButtons.length;i++){
    let button=eleChoiceButtons[i]
    button.addEventListener("click",()=>{
        const choiceName=button.textContent.toLowerCase();
        console.log(choiceName);
        eleChoiceButtons.forEach(button=>button.classList.remove("clicked"));
        button.classList.add("clicked")
        const choiceUrl=`https://newsapi.org/v2/top-headlines?country=us&category=${choiceName}&apiKey=55dabaeb0fdc438dbea2c44e387127a4`
        
        getDataFromServer("get", choiceUrl, (data)=>{
            
            //hide loader image
                document.querySelector(".loader").style.display="none";
                //display news
                displaynews(data);
        }, ()=>{
            //show error-message for 3 sec.
            document.querySelector(".loader").style.display="block";
            setTimeout(()=>{
                document.querySelector(".message").innerHTML="<h1>Error Fetching data.....</h1>";
                document.querySelector(".loader").style.display="none";
            },3000)
            setTimeout(()=>{
                
                document.querySelector(".message").style.display="none";
            },12000);
            //hide loader image
        }  ) 
        
    })}

    eleChoiceButtons[0].click();

    //function to get data from server
  function getDataFromServer(method, url, callSuccess, callError)
  {
    const xhr=new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("Yes Data is obtained");
      const data = JSON.parse(xhr.responseText);
      callSuccess(data);
      
    } else if(xhr.readyState == 4)  {
        console.log("Error....");
        callError();
    }
  });
  xhr.open(method, url); // 2 sec..
  //show loader image
        document.querySelector(".loader").style.display="block";
    xhr.send()
}
//function to display news
function displaynews(data){
    const newsContainer=document.querySelector(".news-holder");
    newsContainer.innerHTML="";
    const news=data.articles;
    news.forEach((newsItem)=>{
        const newsCard=document.createElement("div");
        newsCard.classList.add("card","col-5","m-3",);
        if(newsItem.urlToImage!=null){
            src=`${newsItem.urlToImage}`;
        }
        else{
            src=`assets/defaultimg.jpg`;
        }
        newsCard.innerHTML+=`
        <img src="${src}" alt="image" class="card-img img-fluid" >
        <div class="card-body">
                        <h6 class="card-title">${newsItem.title}</h6>
                        <div class="anchor">
                            <a href="${newsItem.url}" target="_blank" class="btn read-btn align-content-end">Read More</a>
                            </div>
                            </div>`
        newsContainer.appendChild(newsCard);
        })
    }