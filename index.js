// Select DOM elements
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");
const loadPostsBtn = document.getElementById("loadPostsBtn");

// A temporary array to store posts (optional: switch to localStorage)
let posts = [];

// Handle form submission
postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from form inputs
  const title = document.getElementById("postTitle").value.trim();
  const author = document.getElementById("postAuthor").value.trim();
  const category = document.getElementById("postCategory").value;
  const content = document.getElementById("postContent").value.trim();

  // Validate
  if (!title || !author || !category || !content) {
    alert("Please fill in all fields.");
    return;
  }

  // Create post object
  const newPost = {
    id: Date.now(),
    title,
    author,
    category,
    content,
    date: new Date().toLocaleString()
  };

  // Add to array (or localStorage)
  posts.push(newPost);

  // Optionally: save to localStorage
  // localStorage.setItem("blogPosts", JSON.stringify(posts));

  // Add to DOM
  addPostToDOM(newPost);

  // Reset form
  postForm.reset();
});

// Handle "Load All Posts" button
loadPostsBtn.addEventListener("click", function () {
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    // Optionally: retrieve from localStorage
    // const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    // posts = savedPosts;

    postsContainer.innerHTML = "<p class='empty-msg'>No blog posts available.</p>";
    return;
  }

  posts.forEach(post => addPostToDOM(post));
});

// Function to add a single post to DOM
function addPostToDOM(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");

  postCard.innerHTML = `
    <h3>${post.title}</h3>
    <p class="meta">By <strong>${post.author}</strong> | ${post.category} | <span>${post.date}</span></p>
    <p class="content">${post.content}</p>
    <hr />
  `;

    postsContainer.prepend(postCard); // Show newest on top
  }
// filepath: c:\Users\dollar\blog-manager\index.js
// ...existing code...

const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    postForm.reset();
  });
}

// ...existing code...