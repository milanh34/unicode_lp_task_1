//generating user data for index.html 
let loadusers = async () => {
    try {
        let p = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await p.json();
        const user_content = document.querySelector("#user-content");
        for (let i in users) {
            const tr = document.createElement("tr");
            tr.setAttribute("class", "bg-gray-800 border-b-2 border-gray-700 hover:bg-gray-700 text-xs sm:text-sm")
            tr.innerHTML = `<td class="px-6 py-4">${users[i].id}</td>
        <td class="sm:px-6 sm:py-4 px-3 py-1">${users[i].name}</td>
        <td class="sm:px-6 sm:py-4 px-3 py-1">${users[i].username}</td>
        <td class="sm:px-6 sm:py-4 px-3 py-1">${users[i].email}</td>
        <td class="sm:px-6 sm:py-4 px-3 py-1 text-center"><button class="bg-blue-700 hover:bg-blue-800 text-sky-100 font-bold sm:py-2.5 px-5 py-1 sm:m-0 m-1 rounded-full" onclick=opentodos(${users[i].id})><i class="fa-solid fa-list"></i> Todos</button></td>
        <td class="sm:px-6 sm:py-4 px-3 py-1 text-center"><button class="bg-blue-700 hover:bg-blue-800 text-sky-100 font-bold sm:py-2.5 px-5 py-1 sm:m-0 m-1 rounded-full" onclick=openAlbums(${users[i].id})><i class="fa-solid fa-image"></i> Albums</button></td>
        </tr>`
            user_content.appendChild(tr)
        }
    }
    catch (error) {
        alert("Error Fetching User Data", error)
    }
}

//opens new html page with specific id
let opentodos = (id) => {
    window.location.href = `todo.html?id=${id}`
}

//generating todos for a specific id in todo.html
let loadtodos = () => {
    let idfromurl = new URLSearchParams(window.location.search);
    let userid = idfromurl.get("id");
    let username = document.getElementById("username");
    let username1 = document.getElementById("username1");
    let complete = document.getElementById("completed");
    todo_content = document.getElementById("todo-content");
    let displaytodos = async () => {
        try {
            let p = await axios.get('https://jsonplaceholder.typicode.com/todos');
            let res = await p.data;
            let p1 = await fetch(`https://jsonplaceholder.typicode.com/users`);
            let res1 = await p1.json();
            const uname = document.createElement("span");
            uname.innerHTML = `${res1[userid - 1].name}'s</span>`;
            username.appendChild(uname);
            username1.innerHTML = `${res1[userid - 1].name}'s To-do List`;
            for (let i in res) {
                if (res[i].userId == userid) {
                    const tr = document.createElement("tr");
                    tr.setAttribute("class", "bg-gray-800 border-b-2 border-gray-700 hover:bg-gray-700 text-xs sm:text-sm")
                    const btn1 = document.createElement("button");
                    btn1.setAttribute("class", "text-white font-medium rounded-lg text-sm sm:px-4 py-0.5 px-2 mr-1 sm:py-2 bg-green-600 hover:bg-green-700")
                    btn1.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit</button>`
                    const btn2 = document.createElement("button");
                    btn2.setAttribute("class", "text-white font-medium rounded-lg text-sm sm:px-4 py-0.5 px-1 sm:py-2 bg-red-600 hover:bg-red-700 my-4")
                    btn2.innerHTML = `<i class="fa-solid fa-trash-can"></i> Delete</button>`
                    btn2.addEventListener("click", () => {
                        let a = confirm("Are you sure you want to delete this task?")
                        if (a) {
                            tr.remove();
                        }
                    })
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    const td3 = document.createElement("td");
                    td1.setAttribute("class", "sm:px-6 sm:py-4 px-3 py-1");
                    td2.setAttribute("class", "sm:px-6 sm:py-4 px-3 py-1");
                    td3.setAttribute("class", "sm:px-6 sm:py-4 px-3 py-1");
                    td1.textContent = res[i].id;
                    td2.textContent = res[i].title;
                    td3.textContent = `${res[i].completed ? 'Completed' : 'Not Completed'}`;
                    const tdbtn1 = document.createElement("td");
                    const tdbtn2 = document.createElement("td");
                    tdbtn1.appendChild(btn1);
                    tdbtn2.appendChild(btn2);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(tdbtn1)
                    tr.appendChild(tdbtn2)
                    todo_content.appendChild(tr);
                    complete.addEventListener("click", () => {
                        if (complete.checked) {
                            if (!res[i].completed) {
                                tr.style.visibility = "collapse";
                            }
                        }
                        else {
                            tr.style.visibility = "visible";
                        }
                    })
                    btn1.addEventListener("click", async () => {
                        let update = await prompt("Enter new task name :")
                        let x = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${res[i].id}`, {
                            title: update
                        });
                        let updatedres = await x.data;
                        td2.textContent = updatedres.title;
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(tdbtn1);
                        tr.appendChild(tdbtn2);
                        const edit = document.getElementById("edit");
                        edit.style.visibility = "visible";
                        setTimeout(() => {
                            edit.style.visibility = "hidden";
                        }, 3000);
                    })
                }
            }
        } catch (error) {
            alert("Error Fetching the Todo List Data", error)
        }
    }
    displaytodos();
}

