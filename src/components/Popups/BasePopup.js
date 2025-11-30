/**
 * Базовый класс для всех модальных окон
 */
export class BasePopup {
    /**
     * @param {string} id 
     * @param {string} title 
     * @param {HTMLElement} container 
     */
    constructor(id, title, container) {
        this.id = id;
        this.title = title;
        this.container = container;
        this.overlay = null;

        this.renderOverlay();
        
        
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

        this.overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-overlay')) {
                this.hide();
            }
        });
    }

    renderContent() {
        return '<p>Базовый контент Pop-up</p>';
    }

    show() {
        this.overlay.classList.add('visible');
    }

    hide() {
        this.overlay.classList.remove('visible');
        const form = this.overlay.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}