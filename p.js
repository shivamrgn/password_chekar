function checkStrength() {
    const pw = document.getElementById("password").value;
    let score = 0;
    let feedback = [];

    if (pw.length > 10) score += 40;
    else if (pw.length >= 6) score += 20;
    else feedback.push("➤ Use at least 6 characters");

   
    if (/[a-z]/.test(pw)) score += 10;
    else feedback.push("➤ Add lowercase letters");

    if (/[A-Z]/.test(pw)) score += 10;
    else feedback.push("➤ Add uppercase letters");

    if (/[0-9]/.test(pw)) score += 10;
    else feedback.push("➤ Add numbers");

    if (/[\W_]/.test(pw)) score += 10;
    else feedback.push("➤ Add special characters");

    
    const commonPasswords = ["password", "123456", "qwerty", "abc123"];
    if (commonPasswords.includes(pw.toLowerCase())) {
        score = 10;
        feedback.push("❗ Very common password, avoid this.");
    }

    
    if (/1234|abcd|qwerty/i.test(pw)) {
        score -= 10;
        feedback.push("❗ Avoid easy sequences like 1234 or abcd");
    }

    
    if (/(\w)\1{2,}/.test(pw)) {
        score -= 10;
        feedback.push("❗ Avoid repeating characters");
    }

    updateUI(score, feedback);
}

function updateUI(score, feedback) {
    const bar = document.getElementById("bar");
    const text = document.getElementById("strength-text");
    const list = document.getElementById("feedback-list");

    let strength = "";
    let color = "";

    if (score < 30) {
        strength = "Weak";
        color = "red";
        bar.style.width = "30%";
    } else if (score < 60) {
        strength = "Medium";
        color = "orange";
        bar.style.width = "60%";
    } else {
        strength = "Strong";
        color = "lime";
        bar.style.width = "100%";
    }

    bar.style.background = color;
    text.style.color = color;
    text.innerHTML = "Strength: " + strength;

    list.innerHTML = "";
    feedback.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        list.appendChild(li);
    });
}
