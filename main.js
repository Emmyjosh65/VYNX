/* =========================================================
   VYNX WEB
   Static frontend recreation of the mobile application.

   Backend URL found in the original APK:
   https://vynx3-production.up.railway.app

   Change API_BASE if you move your backend.
========================================================= */

const API_BASE =
  "https://vynx3-production.up.railway.app";


/* =========================================================
   STATE
========================================================= */

const state = {

  currentPage: "home",

  currentUser: JSON.parse(
    localStorage.getItem("vynx_user") || "null"
  ),

  likedPosts: JSON.parse(
    localStorage.getItem("vynx_likes") || "[]"
  ),

  followedUsers: JSON.parse(
    localStorage.getItem("vynx_follows") || "[]"
  ),

  posts: [],

  notificationsRead: false,

  settings: JSON.parse(
    localStorage.getItem("vynx_settings") || "{}"
  )

};


/* =========================================================
   DEMO DATA
========================================================= */

const demoUsers = [

  {
    id: "u1",
    username: "vynxofficial",
    name: "Vynx",
    avatar: "https://i.pravatar.cc/150?img=12"
  },

  {
    id: "u2",
    username: "alex",
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=32"
  },

  {
    id: "u3",
    username: "jessy",
    name: "Jessy",
    avatar: "https://i.pravatar.cc/150?img=47"
  },

  {
    id: "u4",
    username: "mike",
    name: "Mike",
    avatar: "https://i.pravatar.cc/150?img=51"
  },

  {
    id: "u5",
    username: "luna",
    name: "Luna",
    avatar: "https://i.pravatar.cc/150?img=44"
  },

  {
    id: "u6",
    username: "omega",
    name: "Omega",
    avatar: "https://i.pravatar.cc/150?img=68"
  }

];


const demoPosts = [

  {
    id: "p1",

    user: demoUsers[1],

    text:
      "Building something new today. The future belongs to people who keep creating. #Vynx #Technology",

    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",

    likes: 1240,

    comments: 83,

    time: "18 min"
  },


  {
    id: "p2",

    user: demoUsers[2],

    text:
      "Sometimes you just need to disappear for a while and come back stronger. 🔥",

    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",

    likes: 832,

    comments: 41,

    time: "1 h"
  },


  {
    id: "p3",

    user: demoUsers[5],

    text:
      "Gaming night. Who's joining? 🎮 #FreeFire",

    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",

    likes: 2190,

    comments: 127,

    time: "3 h"
  },


  {
    id: "p4",

    user: demoUsers[4],

    text:
      "New week. New energy. New goals.",

    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",

    likes: 507,

    comments: 22,

    time: "5 h"
  }

];


state.posts = demoPosts;


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  if (state.currentUser) {

    showMainApp();

  } else {

    showAuth();

  }

  renderStories();
  renderFeed();
  renderSuggestions();
  renderExplore();
  renderNotifications();
  renderMessages();
  renderProfile();

  loadSettings();

});


/* =========================================================
   AUTH
========================================================= */

function showAuth() {

  document
    .getElementById("authScreen")
    .classList.remove("hidden");

  document
    .getElementById("mainApp")
    .classList.add("hidden");

}


function showMainApp() {

  document
    .getElementById("authScreen")
    .classList.add("hidden");

  document
    .getElementById("mainApp")
    .classList.remove("hidden");

  updateUserUI();

}


function showLogin() {

  document
    .getElementById("loginForm")
    .classList.remove("hidden");

  document
    .getElementById("registerForm")
    .classList.add("hidden");

}


function showRegister() {

  document
    .getElementById("loginForm")
    .classList.add("hidden");

  document
    .getElementById("registerForm")
    .classList.remove("hidden");

}


function login() {

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  if (!email || !password) {

    toast("Enter your email and password.");

    return;

  }

  state.currentUser = {

    id: "me",

    username: email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9_]/g, ""),

    name:
      email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9]/g, " "),

    email,

    avatar:
      "https://i.pravatar.cc/150?img=12",

    bio:
      "Welcome to my Vynx profile."

  };

  localStorage.setItem(
    "vynx_user",
    JSON.stringify(state.currentUser)
  );

  showMainApp();

  toast("Welcome back.");

}


