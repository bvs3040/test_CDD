const userList = document.querySelector('.user-list');
const userItem = document.querySelector('.user-list__item');
const buttonBack = document.querySelector(".buttonBack");
const userCard = document.querySelector("#user-card");
const page = document.querySelector("#users");
const popapId = document.querySelector("#popapId");
const popapEmail = document.querySelector("#popapEmail");
const popapFirstName = document.querySelector("#popapFirstName");
const popapLastName = document.querySelector("#popapLastName");
const popapAvatar = document.querySelector("#popapAvatar");
const buttonChange = document.querySelector("#buttonChange");
const buttonSave = document.querySelector("#buttonSave");
const changeEmail = document.querySelector("#changeEmail");
const changeFirstName = document.querySelector("#changeFirstName");
const changeLastName = document.querySelector("#changeLastName");
const changeAvatar = document.querySelector("#changeAvatar");


//Скрыть PopUp при загрузке страницы 

$(document).ready(function(){  
    PopUpHide();
});
$(document).ready(function(){  
    InputFieldHide();
});

 // Запрос 

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://reqres.in/api/users?page=2", false);
xhr.send();
let responseObj = JSON.parse(xhr.response);
let userListObj = responseObj.data;

//Создание списка юзеров
var userNameObj;
function createUserNameList(){
    userNameObj=[];
    userList.innerHTML='';
    for (let i=0; i<userListObj.length; i++) {
        let newUser = document.createElement("li");
        let newUserName = document.createTextNode(userListObj[i].first_name+" "+userListObj[i].last_name);    
        newUser.classList.add("user-list__item");
        newUser.setAttribute('id', 'user_'+i);
        newUser.appendChild(newUserName);
        userList.appendChild(newUser);
        userNameObj[i]=newUser;
    }
}
createUserNameList();

//удаление юзера

function changeNameList(){
    let userListObjNew;
    let objLehth =userListObj.length;
    for (let i = 0; i < objLehth; i++) {
        userNameObj[i].oncontextmenu = function (){
            delete userListObj[i];
            userListObjNew=[];
            let k=0;
            for (let j=0; j<objLehth-1; j++){
                if (userListObj[j]){
                    userListObjNew[j]= userListObj[k]
                } else{
                    userListObjNew[j]= userListObj[k+1];
                    k++;
                }
                k++;
            }
            userListObj=userListObjNew;
            createUserNameList(); 
            createCardList();           
            return false;          
        }   
    }
}

//карточка пользователя
//PopUp1
function PopUpShow(){
    $("#popup1").show();
    $(document).ready(function(){  
        InputFieldHide();
    });
}
function PopUpHide(){
    $("#popup1").hide();
}

// вывод данных пользователя

buttonBack.addEventListener("click", function(){
    PopUpHide();
})
function createCardList(){
    for (let i = 0; i < userNameObj.length; i++) {
        userNameObj[i].addEventListener('click', function () {
            PopUpShow();
            popapId.textContent = userListObj[i].id;
            popapEmail.textContent = userListObj[i].email;
            popapFirstName.textContent = userListObj[i].first_name;
            popapLastName.textContent = userListObj[i].last_name;
            popapAvatar.textContent = userListObj[i].avatar;
        })       
    }
    changeNameList();
}
createCardList();

// изменение данных пользователя
//PopUp2
function InputFieldShow(){
    $("#popup2").show();
}
function InputFieldHide(){
    $("#popup2").hide();
} 

// значения по умолчанию

buttonChange.addEventListener("click", function(){
    InputFieldShow();
    changeEmail.value = popapEmail.textContent;
    changeFirstName.value = popapFirstName.textContent;
    changeLastName.value = popapLastName.textContent;
    changeAvatar.value = popapAvatar.textContent;
})

//изменение значений

buttonSave.addEventListener("click", function(){
    changeEmail.value ? popapEmail.textContent = changeEmail.value : popapEmail.textContent ="none" ;
    changeFirstName.value ? popapFirstName.textContent = changeFirstName.value : popapFirstName.textContent = "none";
    changeLastName.value ? popapLastName.textContent = changeLastName.value : popapLastName.textContent = "none";
    changeAvatar.value ? popapAvatar.textContent = changeAvatar.value : popapAvatar.textContent = "none";
    InputFieldHide();
    for (let i = 0; i < userNameObj.length; i++) {
        if (popapId.textContent == userListObj[i].id){
            userListObj[i].email = popapEmail.textContent;
            userListObj[i].first_name = popapFirstName.textContent;
            userListObj[i].last_name = popapLastName.textContent;
            userListObj[i].avatar = popapAvatar.textContent;
        }
    }
    createUserNameList();
    createCardList();
})






