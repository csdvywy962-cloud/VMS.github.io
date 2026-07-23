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

import { db } from './firebase-init.js'; // Убедись, что путь к файлу верный
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

export async function renderCranes(containerId, filterOnlyFeatured, category = null, limit = null)  {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "Загрузка...";

    const querySnapshot = await getDocs(collection(db, "tech"));
    container.innerHTML = "";

    let count = 0;

    querySnapshot.forEach((doc) => {
        const crane = doc.data();

        // 1. Фильтр для главной
        if (filterOnlyFeatured && !crane.showOnHome) return;

        // 2. Фильтр по категории (если мы указали категорию)
        if (category && crane.type.toLowerCase() !== category.toLowerCase()) return;

        if (category && (crane.type || '').toLowerCase() !== category.toLowerCase()) return;

        if (limit && count >= limit) return;

        // 3. Создание HTML-карточки
        const cardHTML = `
            <div class="crane-card2">
                <div class="card-header2">
                    <span class="category-badge">${crane.type || 'ТЕХНИКА'}</span>
                    <div class="image-box">
                        <img src="${crane.image || 'default-crane.jpg'}" alt="${crane.name}">
                    </div>
                </div>
                <div class="card-body">
                    <h3>${crane.name}</h3>
                    <ul class="specs">
                        <li>${crane.desc || 'Описание отсутствует'}</li>
                    </ul>
                    <div class="divider"></div>
                    <div class="price-row">
                        <span class="price">от ${crane.price} руб./час</span>
                        <button class="btn-red-small" onclick="showRandomPhone(this)">Заказать</button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
        count++;
    });
}

window.showRandomPhone = function(btn) {
    const phones = [
        "+7 (915) 909-06-07",
        "+7 (920) 384-55-55",
        "+7 (910) 806-88-48"
    ];
    // Выбираем случайный номер
    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    
    // Создаем или находим элемент с номером под кнопкой
    let parent = btn.parentElement;
    let popup = parent.querySelector('.phone-popup');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'phone-popup';
        popup.style.cssText = 'position: absolute; bottom: 100%; right: 0; margin-bottom: 8px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 100; text-align: center;';
        parent.style.position = 'relative';
        parent.appendChild(popup);
    }
    
    popup.innerHTML = `<a href="tel:${randomPhone.replace(/[^\d+]/g, '')}" style="color: #111; font-weight: 600; font-size: 14px; text-decoration: none; display: block;">${randomPhone}</a>`;
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
};

window.toggleMessengers = function(btn) {
    console.log("Кнопка нажата!"); // Проверяем, доходит ли клик
    
    const parent = btn.closest('.consultation-actions');
    if (!parent) {
        console.log("Родительский элемент .consultation-actions не найден!");
        return;
    }
    
    const popup = parent.querySelector('.messenger-popup');
    if (!popup) {
        console.log("Элемент .messenger-popup не найден!");
        return;
    }
    
    // Закрываем остальные
    document.querySelectorAll('.messenger-popup').forEach(m => {
        if (m !== popup) m.style.display = 'none';
    });
    
    // Переключаем показ
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'flex';
    }
};

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
