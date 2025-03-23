import { hexId, uuidv4 } from '@nikitababko/id-generator';
import './style.css';

const renderMarkup = () => {
    const app = document.querySelector<HTMLDivElement>('#app');
    if (!app) return;

    app.innerHTML = `
    <div class="container">
      <p id="id-value"></p>  
      
      <div class="control">
        <div class="buttons">
            <div class="length-select-container control-item">
              <div class="select">
                <select id="id-length-select">
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
        
          <button id="generate-button-container" class="control-item">
            <img src="/generate.svg" alt="Generate id button">
          </button>
          
          <button id="copy-button-container" class="control-item">
            <div class="copy-button-inner">
                <img src="/copy.svg" alt="Copy id button">
              
                <img src="/ok.svg" alt="" width="24px" height="24px">
            </div>
          </button>
        </div>
        
        <div class="segmented-control">
          <input 
            type="radio" 
            name="segmented-control-id-type" 
            id="radio-short" 
            value="short" 
            checked 
          />
          <label for="radio-short">hexId</label>
          
          <input 
            type="radio" 
            name="segmented-control-id-type" 
            id="radio-uuid" 
            value="uuid" 
          />
          <label for="radio-uuid">uuidv4</label>
        </div>
      </div>
    </div>
  `;
};

const handleGenerate = () => {
    const selected = document.querySelector<HTMLInputElement>(
        'input[name="segmented-control-id-type"]:checked',
    );
    const generateButtonContainer = document.querySelector<HTMLButtonElement>(
        '#generate-button-container',
    );
    const idLengthSelect = document.querySelector<HTMLSelectElement>(
        '#id-length-select',
    );

    const img = generateButtonContainer?.querySelector('img');

    if (img) {
        img.classList.toggle('rotate');
    }

    let value: string;
    if (selected?.value === 'short') {
        value = hexId(idLengthSelect?.value ? Number(idLengthSelect?.value) : 10);
    } else {
        value = uuidv4();
    }

    const idValue = document.getElementById('id-value');
    if (idValue) {
        idValue.textContent = value;
    }
};

const handleCopy = async () => {
    try {
        const idValue = document.getElementById('id-value');
        if (idValue?.textContent) {
            await navigator.clipboard.writeText(idValue.textContent);

            const copyButtonContainer = document.querySelector<HTMLButtonElement>(
                '#copy-button-container',
            );
            const copyButtonInner = copyButtonContainer?.querySelector(
                '.copy-button-inner',
            );
            if (copyButtonInner) {
                copyButtonInner.classList.add('copy-button-container-animation');
                copyButtonInner.addEventListener('animationend', function handler() {
                    copyButtonInner.classList.remove('copy-button-container-animation');
                    copyButtonInner.removeEventListener('animationend', handler);
                });
            }
        }
    } catch (error) {
        console.error('Failed to copy: ', error);
    }
};

const registerEventListeners = () => {
    const generateButtonContainer = document.querySelector<HTMLButtonElement>(
        '#generate-button-container',
    );
    generateButtonContainer?.addEventListener('click', handleGenerate);

    const copyButtonContainer = document.querySelector<HTMLButtonElement>(
        '#copy-button-container',
    );
    copyButtonContainer?.addEventListener('click', handleCopy);

    document.querySelectorAll('input[name="segmented-control-id-type"]').forEach(
        (radio) => {
            radio.addEventListener('change',
                () => {
                    const selected = document.querySelector<HTMLInputElement>(
                        'input[name="segmented-control-id-type"]:checked',
                    );
                    const lengthContainer = document.querySelector<HTMLDivElement>(
                        '.length-select-container',
                    );

                    if (selected?.value === 'uuid') {
                        lengthContainer?.classList.add('hidden');
                    } else {
                        lengthContainer?.classList.remove('hidden');
                    }

                    handleGenerate();
                },
            );
        });

    const idLengthSelect = document.querySelector<HTMLSelectElement>('#id-length-select');
    idLengthSelect?.addEventListener('change', handleGenerate);
};

const initApp = () => {
    renderMarkup();
    registerEventListeners();
    handleGenerate();

    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
    }
};

document.addEventListener('DOMContentLoaded', initApp);
