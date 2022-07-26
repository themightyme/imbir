class QuickQuestionnaire {
    constructor(props) {
        this.form = document.getElementById('formQuickQuestionnaire');
        this.radioInputs = document.querySelectorAll('#formQuickQuestionnaire fieldset input[type=radio]');
        this.dots = document.querySelectorAll('#formQuickQuestionnaire .test__dots_dot');
        this.resultTemplate_1 = `
<div class="result_one">
    <div class="result_one__title">Вам, скорее всего, нужна охватная рекламная кампания.
        Мы готовы предложить вам разработку стратегии продвижения.
        Оставьте свои контакты, и мы с вами свяжемся.
    </div>
    <div class="result_one__form">
        <div>
            <input name="user_name" required placeholder="Ваше имя" type="text">
        </div>
        <div>
            <input name="user_phone" required placeholder="Номер телефона" type="tel">
        </div>
        <div>
            <input name="user_email" required placeholder="Ваш e-mail" type="email">
        </div>
        <button class="button button_submit" type="button">Отправить заявку</button>
    </div>
</div>
    `;
        this.resultTemplate_2 = `
 <div class="result_two">
    <div class="result_two__title">
        Поздравляем! Вам определенно подойдет спецпроект. Выберите ваш подарок:
    </div>
    <div>
        <input id="adsPlatformPromotion" type="radio" name="presentType" value="adsPlatformPromotion"/>
        <label for="adsPlatformPromotion">Продвижение в Яндексе на сумму 100 BYN</label>
    </div>
    <div>
        <input id="sloganDevelopment" type="radio" name="presentType" value="sloganDevelopment"/>
        <label for="sloganDevelopment">Разработка слогана</label>
    </div>
    <div>
        <input id="adsAdaptationForPlatforms" type="radio" name="presentType" value="adsAdaptationForPlatforms"/>
        <label for="adsAdaptationForPlatforms">Адаптация рекламных материалов согласно техническим требованиям площадок
        </label>
    </div>
    <div><input id="adsCommunicationAudit" type="radio" name="presentType" value="adsCommunicationAudit"/>
        <label for="adsCommunicationAudit">Аудит рекламной коммуникации</label>
    </div>
    <div id="presentsFinalMessageContainer"></div>
</div>
    `;
        this.resultTemplate_3 = `
<div class="result_final" id="finalMessage">
    <div>
        <p class="result_final__title">Отлично! Мы уже готовы с вами обсудить спецпроект! <br> 
        Введите ваш номер и нажмите “Перезвоните мне”</p>
    </div>
    <div>
        <input type="tel" name="phoneNumber" placeholder="Введите номер телефона" id="phoneNumber"/>
    </div>
    <div>
        <button type="button" id="sendNumber">Перезвоните мне</button>
    </div>
</div>
    `;
    }

    addFinalMessage() {
        document.getElementById('presentsFinalMessageContainer').innerHTML = this.resultTemplate_3;
    }

    initPresentTypeChange() {
        if (document.querySelector('[name="presentType"]')) {
            document.querySelectorAll('[name="presentType"]').forEach((el) => {
                el.addEventListener('change', () => {
                    if (!document.getElementById('finalMessage')) {
                        this.addFinalMessage();
                    }
                })
            })
        }
    }

    onSubmitResults() {
        const promotionPlansValue = document.querySelector('#formQuickQuestionnaire [name="promotionPlans"]:checked').value;
        const promotionPresentsValue = document.querySelector('#formQuickQuestionnaire [name="promotionPresents"]:checked').value;
        document.querySelector('#questionsContainer').classList.add('hidden');
        document.querySelector('#formQuickQuestionnaire .test__dots').classList.add('hidden');
        if (promotionPlansValue === 'broadTargetAudienceCapture' && promotionPresentsValue === 'presentsNo') {
            document.querySelector('#questionnaireResults').innerHTML = this.resultTemplate_1;
        } else if (promotionPlansValue === 'communicationWithAudience' || promotionPresentsValue === 'presentsYes') {
            document.querySelector('#questionnaireResults').innerHTML = this.resultTemplate_2;
            this.initPresentTypeChange();
        } else {
            document.querySelector('#questionnaireResults').innerHTML = this.resultTemplate_1;
        }
    }

    onChangeRadioInputs(event) {
        const itemId = event.target.closest('fieldset').getAttribute('id');
        const dot = document.querySelector('[data-target="#' + itemId + '"]');
        event.target.closest("fieldset").nextElementSibling && event.target.closest('fieldset').classList.remove('active');
        event.target.closest("fieldset").nextElementSibling && event.target.closest("fieldset").nextElementSibling.classList.add('active');
        dot.nextElementSibling && dot.classList.remove('active');
        dot.nextElementSibling && dot.nextElementSibling.classList.add('active');
        if (document.querySelectorAll('#formQuickQuestionnaire fieldset').length ===
            document.querySelectorAll('#formQuickQuestionnaire input[type=radio]:checked').length) {
            this.onSubmitResults();
        }
    }

    changeFieldSet(event) {
        document.querySelectorAll('#formQuickQuestionnaire .test__dots_dot, #formQuickQuestionnaire fieldset').forEach((el) => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        document.querySelector(event.target.getAttribute('data-target')).classList.add('active');
    }

    initEvents() {
        for (const el of this.radioInputs) {
            el.addEventListener('change', (event) => {
                this.onChangeRadioInputs(event)
            })
        }
        for (const el of this.dots) {
            el.addEventListener('click', (event) => {
                this.changeFieldSet(event)
            });
        }
    }

    init() {
        this.initEvents();
    }

}

const quickQuestionnaire = new QuickQuestionnaire();
quickQuestionnaire.init();