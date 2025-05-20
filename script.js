        const posts = [];
        const form = document.getElementById('postForm');
        const postsContainer = document.getElementById('postsContainer');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('postTitle').value.trim();
            const content = document.getElementById('postContent').value.trim();
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

            if (!title) {
                showError('titleError', 'Title is required');
                isValid = false;
            }

            if (!content) {
                showError('contentError', 'Content is required');
                isValid = false;
            }

            if (isValid) {
                const newPost = {
                    id: Date.now(),
                    title,
                    content,
                    timestamp: new Date().toLocaleString(),
                    replies: []
                };

                posts.unshift(newPost);
                renderPosts();
                form.reset();
            }
        });

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function createReplyElement(reply) {
            const div = document.createElement('div');
            div.className = 'post-card fade-in';
            div.innerHTML = `
                <div class="post-header">
                    <span class="post-author">${reply.author || 'Anonymous'}</span>
                    <span class="post-time">${reply.timestamp}</span>
                </div>
                <div class="post-content">${reply.content}</div>
            `;
            return div;
        }

        function renderPosts() {
            postsContainer.innerHTML = '';
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-card fade-in';
                postElement.innerHTML = `
                    <div class="post-header">
                        <h2>${post.title}</h2>
                        <span class="post-time">${post.timestamp}</span>
                    </div>
                    <div class="post-content">${post.content}</div>
                    <div class="reply-section">
                        <textarea class="reply-content" placeholder="Write a reply..." rows="2"></textarea>
                        <button class="btn reply-btn">Reply</button>
                    </div>
                    <div class="replies-container"></div>
                `;

                const replyButton = postElement.querySelector('.reply-btn');
                const replyContent = postElement.querySelector('.reply-content');
                const repliesContainer = postElement.querySelector('.replies-container');

                replyButton.addEventListener('click', () => {
                    const content = replyContent.value.trim();
                    if (content) {
                        const newReply = {
                            content,
                            timestamp: new Date().toLocaleString(),
                            author: 'User' + Math.floor(Math.random() * 1000)
                        };
                        post.replies.unshift(newReply);
                        repliesContainer.prepend(createReplyElement(newReply));
                        replyContent.value = '';
                    }
                });

                post.replies.forEach(reply => {
                    repliesContainer.appendChild(createReplyElement(reply));
                });

                postsContainer.appendChild(postElement);
            });
        }

        // Initial render
        renderPosts();