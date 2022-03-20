const apiUrl = 'https://jsonplaceholder.typicode.com';

const postsUrl = apiUrl + '/posts';
const commentsUrl = `${apiUrl}/comments`;
const usersUrl = `${apiUrl}/users`;

function getApiResponse(url) {
  const postsRequest = fetch(url);
  return postsRequest.then((response) => response.json());
}

getApiResponse(postsUrl).then((posts) => {
  for (const post of posts) {
    addListElement(post);
  }
});

function addListElement(post) {
  const element = document.createElement('li');
  element.innerText = post.title;
  element.classList.add('post-title');
  element.addEventListener('click', (event) => {
    const contentElement = document.getElementById('content');
    contentElement.innerText = post.body;

    getApiResponse(`${usersUrl}/${post.userId}`).then((user) => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `<h2>${user.name} <small>(${user.email})</small></h2>`;
      contentElement.append(userElement);
    });
  });
  const listContainer = document.getElementById('list');
  listContainer.append(element);
}


  
