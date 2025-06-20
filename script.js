
const postList = document.getElementById('postList');
const fetchButton = document.getElementById('fetchButton');
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', sendEntry);

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => { response.json()
            .then((data) => {
            const myBreak = document.createElement('br');

            fetchButton.addEventListener('click', () => {

                postList.appendChild(myBreak);

                for (let i = 0; i < data.length; i++) {
                    postList.innerHTML += `Title: ${data[i].title}`
                    postList.appendChild(myBreak);
                    postList.innerHTML += `Body: ${data[i].body}`;
                    postList.appendChild(myBreak);
                }
            })
        })})

        function sendEntry(){
            //This area is for creating the loading element

            const loading = document.createElement("p");
            loading.id = "loading-element";
            loading.innerHTML = "loading...";

            //This area is for the Identifying the input boxes and their value
            const titleWord = document.getElementById("titleInput").value;

            const bodyWord = document.getElementById("bodyInput").value;

            //Area is for creating success element
            const mySuccessElement = document.createElement("p");
            mySuccessElement.innerHTML = "SUCCESS!!!";

            //Area is for creating error element that will have innerHTML later
            const myErrorElement = document.createElement("p");
           
            //Area is for identifying Error/Success Divs 
            const errorArea = document.getElementById("formError");

            const successArea = document.getElementById("formSuccess");

            //When this function is clicked, loading message will popup immediately
            successArea.appendChild(loading);

//if the Fetch URL is empty, it will throw the error message

            fetch('https://jsonplaceholder.typicode.com/posts' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: titleWord,
                    body: bodyWord
                })
            })
            .then(response =>{ 
                if(response.ok){
                    document.getElementById("loading-element").remove();
                    successArea.appendChild(mySuccessElement);
                    return response.json();
                }
                
                else{
                    throw new Error('Something Went Wrong');
                }
                
            })
            .catch((error) =>{
                document.getElementById("loading-element").remove()
                myErrorElement.innerHTML = error
                errorArea.appendChild(myErrorElement)
            });
            
        }