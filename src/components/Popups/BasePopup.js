// src/components/Popups/BasePopup.js

/**
 * Базовый класс для всех модальных окон (Popups).
 */
export class BasePopup {
    /**
     * @param {string} id - Уникальный ID для оверлея.
     * @param {string} title - Заголовок модального окна.
     * @param {HTMLElement} container - Контейнер, куда будет вставлен оверлей.
     */
    constructor(id, title, container) {
        this.id = id;
        this.title = title;
        this.container = container;
        this.overlay = null;

        this.renderOverlay();
        
        // Назначаем обработчик на кнопку отмены/закрытия
        this.overlay.querySelector('.cancel-btn').addEventListener('click', () => this.hide());
    }

    renderOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = `popup-overlay ${this.id}`;
        this.overlay.innerHTML = `
            <div class="popup-content">
                <h2>${this.title}</h2>
                <div class="popup-form-area">
                    ${this.renderContent()}
                </div>
                <div class="popup-actions">
                    <button class="save-btn" id="${this.id}-save-btn">Сохранить</button>
                    <button class="cancel-btn">Отмена</button>
                </div>
            </div>
        `;
        this.container.appendChild(this.overlay);

        // Чтобы контент не был кликабельным при клике на оверлей, используем делегирование
        this.overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-overlay')) {
                this.hide();
            }
        });
    }

    /**
     * Метод должен быть переопределен дочерними классами.
     * Возвращает HTML-контент, специфичный для данного Pop-up (формы, списки).
     */
    renderContent() {
        return '<p>Базовый контент Pop-up</p>';
    }

    show() {
        this.overlay.classList.add('visible');
    }

    hide() {
        this.overlay.classList.remove('visible');
        // Очистка формы при закрытии
        const form = this.overlay.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}