function demoLogin() {

  state.currentUser = {

    id: "me",

    username: "danny",

    name: "Danny",

    email: "demo@vynx.app",

    avatar:
      "https://i.pravatar.cc/150?img=12",

    bio:
      "Creating. Building. Exploring."

  };

  localStorage.setItem(
    "vynx_user",
    JSON.stringify(state.currentUser)
  );

  showMainApp();

  toast("Welcome to Vynx.");

}


function register() {

  const username =
    document
      .getElementById("registerUsername")
      .value
      .trim()
      .replace(/^@/, "");

  const email =
    document
      .getElementById("registerEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("registerPassword")
      .value;

  if (!username || !email || !password) {

    toast("Complete all fields.");

    return;

  }

  if (password.length < 6) {

    toast("Password must be at least 6 characters.");

    return;

  }

  state.currentUser = {

    id: "me",

    username,

    name: username,

    email,

    avatar:
      "https://i.pravatar.cc/150?img=12",

    bio:
      "New to Vynx."

  };

  localStorage.setItem(
    "vynx_user",
    JSON.stringify(state.currentUser)
  );

  showMainApp();

  toast("Account created.");

}


function logout() {

  localStorage.removeItem("vynx_user");

  state.currentUser = null;

  showAuth();

}


/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {

  if (!state.currentUser) return;

  const avatar =
    state.currentUser.avatar;

  const username =
    "@" + state.currentUser.username;

  document
    .getElementById("sidebarAvatar")
    .src = avatar;

  document
    .getElementById("quickAvatar")
    .src = avatar;

  document
    .getElementById("createAvatar")
    .src = avatar;

  document
    .getElementById("sidebarUsername")
    .textContent = username;

  document
    .getElementById("createUsername")
    .textContent = username;

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

  state.currentPage = page;

  document
    .querySelectorAll(".page")
    .forEach(pageEl => {
      pageEl.classList.remove("active-page");
    });

  const target =
    document.getElementById(
      "page-" + page
    );

  if (target) {

    target.classList.add("active-page");

  }

  document
    .querySelectorAll(".nav-item[data-page], .mobile-nav button[data-page]")
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.page === page
      );

    });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (page === "profile") {

    renderProfile();

  }

}


/* =========================================================
   STORIES
========================================================= */

function renderStories() {

  const container =
    document.getElementById("stories");

  if (!container) return;

  const users = [
    {
      username: "Your story",
      avatar:
        state.currentUser?.avatar ||
        "https://i.pravatar.cc/100?img=12"
    },
    ...demoUsers
  ];

  container.innerHTML =
    users
      .slice(0, 7)
      .map((user, index) => `

        <div
          class="story"
          onclick="toast('Opening ${escapeHtml(user.username)} story')"
        >

          <div class="story-avatar">

            <img
              src="${user.avatar}"
              alt=""
            >

          </div>

          <span>
            ${escapeHtml(user.username)}
          </span>

        </div>

      `)
      .join("");

}


/* =========================================================
   FEED
========================================================= */

function renderFeed() {

  const container =
    document.getElementById("feed");

  if (!container) return;

  if (!state.posts.length) {

    container.innerHTML = `
      <div class="right-card">
        <h3>Your feed is empty</h3>
        <p style="color:var(--muted);font-size:12px">
          Follow people or create your first post.
        </p>
      </div>
    `;

    return;

  }

  container.innerHTML =
    state.posts
      .map(post => renderPost(post))
      .join("");

}


function renderPost(post) {

  const liked =
    state.likedPosts.includes(post.id);

  const likes =
    post.likes +
    (liked ? 1 : 0);

  const image =
    post.image
      ? `
        <img
          class="post-image"
          src="${post.image}"
          alt="Post"
          loading="lazy"
          onclick="openPost('${post.id}')"
        >
      `
      : "";

  return `

    <article class="post">

      <div class="post-header">

        <img
          class="avatar"
          src="${post.user.avatar}"
          alt=""
        >

        <div class="post-user">

          <strong>
            ${escapeHtml(post.user.name)}
          </strong>

          <span>
            @${escapeHtml(post.user.username)}
            · ${post.time}
          </span>

        </div>

        <button
          class="post-more"
          onclick="postMenu('${post.id}')"
        >
          •••
        </button>

      </div>


      <div class="post-content">
        ${formatPostText(post.text)}
      </div>

      ${image}


      <div class="post-actions">

        <button
          class="action-btn ${liked ? "liked" : ""}"
          onclick="toggleLike('${post.id}')"
        >

          <span>
            ${liked ? "♥" : "♡"}
          </span>

          ${formatNumber(likes)}

        </button>


        <button
          class="action-btn"
          onclick="openPost('${post.id}')"
        >

          <span>◌</span>

          ${formatNumber(post.comments)}

        </button>


        <button
          class="action-btn"
          onclick="sharePost('${post.id}')"
        >

          <span>↗</span>

        </button>

      </div>


      <div class="post-caption">

        ${formatNumber(likes)} likes

        ·

        ${formatNumber(post.comments)} comments

      </div>

    </article>

  `;

}


