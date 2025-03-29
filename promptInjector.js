// Load the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode);
  document.getElementById('themeToggle').checked = isDarkMode;
});

document.getElementById('themeToggle').addEventListener('change', (event) => {
  const isDarkMode = event.target.checked;
  document.body.classList.toggle('dark-mode', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode); // Save theme preference
});

// Function to reset dropdowns for a specific mode
function resetDropdowns(mode) {
  // Chat mode  
  if (mode === "chat") {
    const context = document.getElementById('context').value = "";
    const tone = document.getElementById('tone').value = "";
    const format = document.getElementById('format').value = "";
    const audience = document.getElementById('audience').value = "";
    const goal = document.getElementById('goal').value = "";
    const length = document.getElementById('length').value = "";
    const text_style = document.getElementById('text_style').value = "";
    const language = document.getElementById('language').value = "";
    const medium = document.getElementById('medium').value = "";
    const specificity = document.getElementById('specificity').value = "";
  }
  // Image mode
  else if (mode === "image") {
    const subject = document.getElementById('subject').value = "";
    const image_style = document.getElementById('image_style').value = "";
    const composition = document.getElementById('composition').value = "";
    const colour = document.getElementById('colour-palette').value = "";
    const textures = document.getElementById('textures').value = "";
    const lighting = document.getElementById('lighting').value = "";
    const mood = document.getElementById('mood').value = "";
    const quality = document.getElementById('quality').value = "";
    const background = document.getElementById('background').value = "";
    const environment = document.getElementById('environment').value = "";
    const weather = document.getElementById('weather').value = "";
    const time = document.getElementById('time-of-day').value = "";
    const camera = document.getElementById('camera-angle').value = "";
    const art = document.getElementById('art-movement').value = "";
    const aspect = document.getElementById('aspect-ratio').value = "";
    const parameters = document.getElementById('parameters').value = "";
  }
}

let lastInjectedText = ""; // Track the last injected text
function toggleMode() {
  const chatMode = document.getElementById('chat-mode');
  const imageMode = document.getElementById('image-mode');
  const chatRadio = document.querySelector('input[value="chat"]');
  const imageRadio = document.querySelector('input[value="image"]');
  
  chatMode.style.display = 'none';
  imageMode.style.display = 'none';

  if (chatRadio.checked) {
      console.log("Chat mode selected"); // Debugging
      chatMode.style.display = 'block';
      resetDropdowns("image"); // Reset Image mode dropdowns
  } else if (imageRadio.checked) {
      console.log("image mode selected"); // Debugging
      imageMode.style.display = 'block';
      resetDropdowns("chat"); // Reset chat mode dropdowns
  } else {
    console.log("image mode selected"); // Debugging
    resetDropdowns("chat"); // Reset chat mode dropdowns
    resetDropdowns("image"); // Reset Image mode dropdowns
  }
  
  // // Reset dropdowns when switching modes
  console.log("Calling updatePreview()"); // Debugging
  updatePreview();
}


