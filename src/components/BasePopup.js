export class BasePopup {
    /**
     * @param {string} id - Уникальный ID для элемента.
     * @param {string} title - Заголовок модального окна.
     * @param {HTMLElement} container - Контейнер для вставки (например, #popups-container).
     */
    constructor(id, title, container) {
        this.id = id;
        this.title = title;
        this.container = container;
        this.overlay = this.createOverlay();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.id = this.id;
        overlay.style.display = 'none';

        const content = document.createElement('div');
        content.className = 'popup-content';
        
        const h2 = document.createElement('h2');
        h2.textContent = this.title;
        content.appendChild(h2);

        // Вставка специфичного контента, который будет реализован в дочерних классах
        content.appendChild(this.renderContent());
        
        overlay.appendChild(content);
        this.container.appendChild(overlay);

        // Закрытие при клике по оверлею
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hide();
            }
        });

        return overlay;
    }

    /**
     * Метод, который должны реализовать дочерние классы для вставки формы/списка.
     */
    renderContent() {
        throw new Error("Метод renderContent должен быть реализован.");
    }

    show() {
        this.overlay.style.display = 'flex';
        // Дополнительный класс для анимации
        setTimeout(() => this.overlay.classList.add('visible'), 10);
    }

    hide() {
        this.overlay.style.display = 'none';
        this.overlay.classList.remove('visible');
    }
}