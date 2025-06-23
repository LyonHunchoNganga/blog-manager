// Base URL for API
const API_URL = 'http://localhost:3000/posts'; // Change this to match your backend

// DOM elements
const newPostForm = document.getElementById('new-post-form');
const editPostForm = document.getElementById('edit-post-form');
const postsContainer = document.getElementById('posts');

const newTitleInput = document.getElementById('new-title');
const newContentInput = document.getElementById('new-content');

const editTitleInput = document.getElementById('edit-title');
const editContentInput = document.getElementById('edit-content');
const cancelEditBtn = document.getElementById('cancel-edit');
const deletePostBtn = document.getElementById('delete-post');

let currentEditId = null;

// Fetch and display all posts
function loadPosts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(posts => {
      postsContainer.innerHTML = '';
      posts.forEach(renderPost);
    });
}

function renderPost(post) {
  const postEl = document.createElement('div');
  postEl.className = 'bg-white p-4 rounded-md shadow';
  postEl.innerHTML = `
    <h3 class="text-lg font-bold">${post.title}</h3>
    <p>${post.content}</p>
    <button data-id="${post.id}" class="edit-btn bg-blue-500 text-white py-1 px-3 rounded-md mt-2">Edit</button>
  `;
  postsContainer.appendChild(postEl);

  postEl.querySelector('.edit-btn').addEventListener('click', () => {
    currentEditId = post.id;
    editTitleInput.value = post.title;
    editContentInput.value = post.content;
    editPostForm.classList.remove('hidden');
    newPostForm.classList.add('hidden');
  });
}

// Create new post
newPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const postData = {
    title: newTitleInput.value,
    content: newContentInput.value
  };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  })
    .then(() => {
      newPostForm.reset();
      loadPosts();
    });
});

// Update existing post
editPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const updatedData = {
    title: editTitleInput.value,
    content: editContentInput.value
  };

  fetch(`${API_URL}/${currentEditId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
    .then(() => {
      editPostForm.reset();
      editPostForm.classList.add('hidden');
      newPostForm.classList.remove('hidden');
      loadPosts();
    });
});

// Cancel editing
cancelEditBtn.addEventListener('click', () => {
  editPostForm.reset();
  editPostForm.classList.add('hidden');
  newPostForm.classList.remove('hidden');
});

// Delete post
deletePostBtn.addEventListener('click', () => {
  fetch(`${API_URL}/${currentEditId}`, {
    method: 'DELETE'
  })
    .then(() => {
      editPostForm.reset();
      editPostForm.classList.add('hidden');
      newPostForm.classList.remove('hidden');
      loadPosts();
    });
});

// Initialize
loadPosts();