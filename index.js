// Get references to DOM elements
const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const postsList = document.getElementById("posts-list");

// Array to hold blog posts
let posts = [];

// Load posts from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedPosts = localStorage.getItem("blogPosts");
  if (storedPosts) {
    posts = JSON.parse(storedPosts);
    renderPosts();
  }
});

// Handle form submission
postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    posts.unshift(newPost); // Add to beginning
    savePosts();
    renderPosts();
    postForm.reset(); // Clear form
  }
});
// Save posts to localStorage
function savePosts() {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// Render posts to the DOM
function renderPosts() {
  postsList.innerHTML = "";

  if (posts.length === 0) {
    postsList.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "post";

    postCard.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;

    postsList.appendChild(postCard);
  });
}

// Delete a post by ID
function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);
  savePosts();
  renderPosts();
}