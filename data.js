const cranes = [
    {
        id: 1,
        name: "SANY STC300T5",
        specs: ["Грузоподъёмность 30 т", "Стрела до 40 м"],
        price: "2 500",
        image: "crane.png",
        isFeatured: true
    },
    {
        id: 2,
        name: "LIEBHERR LTM 1070",
        specs: ["Грузоподъёмность 70 т", "Стрела до 50 м"],
        price: "4 800",
        image: "crane.png",
        isFeatured: true
    },
    {
        id: 3,
        name: "KATO NK-400E",
        specs: ["Грузоподъёмность 40 т", "Стрела до 36 м"],
        price: "2 900",
        image: "crane.png",
        isFeatured: true
    }
];


// Клик вне блока возвращает всё на место
document.addEventListener('click', function(e) {
    document.querySelectorAll('.messenger-popup').forEach(popup => {
        const btn = popup.previousElementSibling;
        if (!popup.contains(e.target) && btn && !btn.contains(e.target)) {
            popup.style.display = 'none';
            if (btn) btn.style.color = '';
        }
    });
});

const toggleBtn = document.getElementById('toggle-btn');
const pages = document.querySelectorAll('.slider-page');
let currentPage = 0;

// Добавляем проверку: если кнопка есть на странице, запускаем логику
if (toggleBtn) {
    toggleBtn.onclick = () => {
        // 1. Переключаем страницы
        if (pages.length > 0) {
            pages[currentPage].classList.remove('active');
            currentPage = (currentPage + 1) % pages.length;
            pages[currentPage].classList.add('active');
        }
        
        // 2. Двигаем кнопку (теперь только переворачиваем)
        toggleBtn.classList.toggle('rotated');
    };
}

