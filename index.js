const apiKey = "2381c3c9c7dc4daea5110196517dbab5"

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;

  } catch (error) {
    console.error("Error Fetching random news", error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCart = document.createElement("div")

    blogCart.classList.add("blog-card")
    const img = document.createElement("img")
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const description = document.createElement("p")
    description.textContent = article.description;

    blogCart.appendChild(img);
    blogCart.appendChild(title);
    blogCart.appendChild(description);
    blogContainer.appendChild(blogCart);

  })
}


(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error Fetching random news", error);
  }
})();