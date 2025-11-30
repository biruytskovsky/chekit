// src/components/Chart.js

/**
 * Компонент для рендеринга столбчатой диаграммы расходов.
 * Использует чистый HTML/CSS для визуализации (БЭМ: chart__...).
 */
export class Chart {
    /**
     * @param {HTMLElement} containerElement - Элемент, куда будет вставлен график.
     */
    constructor(containerElement) {
        this.container = containerElement;
    }

    /**
     * Рендерит график на основе распределения расходов.
     * @param {{category: string, amount: number, percent: number}[]} distribution
     */
    render(distribution) {
        this.container.innerHTML = ''; // Очистка перед рендерингом

        if (distribution.length === 0) {
            this.container.innerHTML = '<p style="text-align: center; color: var(--color-text-light);">Нет данных о расходах за этот месяц.</p>';
            return;
        }

        distribution.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'chart__bar-wrapper'; // БЭМ

            // 1. Название категории
            const label = document.createElement('span');
            label.className = 'chart__bar-label'; // БЭМ
            label.textContent = item.category;

            // 2. Визуальная полоса
            const visual = document.createElement('div');
            visual.className = 'chart__bar-visual'; // БЭМ
            
            const fill = document.createElement('div');
            fill.className = 'chart__bar-fill'; // БЭМ
            fill.style.width = `${item.percent > 100 ? 100 : item.percent}%`; 

            visual.appendChild(fill);

            // 3. Процент
            const percent = document.createElement('span');
            percent.className = 'chart__bar-percent'; // БЭМ
            percent.textContent = `${Math.round(item.percent)}%`;

            wrapper.appendChild(label);
            wrapper.appendChild(visual);
            wrapper.appendChild(percent);

            this.container.appendChild(wrapper);
        });
    }
}