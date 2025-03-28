console.log("Email Assistant Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'Generate Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]',
    ];
    for(const selector of selectors) {
       const content= document.querySelector(selector);
       if(content){
        return content.innerText.trim();
       }
       return '';
    }
}

/*function createToneDropdown() {
    const dropdown = document.createElement('select');
    dropdown.id = 'tone';
    dropdown.style.marginRight = '8px';
    dropdown.className = 'tone-selector';

    const options = ['professional', 'casual', 'friendly'];
    options.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone;
        option.textContent = tone.charAt(0).toUpperCase() + tone.slice(1);
        dropdown.appendChild(option);
    });

    return dropdown;
}
    */

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for(const selector of selectors) {
       const toolbar = document.querySelector(selector);
       if(toolbar){
        return toolbar;
       }
       return null;
    }
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI button");
    //const dropdown = createToneDropdown();
    const button = createAIButton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            //const tone = document.getElementById('tone').value;
            const response = await fetch('http://localhost:8080/api/email/generate',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                emailContent: emailContent,
                tone: "professional"
              })
            });          
        if(!response.ok) {
            throw new Error('API Request failed');
        }
        const generatedReply = await response.text();
        const composeBox = document.querySelector('[role="textbox"][g_editable = "true"]');
        if (composeBox) {
            composeBox.focus();
            document.execCommand('insertText', false, generatedReply);
        } else{
            console.error('compose box not found');
        }
        } catch(error) {
            alert('Failed to generate the reply');
        } finally{
            button.innerHTML = 'Generate Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
    //toolbar.insertBefore(dropdown, button);
}

const observer = new MutationObserver((mutations) => { //watches changes made in DOM tree
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]')
        )
        );
        if(hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
      childList: true,
      subtree: true
})