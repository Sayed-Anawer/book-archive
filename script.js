// Using arrow function to fetch data 
const searchBook = () => {
  const searchField = document.getElementById("searchInput");

  const inputText = searchField.value;

  // checking searchInput feild empty or not.
  if (inputText === "") {
    document.getElementById("check1").classList.remove("invisible");
  } else {
    document.getElementById("check1").classList.add("invisible");
    searchField.value = "";
    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => loadData(data));
  }
};

const loadData = (data) => {
  // How many results are found
  const resultShow = document.getElementById("show-result");
  resultShow.textContent = ``;

  // Using Slice for display 30 only data
  const bookList = data.docs.slice(0, 30);
  const h5 = document.createElement("h5");

  // checking if user give invalid book name
  if (data.numFound === 0) {
    h5.classList.add("text-center");
    h5.innerHTML = `<span class="text-danger">Please Enter Valid Book Name</span><br>Search result found ${data.numFound}`;
  } else {
    h5.classList.add("text-center");
    h5.innerHTML = `Search result found ${data.numFound} <br> Showing result ${bookList.length}`;
  }

  // Here display the result by using appendChild
  resultShow.appendChild(h5);

  // Creating mainCard is to display our data in card
  const mainCard = document.getElementById("main-card");

  mainCard.textContent = ``;

  // Here using forEach for showing all books in the bookLlist.
  bookList.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100">
        <!--Book Image-->
              <img class="h-75" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="...">
              <div class="card-body">
              <!--Book Title-->
                  <h3 class="card-title"> ${book.title}</h3>
              <!--Book Author Name-->
                  <h5 class="card-text"><b>Author:</b> ${book.author_name}
                   </h5>
              <!--Book Publish Year-->
                   <h5 class="card-text"><b>Publish Years:</b> ${book.publish_year}
              <!--Book First Publish Year-->
                   <h5 class="card-text"><b>First Publish Year:</b> ${book.first_publish_year}
                   </h5>
              <!--Book Publisher-->
                   <h5 class="card-text"><b>Publisher:</b> ${book.publisher}
                   </h5>
              </div>
      </div>
      `;
// Here display the book cards. 
    mainCard.appendChild(div);
  });
};
