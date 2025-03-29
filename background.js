// background.js

chrome.action.onClicked.addListener((tab) => {
  if (!tab) {
    console.error("No active tab found.");
    return;
  }

  if (chrome.sidePanel && typeof chrome.sidePanel.getOptions === "function") {
    // Try to open the side panel
    chrome.sidePanel.getOptions({ tabId: tab.id }, (panelInfo) => {
      if (chrome.runtime.lastError) {
        console.error("Error getting side panel info:", chrome.runtime.lastError.message);
        return;
      }

      if (panelInfo && panelInfo.isOpen) {
        console.log("Side panel is already open.");
      } else {
        console.log("Opening side panel...");
        chrome.sidePanel.open({ tabId: tab.id }, () => {
          if (chrome.runtime.lastError) {
            console.error("Error opening side panel:", chrome.runtime.lastError.message);
          } else {
            console.log("Side panel opened successfully.");
          }
        });
      }
    });
  } else {
    // Fallback: Open a popup if sidePanel is not supported
    console.warn("Side panel API is not available. Falling back to popup.");
    chrome.tabs.sendMessage(tab.id, { action: "openPopup" });
  }
});

// Handle messages from the side panel or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceText") {
    const { oldText, newText, tabId } = message;

    chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      func: (oldTextToReplace, newTextToInject) => {
        const activeElement = document.activeElement;

        if (
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.isContentEditable)
        ) {
          let currentValue;

          if (activeElement.isContentEditable) {
            currentValue = activeElement.innerHTML;
          } else {
            currentValue = activeElement.value;
          }

          const updatedValue = currentValue.replace(oldTextToReplace, newTextToInject);

          if (activeElement.isContentEditable) {
            activeElement.innerHTML = updatedValue;
          } else {
            activeElement.value = updatedValue;
          }

          activeElement.focus();
          return { success: true };
        } else {
          console.error("No valid text box is focused.");
          return { success: false };
        }
      },
      args: [message.oldText, message.newText],
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("Error executing script:", chrome.runtime.lastError.message);
        sendResponse({ success: false });
      } else {
        sendResponse(results[0]?.result || { success: false });
      }
    });

    return true; // Keep the message channel open for async responses
  }
});