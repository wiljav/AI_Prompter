// content.js

function injectText(newText) {
    // Re-query the chat box dynamically
    const chatBox = document.querySelector('textarea#chat-input');
  
    if (!chatBox) {
      console.error("Chat box not found.");
      return { success: false, message: "Chat box not found." };
    }
  
    // Focus the chat box
    chatBox.focus();
    
    console.log("Before injection:", chatBox.value); // Log the current value
    console.log("Element details:", chatBox.outerHTML); // Log the element's structure

    // Inject the text
    chatBox.value =
    chatBox.value.slice(0, start) + newText + chatBox.value.slice(end);
    chatBox.setSelectionRange(start + newText.length, start + newText.length);

    console.log("After injection:", chatBox.value); // Log the updated value
    
    // Insert the text directly into the <textarea>
    const start = chatBox.selectionStart;
    const end = chatBox.selectionEnd;
  
    // Update the value at the cursor position
    chatBox.value =
      chatBox.value.slice(0, start) + newText + chatBox.value.slice(end);
  
    // Move the cursor to the end of the inserted text
    chatBox.setSelectionRange(start + newText.length, start + newText.length);
  
    // Dispatch necessary events to notify the framework
    const events = ["input", "change", "keyup"];
    events.forEach(eventType => {
      const event = eventType === "keyup"
        ? new KeyboardEvent("keyup", { bubbles: true, cancelable: true, key: "Enter", code: "Enter", keyCode: 13 })
        : new Event(eventType, { bubbles: true, cancelable: true });
      chatBox.dispatchEvent(event);
    });
  
    return { success: true, message: "Text injected successfully." };
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectText") {
      const result = injectText(message.newText);
      sendResponse(result);
    } else {
      sendResponse({ success: false, message: "Unknown action." });
    }
  
    return true; // Keep the message channel open for async responses
  });

