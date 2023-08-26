const firstLang = document.querySelector("#firstLang");
const secondLang = document.querySelector("#secondLang");
const firstText = document.querySelector("#firstText");
const secondText = document.querySelector("#secondText");
const buttonTrans = document.querySelector("#translateBtn");
const change_lang = document.querySelector("#change-lang");
const icons = document.querySelectorAll(".icons");
for (let langs in languages) {
  let option = `
  <option value="${langs}">${languages[langs]}</option>
  `;
  firstLang.insertAdjacentHTML("beforeend", option);
  secondLang.insertAdjacentHTML("beforeend", option);
  firstLang.value = "en-GB";
}

for (let icon of icons) {
  icon.addEventListener("click", (element) => {
    if (element.target.classList.contains("fa-copy")) {
      if (element.target.id == "from") {
        navigator.clipboard.writeText(firstText.value); // kopyalama kodu
      } else {
        navigator.clipboard.writeText(secondText.value);
      }
    } else {
      let utterance;
      if (element.target.id == "to") {
        utterance = new SpeechSynthesisUtterance(secondText.value);
        utterance.lang = secondLang.value;
      } else {
        utterance = new SpeechSynthesisUtterance(firstText.value);
        utterance.lang = firstLang.value;
      }
      speechSynthesis.speak(utterance);
    }
  });
}

buttonTrans.addEventListener("click", async () => {
  const from = firstText.value;
  const langOne = firstLang.value;
  const langTwo = secondLang.value;

  const api_url = `https://api.mymemory.translated.net/get?q=${from}&langpair=${langOne}|${langTwo}`;
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    secondText.value = data.responseData.translatedText;
  } catch (error) {}
});

change_lang.addEventListener("click", () => {
  let textOne = firstText.value;
  firstText.value = secondText.value;
  secondText.value = textOne;

  let langOne = firstLang.value;
  firstLang.value = secondLang.value;
  secondLang.value = langOne;
});
