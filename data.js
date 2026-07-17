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
                        <button class="btn-red-small">Заказать</button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
        count++;
    });
}

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