/* =========================================================
   LIKE
========================================================= */

function toggleLike(id) {

  const index =
    state.likedPosts.indexOf(id);

  if (index === -1) {

    state.likedPosts.push(id);

    toast("Liked.");

  } else {

    state.likedPosts.splice(index, 1);

  }

  localStorage.setItem(
    "vynx_likes",
    JSON.stringify(state.likedPosts)
  );

  renderFeed();

}


/* =========================================================
   POST DETAIL
========================================================= */

function openPost(id) {

  const post =
    state.posts.find(
      p => p.id === id
    );

  if (!post) return;

  const modal =
    document.getElementById("postModal");

  const content =
    document.getElementById("postModalContent");

  content.innerHTML = `

    <div class="modal-header">

      <h2>Post</h2>

      <button
        onclick="closePostModal()"
      >
        ×
      </button>

    </div>

    <div class="post">

      <div class="post-header">

        <img
          class="avatar"
          src="${post.user.avatar}"
        >

        <div class="post-user">

          <strong>
            ${escapeHtml(post.user.name)}
          </strong>

          <span>
            @${escapeHtml(post.user.username)}
          </span>

        </div>

      </div>

      <div class="post-content">
        ${formatPostText(post.text)}
      </div>

      ${
        post.image
          ? `<img
              class="post-image"
              src="${post.image}"
            >`
          : ""
      }

      <div
        style="
          padding:20px;
          color:var(--muted);
          font-size:12px;
        "
      >
        ${formatNumber(post.comments)}
        comments
      </div>

    </div>

  `;

  modal.classList.remove("hidden");

}


function closePostModal() {

  document
    .getElementById("postModal")
    .classList.add("hidden");

}


/* =========================================================
   CREATE POST
========================================================= */

function openCreatePost() {

  document
    .getElementById("createModal")
    .classList.remove("hidden");

  setTimeout(() => {

    document
      .getElementById("postText")
      .focus();

  }, 100);

}


function closeCreatePost() {

  document
    .getElementById("createModal")
    .classList.add("hidden");

}


function addEmoji(emoji) {

  const textarea =
    document.getElementById("postText");

  textarea.value +=
    (textarea.value ? " " : "") +
    emoji;

  textarea.focus();

}


function previewMedia(event) {

  const file =
    event.target.files[0];

  if (!file) return;

  const preview =
    document.getElementById("mediaPreview");

  const url =
    URL.createObjectURL(file);

  if (file.type.startsWith("video/")) {

    preview.innerHTML = `

      <video
        src="${url}"
        controls
      ></video>

    `;

  } else {

    preview.innerHTML = `

      <img
        src="${url}"
        alt="Preview"
      >

    `;

  }

  preview.dataset.url = url;

}


function createPost() {

  const textarea =
    document.getElementById("postText");

  const text =
    textarea.value.trim();

  const preview =
    document.getElementById("mediaPreview");

  if (!text && !preview.dataset.url) {

    toast("Write something first.");

    return;

  }

  const post = {

    id:
      "local-" +
      Date.now(),

    user: {

      id: "me",

      username:
        state.currentUser?.username ||
        "danny",

      name:
        state.currentUser?.name ||
        "Danny",

      avatar:
        state.currentUser?.avatar ||
        "https://i.pravatar.cc/150?img=12"

    },

    text:
      text || "New Vynx post.",

    image:
      preview.dataset.url || null,

    likes: 0,

    comments: 0,

    time: "now"

  };

  state.posts.unshift(post);

  textarea.value = "";

  preview.innerHTML = "";

  preview.dataset.url = "";

  closeCreatePost();

  renderFeed();

  toast("Post published.");

}


