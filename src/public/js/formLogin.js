console.log("ejecutanfo formlogin");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    user: e.target.user.value,
    password: e.target.password.value,
  };
  console.log(user);
  //post user
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      window.location.href = "/";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
});
