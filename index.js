// DOM Elements
const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const postsList = document.getElementById("posts-list");
const loadPostsBtn = document.getElementById("load-posts");

let posts = [];

// Load posts from localStorage
function loadPosts() {
  const stored = localStorage.getItem("blogPosts");
  posts = stored ? JSON.parse(stored) : [];
  renderPosts();
}

// Save posts to localStorage
function savePosts() {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// Render all posts
function renderPosts() {
  postsList.innerHTML = "";

  if (posts.length === 0) {
    postsList.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsList.appendChild(postDiv);
  });
}
// Handle form submission
postForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  const newPost = {
    id: Date.now(),
    title,
    content
  };

  posts.unshift(newPost);
  savePosts();
  renderPosts();
  postForm.reset();
});

// Delete a post by ID
function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
  savePosts();
  renderPosts();
}

// Load posts on button click
loadPostsBtn.addEventListener("click", loadPosts);

// Initial load
document.addEventListener("DOMContentLoaded", loadPosts);
// DOM references
// (Removed duplicate variable declarations)

// Load posts from localStorage
function loadPosts() {
  const saved = localStorage.getItem("blogPosts");
  posts = saved ? JSON.parse(saved) : [];
  renderPosts();
}

// Save to localStorage
function savePosts() {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// Render posts in DOM
function renderPosts() {
  postsList.innerHTML = "";

  if (posts.length === 0) {
    postsList.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <h3>post.title</h3>
      <p>{post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsList.appendChild(postDiv);
  });
}// Handle post submission
postForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  const newPost = {
    id: Date.now(),
    title,
    content
  };

  posts.unshift(newPost);
  savePosts();
  renderPosts();
  postForm.reset();
});

// Handle Reset (form already has type="reset")
postForm.addEventListener("reset", () => {
  titleInput.value = "";
  contentInput.value = "";
});

// Load posts when Load button is clicked
loadBtn.addEventListener("click", loadPosts);

// Delete post by ID
function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
// Load posts when Load button is clicked
loadPostsBtn.addEventListener("click", loadPosts);
}

// Load posts on initial page load
document.addEventLi