/**
 * Templating html-code using handlebars templater for order.
 */
export const renderOrderView = () => window.Handlebars.compile(`
<div class="background">
    <div class="order"> 
        <div class="order__text">
            <h1> Спасибо! Ваш заказ принят. </h1>
            <h2> Наши повара начали его готовить. </h2>
            <h2> Примерное время ожидания составляет 42 минуты! </h2>
        </div>
    </div>
</div>
`);
