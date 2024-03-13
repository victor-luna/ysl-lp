window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#cadastroForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const telefoneInput = document.getElementById('telefone');
  const newsletterCheckboxInput = document.getElementById('newsletter');
  const submitButton = document.querySelector('.section1__submit button');
  const countdownElement = document.querySelector('#countdown');

  const maskNameInput = () => {
    if (nomeInput) {
      IMask(nomeInput, {
        mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/,
      });
    }
  };

  const maskPhoneInput = () => {
    if (telefoneInput) {
      IMask(telefoneInput, {
        mask: '(00) 00000-0000',
      });
    }
  };

  function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 2, 31, 23, 59, 0);
    const timeDifference = targetDate - now;

    let days = 0
    let hours = 0
    let minutes = 0

    if (timeDifference > 0) {
      days = String(
        Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      ).padStart(2, '0');
      hours = String(
        Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      ).padStart(2, '0');
      minutes = String(
        Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, '0');
    } 

    countdownElement.innerHTML = `
      <div style="display: flex;">   
        <div>
          <div style="font-family: 'ITCAvantGardeStd-Demi">${days}</div>
          <div style="font-size: 23.35px; letter-spacing: 2.33px;">dias</div>        
        </div>
        <div style="margin: 0 10px;">:</div>
        <div>
          <div style="font-family: 'ITCAvantGardeStd-Demi">${hours}</div>
          <div style="font-size: 23.35px; letter-spacing: 2.33px;">horas</div>
        </div>
        <div style="margin: 0 10px;">:</div>
        <div>
          <div style="font-family: 'ITCAvantGardeStd-Demi">${minutes}</div>
          <div style="font-size: 23.35px; letter-spacing: 2.33px;">minutos</div>
        </div>
      </div>`
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;
    const newsletterChecked = newsletterCheckboxInput.checked;

    if (!nome || !telefone || !email) {
      return;
    }

    submitButton.innerText = 'Enviando...';
    submitButton.disabled = true;
    submitButton.style.pointerEvents = 'none';

    const fields = {
      Nome: nome,
      Telefone: telefone,
      Email: email,
      Optin_comunicacoes: newsletterChecked ? 'true' : 'false',
    };

    const data = JSON.stringify({
      deName: "tb_LP_MYSLF",
      fields
    });

    try {
      const response = await fetch('https://mc23wlq3mtfm1mbytpdvsrv-6kc4.pub.sfmc-content.com/cw5s1tgdas2', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Erro no envio dos dados');
      }

      const responseData = await response.json();

      if (responseData.statusCode === 400) {
        Swal.fire('Ops!', 'E-mail já cadastrado!', 'error');
      } else if (responseData.statusCode === 500) {
        Swal.fire('Ops!', 'Revise seus dados e tente novamente!', 'error');
      } else {
        Swal.fire('Cadastro realizado com sucesso!', '', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Ops!', error.message, 'error');
    } finally {
      submitButton.innerText = 'Cadastre-se';
      submitButton.disabled = false;
      submitButton.style.pointerEvents = 'auto';
    }
  });

  maskNameInput();
  maskPhoneInput();
  updateCountdown();

  // Update the countdown every 10 seconds
  setInterval(updateCountdown, 10000);
});