//opens new html page with specific id
let openAlbums = (id) => {
    window.location.href = `album.html?id=${id}`
}

//generates albums in new html page album.html
let loadalbums = () => {
    let idfromurl = new URLSearchParams(window.location.search);
    let userid = idfromurl.get("id");
    let username = document.getElementById("username");
    let username1 = document.getElementById("username1");
    console.log(userid)
    let displayalbums = async () => {
        album_content = document.getElementById("album-content");
        try {
            let p = await fetch(`https://jsonplaceholder.typicode.com/albums`);
            let res = await p.json();
            let p1 = await fetch(`https://jsonplaceholder.typicode.com/users`);
            let res1 = await p1.json();
            const uname = document.createElement("span");
            uname.innerHTML = `${res1[userid - 1].name}'s</span>`;
            username.appendChild(uname);
            username1.innerHTML = `${res1[userid - 1].name}'s Album`;
            for (let i in res) {
                if (res[i].userId == userid) {
                    const div = document.createElement("div");
                    div.setAttribute("class", "max-w-sm sm:p-5 p-3 border rounded-3xl shadow bg-sky-900 border-sky-700 lg:h-60 flex flex-col text-center justify-evenly")
                    div.innerHTML = `
                    <h3 class="mb-4 sm:text-2xl text-lg font-bold text-white">${res[i].title}</h3>
                    <button class="px-3 py-2 sm:text-sm text-xs font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700" onclick=displayphotos(${res[i].id})><i class="fa-regular fa-eye"></i> View Photos</button>
                </div>
            `;
                    album_content.appendChild(div);
                }
            }
        } catch (error) {
            alert("Error Fetching the Albums Data", error)
        }
    }
    displayalbums();
};

//displays images for specific album in album.html page
let displayphotos = async (photoid) => {
    let photo_content = document.getElementById("photo-content");
    let albumname = document.getElementById("albumname");
    photo_content.innerHTML = "";
    albumname.innerHTML = "";
    try {
        let p = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        let res = await p.json();
        let p1 = await fetch(`https://jsonplaceholder.typicode.com/albums`);
        let res1 = await p1.json();
        for (let i in res) {
            if (res[i].albumId == photoid) {
                const div = document.createElement("div");
                div.innerHTML = `<img class="h-auto max-w-full rounded-lg" src="${res[i].url}"></div>`;
                photo_content.appendChild(div);
            }
        }
        const aname = document.createElement("span");
        aname.innerHTML = `${res1[photoid - 1].title}</span>`;
        albumname.appendChild(aname);
        window.scrollTo(0, 1080);
    }
    catch (error) {
        alert("Error Fetching the ", error)
    }
}