const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active')
  })
 
 if (close) {
   close.addEventListener('click', () => {
     nav.classList.remove('active')
   })
 }
}
// logic
// JavaScript for responsive search bar
const searchBar = document.querySelector('#search-bar');
const searchInput = document.querySelector('#search-bar input[type="text"]');

searchBar.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        searchInput.style.width = '200px'; // Adjust the width as needed
        searchInput.focus();
    }
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target !== searchInput && e.target !== searchBar) {
        searchInput.style.width = '0';
    }
});
