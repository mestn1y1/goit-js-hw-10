import iziToast from 'izitoast';

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('.input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const delayPromise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  delayPromise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });
});
