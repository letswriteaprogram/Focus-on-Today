const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputFilds = document.querySelectorAll(".goal-input");
const errorLable = document.querySelector(".error-lable");
const progressBarValue = document.querySelector(".progress-bar-value");
const progressBarLable = document.querySelector(".progress-bar-lable");

allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

inputFilds.forEach((input) => {
  let inputId = input.parentElement.id;

  input.value = allGoals[inputId]?.name || null;

  input.addEventListener("input", () => {
    if (allGoals[inputId]?.completed || false) {
      input.value = allGoals[inputId].name;
      return;
    }

    allGoals[inputId] = { name: input.value, completed: false };
    setDataInlocalStorage(allGoals);
    if (allInputFieldFilled()) {
      errorLable.classList.remove("show");
    } else {
      errorLable.classList.add("show");
    }
  });
});

checkboxList.forEach((checkbox) => {
  let checkboxId = checkbox.parentElement.id;

  if (allGoals[checkboxId]?.completed || false) {
    checkbox.parentElement.classList.add("active");
  }

  checkbox.addEventListener("click", (e) => {
    if (allInputFieldFilled()) {
      allGoals[checkboxId].completed =
        checkbox.parentElement.classList.toggle("active");
      setDataInlocalStorage(allGoals);
      setProgressBarValue();
      errorLable.classList.remove("show");
    } else {
      errorLable.classList.add("show");
    }
  });
});

const setDataInlocalStorage = function (data) {
  data = JSON.stringify(data);
  localStorage.setItem("allGoals", data);
};

const allInputFieldFilled = function () {
  return [...inputFilds].every((input) => {
    return input.value;
  });
};

Object.values(allGoals).filter((goal) => {
  return goal.completed;
});

const setProgressBarValue = function () {
  noAllGoals = Object.values(allGoals).length;

  noCompletedGoals = Object.values(allGoals).filter((goal) => {
    return goal.completed;
  }).length;

  progressBarValue.querySelector(
    "p"
  ).innerText = `${noCompletedGoals} /${noAllGoals} Completed`;

  progressBarValue.style.width = `${(noCompletedGoals / noAllGoals) * 100}%`;

  allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "wow! You just completed all the goals, time for chill",
  ];
  progressBarLable.innerText = allQuotes[noCompletedGoals];
};
setProgressBarValue();
