const loadPost = async (searchText = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    displayPost(data.posts);
}
const displayPost = (posts) => {
    const postsContainer = document.getElementById('posts-container')
    postsContainer.innerHTML = ''

    function delayedFunction() {
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.innerHTML = `
                    <div
                            class="mb-6 flex flex-col md:flex-row p-2 lg:p-10 bg-gray-100 hover:bg-[#eeeeff] border border-white hover:border-[#797DFC] duration-100 rounded-xl">
                            <div class="relative">
                                <img class="w-20 bg-white rounded-lg"src="${post?.image}" alt="">
                                <img class="absolute -top-2 lg:-top-2 left-16 lg:left-14" src="${post?.isActive ? './images/green.png' : './images/red.png'}" alt="">
                            </div>
                            <!-- card info section -->
                            <div class="w-full md:ml-5">
                                <div class="w-full">
                                    <div class="flex gap-3 text-sm">
                                        <p># ${post?.category}</p>
                                        <p>Author : ${post?.author?.name}</p>
                                    </div>
                                    <h5 class="text-lg font-medium">${post?.title}</h5>
                                    <p class="text-sm text-gray-500">${post?.description}</p>
                                    <hr class="border border-dashed border-gray-500 my-4">
                                    <div class="flex justify-between">
                                        <div class="flex items-center gap-2 md:gap-8">
                                            <div class="flex items-center gap-3">
                                                <img class="w-5 h-5" src="./images/message.png" alt="">
                                                <p class="text-gray-500">${post?.comment_count}</p>
                                            </div>
                                            <div class="flex items-center gap-3">
                                                <img class="w-7 h-7" src="./images/eye.png" alt="">
                                                <p class="text-gray-500">${post?.view_count}</p>
                                            </div>
                                            <div class="flex items-center gap-3">
                                                <img class="w-5 h-5" src="./images/clock.png" alt="">
                                                <p class="text-gray-500">${post?.posted_time} min</p>
                                            </div>
                                        </div>
                                        <button onClick="handleMark('${post?.id}')"><img class="w-6 h-6" src="./images/email.png" alt=""></button>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
            postsContainer.appendChild(postCard);
        })
        if (posts.length === 0) {
            loadingSkeleton(true);
        }
        else {
            loadingSkeleton(false);
        }
    }
    setTimeout(delayedFunction, 1500);
}

const handleSearch = () => {
    loadingSkeleton(true);
    const searchField = document.getElementById('search-text');
    const searchFieldText = searchField.value;
    loadPost(searchFieldText);
}

const loadingSkeleton = (isLoading) => {
    const skeleton = document.getElementById('skeleton');
    if (isLoading) {
        skeleton.classList.remove('hidden')
    }
    else {
        skeleton.classList.add('hidden')
    }
}
const handleMark = (id) => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
        .then(res => res.json())
        .then(data => {
            const posts = data.posts;
            const singlePost = posts.find(post => post.id === parseInt(id))
            showMarkPost(singlePost);
        })
}

const showMarkPost = (post) => {
    const markPostCount = document.getElementById('mark-post-count');
    markPostCount.innerText = parseInt(markPostCount.innerText) + 1
    const markContainer = document.getElementById('mark-container');
    const markTitle = document.createElement('div');
    markTitle.innerHTML = `
        <div class="mt-3 flex justify-between items-center bg-white rounded-lg p-3 md:gap-1">
            <div class="">
                <p class="">${post?.title}</p>
            </div>
            <div class="w-32 flex items-center gap-2">
                <img src="./images/eye.png" alt="">
                <span>${post?.view_count}</span>
            </div>
        </div>
    `
    markContainer.appendChild(markTitle);
}

loadPost();

const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data);

}
const displayLatestPost = (posts) => {
    const latestPosts = document.getElementById('latest-post');
    posts.forEach((post) => {
        const postLatestCard = document.createElement('div');
        postLatestCard.innerHTML = `
                <div class="border p-5 rounded-2xl">
                    <div class="">
                        <img class="rounded-2xl" src="${post?.cover_image}"
                            alt="">
                    </div>
                    <div class="flex gap-2 items-center mt-4">
                        <img src="./images/calender.png" alt="">
                        <span class="text-gray-500 text-sm">${post?.author?.posted_date ? post?.author?.posted_date : 'No publish date'}</span>
                    </div>
                    <h4 class="text-lg font-semibold mt-1">${post?.title}</h4>
                    <p class="text-sm mt-1 text-gray-500">${post?.description}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <img class="w-12 rounded-full"
                            src="${post?.profile_image}" alt="">
                        <div class="">
                            <h5 class="font-semibold">${post?.author?.name}</h5>
                            <span class="text-sm">${post?.author?.designation ? post?.author?.designation : 'Unknown'}</span>
                        </div>
                    </div>
                </div>
    `
        latestPosts.appendChild(postLatestCard);
    })

}
loadLatestPost();