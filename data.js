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


window.showRandomPhone = function(btn) {
    const phones = [
        "+7 (915) 909-06-07",
        "+7 (920) 384-55-55",
        "+7 (910) 806-88-48"
    ];
    // Выбираем случайный номер
    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    
   btn.innerText = randomPhone;
};
window.expandMessengerBtn = function(btn) {
    if (typeof event !== 'undefined') event.stopPropagation();
    
    const textSpan = btn.querySelector('.btn-text');
    const iconsSpan = btn.querySelector('.messenger-icons');
    
    // Если уже открыта — ничего не делаем
    if (btn.classList.contains('active')) return;
    
    // Закрываем другие, если есть
    document.querySelectorAll('.btn-whatsapp.active').forEach(b => {
        b.classList.remove('active');
        b.querySelector('.btn-text').style.display = 'inline';
        b.querySelector('.messenger-icons').style.display = 'none';
    });
    
    // Раскрываем текущую
    btn.classList.add('active');
    textSpan.style.display = 'none';
    iconsSpan.style.display = 'flex';
};

// Клик вне кнопки возвращает её в исходное состояние
document.addEventListener('click', function(e) {
    const activeBtn = document.querySelector('.btn-whatsapp.active');
    if (activeBtn && !activeBtn.contains(e.target)) {
        activeBtn.classList.remove('active');
        activeBtn.querySelector('.btn-text').style.display = 'inline';
        activeBtn.querySelector('.messenger-icons').style.display = 'none';
    }
});
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

