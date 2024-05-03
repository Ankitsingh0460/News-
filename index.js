const apiKey = "2381c3c9c7dc4daea5110196517dbab5"

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;

  } catch (error) {
    console.error("Error Fetching random news", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query)
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by Query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;

  } catch (error) {
    console.error("Error Fetching random news", error);
    return [];
  }
}

//function

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCart = document.createElement("div")

    blogCart.classList.add("blog-card")
    const img = document.createElement("img")
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const Truncated = article.title.length > 30 ?
      article.title.slice(0, 30) + "...." :
      article.title;
    title.textContent = Truncated;
    const description = document.createElement("p")
    description.textContent = article.description;

    blogCart.appendChild(img);
    blogCart.appendChild(title);
    blogCart.appendChild(description);
    blogCart.addEventListener("click", () => {
      window.open(article.url, "_blank");


    })
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