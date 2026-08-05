// Global Search Filter Logic for Tools Grid
function filterTools() {
    const input = document.getElementById('toolSearch');
    if (!input) return;

    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const description = card.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(filter) || description.includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
