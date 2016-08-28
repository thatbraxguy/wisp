export const setupUI = () => {
  const UI = document.getElementById('UI');
  const button = document.getElementById('MainBut');

  button.addEventListener('click', () => {
    console.log("Button Clicked!");
  });
  UI.appendChild(button);
};

export default setupUI;
