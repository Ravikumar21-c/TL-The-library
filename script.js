// 📚 BOOK CONTAINER (Easy to add more books)
const books = [
    {
        name: "JavaScript Basics",
        author: "John Doe",
        libraryRent: 30,
        homeRent: 80,
        buy: 299
    },
    {
        name: "Advanced JavaScript",
        author: "Kyle Simpson",
        libraryRent: 35,
        homeRent: 90,
        buy: 349
    },
    {
        name: "HTML & CSS Mastery",
        author: "Jane Smith",
        libraryRent: 25,
        homeRent: 70,
        buy: 249
    },
    {
        name: "React for Beginners",
        author: "Dan Abramov",
        libraryRent: 40,
        homeRent: 100,
        buy: 399
    },
    {
        name: "Node.js Complete Guide",
        author: "Andrew Mead",
        libraryRent: 45,
        homeRent: 120,
        buy: 449
    },
    {
        name: "Competitive Exams Guide",
        author: "Arihant",
        libraryRent: 40,
        homeRent: 100,
        buy: 399
    },
    {
        name: "UPSC General Studies",
        author: "McGraw Hill",
        libraryRent: 60,
        homeRent: 150,
        buy: 699
    },
    {
        name: "SSC Mathematics",
        author: "Rakesh Yadav",
        libraryRent: 35,
        homeRent: 90,
        buy: 299
    },
    {
        name: "Physics for IIT-JEE",
        author: "H.C. Verma",
        libraryRent: 50,
        homeRent: 130,
        buy: 599
    },
    {
        name: "Organic Chemistry",
        author: "Morrison & Boyd",
        libraryRent: 55,
        homeRent: 140,
        buy: 649
    },
    {
        name: "Basic Mathematics",
        author: "R.D. Sharma",
        libraryRent: 65,
        homeRent: 119,
        buy: 759
    }
];



const phone = "7004495145";
let selectedSeat = "";

const seatsDiv = document.getElementById("seats");

// Create seats
for (let i = 1; i <= 20; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.innerText = "S" + i;
    seat.onclick = () => selectSeat(seat.innerText, seat);
    seatsDiv.appendChild(seat);
}

function selectSeat(seatNo, el) {
    document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
    el.classList.add("selected");
    selectedSeat = seatNo;
}

function bookSeat() {
    const name = document.getElementById("name").value;
    const slot = document.getElementById("timeSlot").value;

    if (!name || !slot || !selectedSeat) {
        alert("Please fill all details");
        return;
    }

    const [time, price] = slot.split("|");

    const msg = `
📚 Library Seat Booking

Name: ${name}
Seat: ${selectedSeat}
Time Slot: ${time}
Charge: ₹${price}
`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

function sendBookRequest() {
    const type = document.getElementById("bookType").value;

    if (!selectedBook || !type) {
        alert("Please select a book and option");
        return;
    }

    const msg = `
📚 Book Request

Book: ${selectedBook}
Type: ${type}
`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}
///price adding and updating section
function updateBookPrice() {
    const book = document.getElementById("book").value;
    const type = document.getElementById("bookType").value;
    const priceBox = document.getElementById("bookPrice");

    if (!book || !type) {
        priceBox.innerText = "";
        return;
    }

    let price = 0;

    if (type === "library") {
        price = bookCatalog[book].libraryRent;
        priceBox.innerText = `📖 Library Study Rent: ₹${price} / day`;
    }

    if (type === "home") {
        price = bookCatalog[book].homeRent;
        priceBox.innerText = `🏠 Home Rent: ₹${price} / week`;
    }

    if (type === "buy") {
        price = bookCatalog[book].buy;
        priceBox.innerText = `🛒 Buy Price: ₹${price}`;
    }
}

/// SEND BOOK REQUEST
function sendBookRequest() {
    if (!selectedBook) {
        alert("Please select a book");
        return;
    }

    const type = document.getElementById("bookType").value;
    if (!type) {
        alert("Please select rent/buy option");
        return;
    }

    let priceLine = "";
    if (type === "library")
        priceLine = `Library Rent: ₹${selectedBook.libraryRent} / day`;

    if (type === "home")
        priceLine = `Home Rent: ₹${selectedBook.homeRent} / week`;

    if (type === "buy")
        priceLine = `Buy Price: ₹${selectedBook.buy}`;

    const msg = `
📚 Book Request

Book: ${selectedBook.name}
Author: ${selectedBook.author}
Option: ${type.toUpperCase()}
${priceLine}
`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}





/// BOOK SELECTION AND SEARCH
let selectedBook = null;
const bookListDiv = document.getElementById("bookList");

// Load all books
function loadBooks(list = books) {
    bookListDiv.innerHTML = "";

    list.forEach((book, index) => {
        const div = document.createElement("div");
        div.className = "book-item";
        div.innerHTML = `
      <b>${book.name}</b><br>
      <small>${book.author}</small>
    `;
        div.onclick = () => selectBook(book);
        bookListDiv.appendChild(div);
    });
}

// Select book
function selectBook(book) {
    selectedBook = book;

    document.querySelectorAll(".book-item").forEach(el =>
        el.classList.remove("selected")
    );

    event.target.closest(".book-item").classList.add("selected");
    updateBookPrice();
}

// Search book
function searchBooks() {
    const value = document.getElementById("searchBook").value.toLowerCase();

    const filtered = books.filter(book =>
        book.name.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value)
    );

    loadBooks(filtered);
}

// Show price
function updateBookPrice() {
    const type = document.getElementById("bookType").value;
    const priceBox = document.getElementById("bookPrice");

    if (!selectedBook || !type) {
        priceBox.innerText = "";
        return;
    }

    if (type === "library")
        priceBox.innerText = `📖 Library Study Rent: ₹${selectedBook.libraryRent} / day`;

    if (type === "home")
        priceBox.innerText = `🏠 Home Rent: ₹${selectedBook.homeRent} / week`;

    if (type === "buy")
        priceBox.innerText = `🛒 Buy Price: ₹${selectedBook.buy}`;
}