/* =========================================================
   EXPLORE
========================================================= */

function renderExplore() {

  const container =
    document.getElementById("exploreGrid");

  if (!container) return;

  container.innerHTML =
    state.posts
      .concat(state.posts)
      .slice(0, 12)
      .map(post => `

        <div
          class="explore-item"
          onclick="openPost('${post.id}')"
        >

          <img
            src="${post.image}"
            alt=""
            loading="lazy"
          >

          <div class="explore-overlay">

            <span>
              ♥ ${formatNumber(post.likes)}
            </span>

            <span>
              ◌ ${formatNumber(post.comments)}
            </span>

          </div>

        </div>

      `)
      .join("");

}


function exploreTab(tab, button) {

  document
    .querySelectorAll(".explore-tabs button")
    .forEach(btn =>
      btn.classList.remove("active")
    );

  button.classList.add("active");

  if (tab === "people") {

    document.getElementById("exploreGrid").innerHTML =
      demoUsers
        .map(user => `

          <div
            class="right-card"
            style="margin:0"
          >

            <div class="suggestion">

              <img src="${user.avatar}">

              <div class="suggestion-info">

                <strong>
                  ${escapeHtml(user.name)}
                </strong>

                <small>
                  @${escapeHtml(user.username)}
                </small>

              </div>

              <button
                class="follow-btn"
                onclick="toggleFollow('${user.id}', this)"
              >
                Follow
              </button>

            </div>

          </div>

        `)
        .join("");

    return;

  }

  renderExplore();

}


