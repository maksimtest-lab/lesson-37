/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\nconst usernameInput = document.getElementById('username');\nconst usernameLoginButton = document.getElementById('login-btn');\n\nconst authScreen = document.getElementById('auth-screen');\nconst mainApp = document.getElementById('main-app');\n\nconst tabsButton = document.querySelectorAll('.tab-btn');\nconst tabConents = document.querySelectorAll('.tab-content');\n\nconst themeToggle = document.getElementById('theme-toggle');\n// Users elements \nconst usersSearchInput = document.getElementById('users-search');\nconst prevUsersButton = document.getElementById('prev-users');\nconst nextUsersButton = document.getElementById('next-users');\n\n// Posts elements\nconst postSearchInput = document.getElementById('post-search');\nconst prevPostsButton = document.getElementById('prev-posts');\nconst nextPostsButton = document.getElementById('next-posts');\n\n// Todos elements\nconst prevTodosButton = document.getElementById('prev-todos');\nconst nextTodosButton = document.getElementById('next-todos');\n\nlet userPage = 1;\nlet postPage = 1;\nlet todoPage = 1;\nconst defaultLimit = 5;\n\nconst todoInput = document.getElementById('input-todo');\nconst addTodoButton = document.getElementById('add-todo');\n\nfunction setCookie(name, value, hours) {\n    const expires = new Date(Date.now() + hours * 3600000).toUTCString();\n\n    document.cookie = `${name}=${value}; expires=${expires}; path=/`;\n}\n\nfunction getCookie(name) {\n      return document.cookie.split(\"; \").find(row => row.startsWith(name + \"=\"))?.split(\"=\")[1];\n}\n\nfunction deleteCookie(name) {\n    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;\n}\n\nfunction checkAuth() {\n    const username = getCookie('username');\n\n    if(window.sessionStorage.getItem('dark-theme')) {\n        document.body.classList.add('dark-mode');\n        themeToggle.checked = true;\n    }\n\n    if(username) {\n        authScreen.classList.add('hidden');\n        mainApp.classList.remove('hidden');\n        loadTab(window.sessionStorage.getItem('activeTab') || 'users');\n    } else {\n        authScreen.classList.remove('hidden');\n        mainApp.classList.add('hidden');\n    }\n}\n\n\nusernameLoginButton.addEventListener('click', () => {\n    const usernameValue = usernameInput.value;\n\n    if(usernameValue) {\n        setCookie('username', usernameValue, 1);\n        checkAuth();\n    }\n\n})\n\nfunction loadTab(tabName) {\n    tabConents.forEach((item) => item.classList.add('hidden'));\n\n    const tab = document.getElementById(`${tabName}-tab`);\n    tab.classList.remove('hidden');\n\n    let currentTab = window.sessionStorage.getItem('activeTab') || 'users';\n    tabsButton.forEach((item) => {\n        const target = item.dataset.tab;\n        if(target == currentTab) {\n            item.classList.add('active');\n        } else {\n            item.classList.remove('active');\n        }\n    })\n\n    if(tabName == 'users') {\n        fetchUsers();\n    }\n\n    if(tabName == 'posts') {\n        fetchPosts();\n    }\n\n    if(tabName == 'todos') {\n        fetchTodos();\n    }\n}\n\ntabsButton.forEach((item) => {\n    item.addEventListener('click', () => {\n        const target = item.dataset.tab;\n        window.sessionStorage.setItem('activeTab', target);\n        loadTab(target);\n    })\n})\n\n\n\nthemeToggle.onchange = () => {\n    document.body.classList.toggle('dark-mode', themeToggle.checked);\n    window.sessionStorage.setItem('dark-theme', themeToggle.checked);\n}\n\nsetInterval(() => {\n    const username = getCookie('username');\n\n    if(!username) {\n        deleteCookie('username');\n        location.reload();\n    }\n}, 10000);\n\n// Users\nprevUsersButton.addEventListener('click', () => {\n    if(userPage > 1) {\n        userPage -= 1;\n        fetchUsers();\n    }\n})\n\nnextUsersButton.addEventListener('click', () => {\n    userPage += 1;\n    fetchUsers();\n})\n\nusersSearchInput.oninput = (event) => {\n    userPage = 1;\n    fetchUsers(event.target.value);\n}\n\nfunction renderUsers(users) {\n    const usersList = document.getElementById('users-list');\n    if(users.length) {\n        usersList.innerHTML = users.map((user) => {\n            return `<div>${user.name} - ${user.email}</div>`;\n        }).join('');\n\n    } else {\n        usersList.innerHTML = 'Нету пользователей';\n    }\n\n}\n\nfunction fetchUsers(query='') {\n    fetch(`https://jsonplaceholder.typicode.com/users?_limit=${defaultLimit}&_page=${userPage}&q=${query}`).then((response) => {\n        return response.json();\n    }).then((data) => {\n        renderUsers(data);\n    })\n\n}\n\n// Posts\nprevPostsButton.addEventListener('click', () => {\n    if(postPage > 1) {\n        postPage -= 1;\n        fetchPosts();\n    }\n})\n\nnextPostsButton.addEventListener('click', () => {\n    postPage += 1;\n    fetchPosts();\n})\n\npostSearchInput.oninput = (event) => {\n    postPage = 1;\n    fetchPosts(event.target.value);\n}\n\nfunction renderPosts(posts) {\n    const postsList = document.getElementById('post-list');\n    if(posts.length) {\n        postsList.innerHTML = posts.map((post) => {\n            return `<div class=\"post\"><h3>${post.title}</h3><p>${post.body}</p></div>`;\n        }).join('');\n\n    } else {\n        postsList.innerHTML = 'Нету пользователей';\n    }\n\n}\n\nfunction fetchPosts(query='') {\n    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${defaultLimit}&_page=${postPage}&q=${query}`).then((response) => {\n        return response.json();\n    }).then((data) => {\n        renderPosts(data);\n    })\n\n}\n\n// Todos\nprevTodosButton.addEventListener('click', () => {\n    if(todoPage > 1) {\n        todoPage -= 1;\n        fetchTodos();\n    }\n})\n\nnextTodosButton.addEventListener('click', () => {\n    todoPage += 1;\n    fetchTodos();\n})\n\nfunction renderTodos(todos) {\n    const todosList = document.getElementById('todo-list');\n    todosList.start = (todoPage - 1) * defaultLimit + 1;\n\n    if(todos.length) {\n        todosList.innerHTML = todos.map((todo) => {\n            return `<li>${todo.completed ? '✅' : '❌'} ${todo.title}</li>`;\n        }).join('');\n\n    } else {\n        todosList.innerHTML = 'Нету задач по запросу';\n    }\n\n}\n\nfunction fetchTodos(query='') {\n    return fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${defaultLimit}&_page=${todoPage}&q=${query}`).then((response) => {\n        return response.json();\n    }).then((data) => {\n        renderTodos(data);\n    })\n\n}\n\naddTodoButton.addEventListener('click', () => {\n    const todoValue = todoInput.value;\n    fetch('https://jsonplaceholder.typicode.com/todos', {\n        method: 'POST',\n        body: JSON.stringify({\n            title: todoValue,\n            completed: false\n        }),\n        headers: {\n            'Content-type': 'application/json; charset=UTF-8'\n        }\n    }).then((response) => {\n        return response.json();\n    }).then((data) => {\n        todoPage = 1;\n        fetchTodos().then(() => {\n            const todosList = document.getElementById('todo-list');\n            const li = document.createElement('li');\n\n            li.textContent = `${data.completed ? '✅' : '❌'} ${data.title}`;\n            todosList.insertBefore(li, todosList.firstChild);\n            todosList.removeChild(todosList.lastChild);\n        });\n\n    })\n});\n\n// Final\n\ncheckAuth();\n\n\n//# sourceURL=webpack://lesson_37/./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lesson_37/./src/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;