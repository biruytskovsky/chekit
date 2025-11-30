export class Chart {
    /**
     * @param {HTMLElement} containerElement - Элемент куда будет вставлен график
     */
    constructor(containerElement) {
        this.container = containerElement;
    }

    /**
     * Рендерит график на основе распределения расходов.
     * @param {{category: string, amount: number, percent: number}[]} distribution
     */
    render(distribution) {
        this.container.innerHTML = ''; 

        if (distribution.length === 0) {
            this.container.innerHTML = '<p style="text-align: center; color: var(--color-text-light);">Нет данных о расходах за этот месяц.</p>';
            return;
        }

        distribution.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'chart__bar-wrapper'; 

            
            const label = document.createElement('span');
            label.className = 'chart__bar-label'; 
            label.textContent = item.category;

            
            const visual = document.createElement('div');
            visual.className = 'chart__bar-visual'; 
            
            const fill = document.createElement('div');
            fill.className = 'chart__bar-fill'; 
            fill.style.width = `${item.percent > 100 ? 100 : item.percent}%`; 

            visual.appendChild(fill);

            
            const percent = document.createElement('span');
            percent.className = 'chart__bar-percent'; 
            percent.textContent = `${Math.round(item.percent)}%`;

            wrapper.appendChild(label);
            wrapper.appendChild(visual);
            wrapper.appendChild(percent);

            this.container.appendChild(wrapper);
        });
    }
}