function performSearch() {

  const query =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  if (!query) {

    renderExplore();

    return;

  }

  const results =
    state.posts.filter(post =>

      post.text
        .toLowerCase()
        .includes(query)

      ||

      post.user.username
        .toLowerCase()
        .includes(query)

    );

  const container =
    document.getElementById("exploreGrid");

  if (!results.length) {

    container.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          padding:40px;
          text-align:center;
          color:var(--muted);
        "
      >
        Nothing found for "${escapeHtml(query)}"
      </div>

    `;

    return;

  }

  container.innerHTML =
    results
      .map(post => `

        <div
          class="explore-item"
          onclick="openPost('${post.id}')"
        >

          <img
            src="${post.image}"
            alt=""
          >

        </div>

      `)
      .join("");

}


/* =========================================================
   SUGGESTIONS
========================================================= */

function renderSuggestions() {

  const container =
    document.getElementById("suggestions");

  if (!container) return;

  container.innerHTML =
    demoUsers
      .slice(0, 4)
      .map(user => {

        const following =
          state.followedUsers.includes(user.id);

        return `

          <div class="suggestion">

            <img
              src="${user.avatar}"
              alt=""
            >

            <div class="suggestion-info">

              <strong>
                ${escapeHtml(user.name)}
              </strong>

              <small>
                @${escapeHtml(user.username)}
              </small>

            </div>

            <button
              class="follow-btn ${
                following
                  ? "following"
                  : ""
              }"
              onclick="toggleFollow('${user.id}', this)"
            >
              ${
                following
                  ? "Following"
                  : "Follow"
              }
            </button>

          </div>

        `;

      })
      .join("");

}


function toggleFollow(id, button) {

  const index =
    state.followedUsers.indexOf(id);

  if (index === -1) {

    state.followedUsers.push(id);

    if (button) {

      button.textContent =
        "Following";

      button.classList.add(
        "following"
      );

    }

    toast("Following.");

  } else {

    state.followedUsers.splice(index, 1);

    if (button) {

      button.textContent =
        "Follow";

      button.classList.remove(
        "following"
      );

    }

    toast("Unfollowed.");

  }

  localStorage.setItem(
    "vynx_follows",
    JSON.stringify(
      state.followedUsers
    )
  );

  renderSuggestions();

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function renderNotifications() {

  const container =
    document.getElementById(
      "notificationsList"
    );

  if (!container) return;

  const notifications = [

    {
      avatar: demoUsers[2].avatar,
      text:
        "<b>Jessy</b> liked your post.",
      time: "5 min",
      unread: true
    },

    {
      avatar: demoUsers[1].avatar,
      text:
        "<b>Alex</b> started following you.",
      time: "27 min",
      unread: true
    },

    {
      avatar: demoUsers[4].avatar,
      text:
        "<b>Luna</b> commented on your post.",
      time: "1 h",
      unread: false
    },

    {
      avatar: demoUsers[5].avatar,
      text:
        "<b>Omega</b> mentioned you in a post.",
      time: "3 h",
      unread: false
    }

  ];

  container.innerHTML =
    notifications
      .map(item => `

        <div
          class="notification ${
            item.unread &&
            !state.notificationsRead
              ? "unread"
              : ""
          }"
        >

          <img
            src="${item.avatar}"
          >

          <div class="notification-content">

            ${item.text}

            <span>
              · ${item.time}
            </span>

          </div>

          <span class="notification-time">
            ${item.unread ? "●" : ""}
          </span>

        </div>

      `)
      .join("");

}


function markNotificationsRead() {

  state.notificationsRead = true;

  renderNotifications();

  toast("Notifications marked as read.");

}


/* =========================================================
   MESSAGES
========================================================= */

function renderMessages() {

  const container =
    document.getElementById(
      "messagesList"
    );

  if (!container) return;

  const messages = [

    {
      user: demoUsers[1],
      text: "Are you joining the event?",
      time: "2m"
    },

    {
      user: demoUsers[2],
      text: "That post was amazing 🔥",
      time: "19m"
    },

    {
      user: demoUsers[5],
      text: "Let's play later.",
      time: "1h"
    },

    {
      user: demoUsers[4],
      text: "Hey! How are you?",
      time: "3h"
    }

  ];

  container.innerHTML =
    messages
      .map(message => `

        <div
          class="message"
          onclick="openChat('${message.user.username}')"
        >

          <img
            src="${message.user.avatar}"
          >

          <div class="message-info">

            <strong>
              ${escapeHtml(message.user.name)}
            </strong>

            <p>
              ${escapeHtml(message.text)}
            </p>

          </div>

          <span class="message-time">
            ${message.time}
          </span>

        </div>

      `)
      .join("");

}


function openChat(username) {

  toast(
    "Chat with @" +
    username +
    " — connect your backend to enable live messaging."
  );

}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

  const container =
    document.getElementById(
      "profileContent"
    );

  if (!container) return;

  const user =
    state.currentUser || {

      username: "danny",
      name: "Danny",
      avatar:
        "https://i.pravatar.cc/150?img=12",
      bio:
        "Creating. Building. Exploring."

    };

  const userPosts =
    state.posts.filter(
      post =>
        post.user.id === "me"
    );

  container.innerHTML = `

    <div class="profile-cover"></div>

    <div class="profile-main">

      <div class="profile-top">

        <img
          class="profile-avatar"
          src="${user.avatar}"
          alt=""
        >

        <button
          class="profile-edit"
          onclick="toast('Edit profile coming next.')"
        >
          Edit profile
        </button>

      </div>

      <h1 class="profile-name">
        ${escapeHtml(user.name)}
      </h1>

      <p class="profile-handle">
        @${escapeHtml(user.username)}
      </p>

      <p class="profile-bio">
        ${escapeHtml(
          user.bio ||
          "Welcome to my Vynx profile."
        )}
      </p>

      <div class="profile-stats">

        <div class="profile-stat">
          <strong>${userPosts.length}</strong>
          <span>Posts</span>
        </div>

        <div class="profile-stat">
          <strong>1.2K</strong>
          <span>Followers</span>
        </div>

        <div class="profile-stat">
          <strong>348</strong>
          <span>Following</span>
        </div>

      </div>

      <div class="profile-tabs">

        <button class="active">
          Posts
        </button>

        <button>
          Media
        </button>

        <button>
          Likes
        </button>

      </div>

    </div>

    <div
      class="feed"
      style="margin-top:18px"
    >

      ${
        userPosts.length
          ? userPosts
              .map(post =>
                renderPost(post)
              )
              .join("")
          : `
            <div class="right-card">
              <h3>No posts yet</h3>
              <p
                style="
                  color:var(--muted);
                  font-size:12px;
                "
              >
                Your posts will appear here.
              </p>
            </div>
          `
      }

    </div>

  `;

}


/* =========================================================
   SETTINGS
========================================================= */

function saveSetting(name, value) {

  state.settings[name] = value;

  localStorage.setItem(
    "vynx_settings",
    JSON.stringify(
      state.settings
    )
  );

}


function loadSettings() {

  const privateAccount =
    document.getElementById(
      "privateAccount"
    );

  if (
    privateAccount &&
    state.settings.private
  ) {

    privateAccount.checked = true;

  }

}


function toggleTheme(dark) {

  if (dark) {

    document.documentElement
      .style
      .setProperty(
        "--bg",
        "#0d0d12"
      );

  } else {

    document.documentElement
      .style
      .setProperty(
        "--bg",
        "#f4f4f7"
      );

  }

}


/* =========================================================
   REFRESH
========================================================= */

function refreshFeed() {

  const button =
    document.querySelector(
      ".page-header .icon-button"
    );

  if (button) {

    button.style.transform =
      "rotate(360deg)";

    setTimeout(() => {

      button.style.transform =
        "";

    }, 500);

  }

  renderFeed();

  toast("Feed refreshed.");

}


/* =========================================================
   SHARE
========================================================= */

async function sharePost(id) {

  const url =
    window.location.origin +
    window.location.pathname +
    "?post=" +
    id;

  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title: "Vynx post",
        url
      });

    } catch (_) {}

  } else {

    try {

      await navigator.clipboard.writeText(
        url
      );

      toast(
        "Post link copied."
      );

    } catch (_) {

      toast(
        "Share link: " + url
      );

    }

  }

}


/* =========================================================
   POST MENU
========================================================= */

function postMenu(id) {

  const choice =
    confirm(
      "Copy link to this post?"
    );

  if (choice) {

    sharePost(id);

  }

}


/* =========================================================
   PASSWORD
========================================================= */

function togglePassword(id) {

  const input =
    document.getElementById(id);

  if (!input) return;

  input.type =
    input.type === "password"
      ? "text"
      : "password";

}


/* =========================================================
   API LAYER
=========================================================

   These functions are ready for your real backend.

   The original APK contains the Railway backend URL.
   You can replace API_BASE above if your backend changes.

========================================================= */

async function apiRequest(
  endpoint,
  options = {}
) {

  try {

    const response =
      await fetch(
        API_BASE + endpoint,
        {
          ...options,

          headers: {
            "Content-Type":
              "application/json",

            ...(options.headers || {})
          }
        }
      );

    if (!response.ok) {

      throw new Error(
        "HTTP " +
        response.status
      );

    }

    return await response.json();

  } catch (error) {

    console.warn(
      "Vynx API:",
      endpoint,
      error
    );

    return null;

  }

}


/* =========================================================
   BACKEND FEED
========================================================= */

async function loadBackendFeed() {

  const data =
    await apiRequest(
      "/posts/feed"
    );

  if (
    data &&
    Array.isArray(data)
  ) {

    state.posts = data;

    renderFeed();

  }

}


/* =========================================================
   BACKEND PROFILE
========================================================= */

async function loadBackendProfile() {

  const user =
    await apiRequest(
      "/users/me"
    );

  if (user) {

    state.currentUser =
      user;

    localStorage.setItem(
      "vynx_user",
      JSON.stringify(user)
    );

    updateUserUI();

    renderProfile();

  }

}


/* =========================================================
   UTILITY
========================================================= */

function formatNumber(number) {

  if (number < 1000) {

    return number;

  }

  if (number < 1000000) {

    return (
      (number / 1000)
        .toFixed(
          number >= 10000
            ? 0
            : 1
        )
        .replace(".0", "")
      + "K"
    );

  }

  return (
    (number / 1000000)
      .toFixed(1)
      .replace(".0", "")
    + "M"
  );

}


function formatPostText(text) {

  let safe =
    escapeHtml(text);

  safe =
    safe.replace(
      /(#[a-zA-Z0-9_]+)/g,
      `<span class="hashtag">$1</span>`
    );

  safe =
    safe.replace(
      /\n/g,
      "<br>"
    );

  return safe;

}


function escapeHtml(value) {

  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function toast(message) {

  const element =
    document.getElementById(
      "toast"
    );

  if (!element) return;

  element.textContent =
    message;

  element.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(() => {

      element.classList.remove(
        "show"
      );

    }, 2500);

}


/* =========================================================
   URL POST OPEN
========================================================= */

(function checkPostURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const post =
    params.get("post");

  if (post) {

    setTimeout(() => {

      openPost(post);

    }, 600);

  }

})();
