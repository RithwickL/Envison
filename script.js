document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postInput = document.getElementById('post-input');
    const postsDiv = document.getElementById('posts');
    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const usernameInput = document.getElementById('username');
    let username = localStorage.getItem('username');

    if (username) {
        showForum();
    }

    loginButton.addEventListener('click', () => {
        username = usernameInput.value;
        if (username) {
            localStorage.setItem('username', username);
            showForum();
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        hideForum();
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postText = postInput.value;
        if (postText) {
            addPost(postText);
            postInput.value = '';
        }
    });

    function showForum() {
        document.getElementById('auth').style.display = 'none';
        postForm.style.display = 'flex';
        logoutButton.style.display = 'block';
        loadPosts();
    }

    function hideForum() {
        document.getElementById('auth').style.display = 'flex';
        postForm.style.display = 'none';
        logoutButton.style.display = 'none';
        postsDiv.innerHTML = '';
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsDiv.innerHTML = '';
        posts.forEach(post => {
            displayPost(post);
        });
    }

    function addPost(postText) {
        const post = {
            username: username,
            text: postText,
            comments: []
        };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPost(post);
    }

    function displayPost(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<strong>${post.username}</strong><p>${post.text}</p>`;

        const commentForm = document.createElement('form');
        commentForm.classList.add('comment-form');
        commentForm.innerHTML = `
            <input type="text" class="comment-input" placeholder="Write a comment...">
            <button type="submit">Comment</button>
        `;
        postDiv.appendChild(commentForm);

        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerText = `${comment.username}: ${comment.text}`;
            postDiv.appendChild(commentDiv);
        });

        postsDiv.appendChild(postDiv);

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentInput = commentForm.querySelector('.comment-input');
            const commentText = commentInput.value;
            if (commentText) {
                const comment = {
                    username: username,
                    text: commentText
                };
                post.comments.push(comment);
                localStorage.setItem('posts', JSON.stringify(JSON.parse(localStorage.getItem('posts')).map(p => {
                    if (p.text === post.text && p.username === post.username) {
                        p.comments = post.comments;
                    }
                    return p;
                })));
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerText = `${comment.username}: ${comment.text}`;
                postDiv.appendChild(commentDiv);
                commentInput.value = '';
            }
        });
    }
});