function getSelectedOptions() {
  let output = "";
  // Get the free-text input
  const freeText = document.getElementById('baseText').value.trim();
  if (freeText) {
    output += freeText;
  }
  
  // Append selected options
  if (document.querySelector('input[value="chat"]').checked) {
      // Get all dropdown elements
      const context = document.getElementById('context').value;
      const tone = document.getElementById('tone').value;
      const format = document.getElementById('format').value;
      const audience = document.getElementById('audience').value;
      const goal = document.getElementById('goal').value;
      const length = document.getElementById('length').value;
      const text_style = document.getElementById('text_style').value;
      const language = document.getElementById('language').value;
      const medium = document.getElementById('medium').value;
      const specificity = document.getElementById('specificity').value;

      // Start with the base text
      if (context) output += `, Context: ${context}`;
      if (tone) output += `, Tone: ${tone}`;
      if (format) output += `, Format: ${format}`;
      if (audience) output += `, Audience: ${audience}`;
      if (goal) output += `, Goal: ${goal}`;
      if (length) output += `, Length: ${length}`;
      if (text_style) output += `, Style: ${text_style}`;
      if (language) output += `, Language: ${language}`;
      if (medium) output += `, Medium: ${medium}`;
      if (specificity) output += `, Specificity: ${specificity}`;
      
  } else if (document.querySelector('input[value="image"]').checked) {
      const subject = document.getElementById('subject').value;
      const image_style = document.getElementById('image_style').value;
      const composition = document.getElementById('composition').value;
      const colour = document.getElementById('colour-palette').value;
      const textures = document.getElementById('textures').value;
      const lighting = document.getElementById('lighting').value;
      const mood = document.getElementById('mood').value;
      const quality = document.getElementById('quality').value;
      const background = document.getElementById('background').value;
      const environment = document.getElementById('environment').value;
      const weather = document.getElementById('weather').value;
      const time = document.getElementById('time-of-day').value;
      const camera = document.getElementById('camera-angle').value;
      const art = document.getElementById('art-movement').value;
      const aspect = document.getElementById('aspect-ratio').value;
      const parameters = document.getElementById('parameters').value;

      // document.getElementById('output').value = output;
      if (subject) output += `, subject: ${subject}`;
      if (image_style) output += `, image-styled: ${image_style}`;
      if (composition) output += `, composition: ${composition}`;
      if (colour) output += `, colour: ${colour}`;
      if (textures) output += `, textures: ${textures}`;
      if (lighting) output += `, lighting: ${lighting}`;
      if (mood) output += `, mood: ${mood}`;
      if (quality) output += `, quality: ${quality}`;
      if (background) output += `, background: ${background}`;
      if (environment) output += `, environment: ${environment}`;
      if (weather) output += `, weather: ${weather}`;
      if (time) output += `, time: ${time}`;
      if (camera) output += `, camera: ${camera}`;
      if (art) output += `, art: ${art}`;
      if (aspect) output += `, aspect: ${aspect}`;
      if (parameters) output += `, parameters: ${parameters}`;
  }
  
  return output.trim();
}


function updatePreview() {
  const previewCode = document.querySelector('#preview'); // Target the <code> element
  const options = getSelectedOptions();

  // Update the textContent of the <code> block
  previewCode.textContent = options || "No options selected";
}

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener('change', toggleMode);
});

// Update the preview when dropdown values change
// document.querySelectorAll('select').forEach((select) => {
//   select.addEventListener('change', updatePreview);
// });
// Add event listeners for dropdowns and free text input
document.querySelectorAll('select, #baseText').forEach((element) => {
  element.addEventListener('change', updatePreview); // For dropdowns
  element.addEventListener('input', updatePreview); // For free text input
});

// Initial setup
updatePreview(); // Call once on page load

// Handle free-text input changes
document.getElementById('baseText').addEventListener('input', updatePreview);

// document.getElementById('copyButton').addEventListener('click', () => {
//   const textToCopy = getSelectedOptions();

//   if (!textToCopy) {
//     const notification_error = document.getElementById('notification-nothing');
//     notification_error.classList.add('visible');
//     setTimeout(() => notification_error.classList.remove('visible'), 1000);
//     return;
//   }

//   // Copy the text to the clipboard
//   navigator.clipboard.writeText(textToCopy).then(() => {
//     const notification = document.getElementById('notification');
//     notification.classList.add('visible');
//     setTimeout(() => notification.classList.remove('visible'), 1000);
    

//     lastCopiedText = textToCopy; // Track the last copied text
//   }).catch(err => {
//     const notification_nothing = document.getElementById('notification-nothing');
//     notification_nothing.classList.add('visible');
//     setTimeout(() => notification_nothing.classList.remove('visible'), 1000);
//   });
// });
document.getElementById('copyButton').addEventListener('click', () => {
  const textToCopy = getSelectedOptions(); // Assuming this function retrieves the content to copy

  if (!textToCopy) {
    // If there's nothing to copy, show the "Nothing to copy" warning
    showNotification('notification-nothing');
    return;
  }

  // Attempt to copy the text to the clipboard
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // If successful, show the "Copied" success notification
      showNotification('notification');
    })
    .catch((err) => {
      // If there's an error, show the "Failed to copy" error notification
      showNotification('notification-error');
    });
});

// Helper function to show a notification and hide it after a delay
function showNotification(id) {
  // Hide all notifications first
  document.querySelectorAll('#notification-container .alert').forEach((alert) => {
    alert.classList.remove('visible');
  });

  // Show the selected notification
  const notification = document.getElementById(id);
  if (notification) {
    notification.classList.add('visible');

    // Hide the notification after 1 second
    setTimeout(() => {
      notification.classList.remove('visible');
    }, 1000);
  }
}