const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const body = JSON.stringify({ username, email, password });
  console.log("body", body);

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("response", response);
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};
if (document.querySelector(".login-form")) {
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
} else {
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
}
