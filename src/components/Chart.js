/**
 * Компонент для рендеринга столбчатой диаграммы расходов.
 * Использует чистый HTML/CSS для визуализации.
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
            this.container.innerHTML = '<p style="text-align: center; color: #757575;">Нет данных о расходах за этот месяц.</p>';
            return;
        }

        distribution.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'chart-bar-wrapper';

            // 1. Название категории
            const label = document.createElement('span');
            label.className = 'chart-bar-label';
            label.textContent = item.category;

            // 2. Визуальная полоса
            const visual = document.createElement('div');
            visual.className = 'chart-bar-visual';
            
            const fill = document.createElement('div');
            fill.className = 'chart-bar-fill';
            // Ограничиваем максимальную ширину для визуального баланса, но используем рассчитанный процент
            fill.style.width = `${item.percent > 100 ? 100 : item.percent}%`; 

            visual.appendChild(fill);

            // 3. Процент
            const percent = document.createElement('span');
            percent.className = 'chart-bar-percent';
            percent.textContent = `${item.percent}%`;

            wrapper.appendChild(label);
            wrapper.appendChild(visual);
            wrapper.appendChild(percent);

            this.container.appendChild(wrapper);
        });
    }
}