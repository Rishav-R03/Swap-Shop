const profileImage = document.getElementById("profile-image");
const profileUpload = document.getElementById("profile-upload");
const profileForm = document.getElementById("profile-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");


let userData = {
    username: "SHREYA",
    email: "shreya.k@gmail.com",
    profileImageURL: "default-profile.jpg",
};

profileImage.src = userData.profileImageURL;
usernameInput.value = userData.username;
emailInput.value = userData.email;

profileUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userData.username = usernameInput.value;
    userData.email = emailInput.value;

    
    alert("Profile Updated!\nUsername: " + userData.username + "\nEmail: " + userData.email);
});
