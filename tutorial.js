let isTutorialActive = false;
let currentPage = 1; // Define a global variable to keep track of the current page

function startIntro() {
    const intro = introJs();

    function addNextStepListener(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.removeEventListener('click', nextStepOnClick); // Ensure no duplicates
            element.addEventListener('click', nextStepOnClick);
        }
    }

    function nextStepOnClick(event) {
        if (isTutorialActive) {
            intro.nextStep();
            event.target.removeEventListener('click', nextStepOnClick);
        }
    }

    function removeAllListeners() {
        document.querySelectorAll('#close-tutorial, #show-tutorial').forEach(element => {
            element.removeEventListener('click', nextStepOnClick);
        });
    }

    intro.onbeforechange(function(targetElement) {
        if (targetElement.id === 'close-tutorial' || targetElement.id === 'show-tutorial') {
            addNextStepListener(`#${targetElement.id}`);
        }
    });

    intro.oncomplete(() => removeAllListeners());
    intro.onexit(() => removeAllListeners());

    // Use switch case for different intro steps based on the page number or other criteria
    switch (currentPage) {
        case 2:
            intro.setOptions({
                steps: [
                    { intro: "Welcome to a beginner Bitsy tutorial!" },
                    { element: '#editor-section', intro: "This is the Bitsy editor." },
                    { element: '#close-tutorial', intro: "Click here to close the tutorial window." },
                    { element: '#show-tutorial', intro: "Now click here to open the tutorial back up." }
                ]
            });
            break;
        case 4:
            intro.setOptions({
                steps: [
                    { element: '.titleWidget', intro: "Add a name for your game here." }                ]
            });
            break;
        case 5:
                intro.setOptions({
                    steps: [
                        { intro: "This is page 5 tutorial" },
                        { element: '#roomPanel', intro: "This is the Room Editor." },
                        { element: '#paintPanel', intro: "This is the Paint Editor." },
                        { element: '#colorsPanel', intro: "This is the Colors Editor." },
                    ]
                });
        // Add more cases as needed
    }

    intro.start();
    isTutorialActive = true;
}

// function showHintInBitsy(hints) {
//     const intro = introJs();
//     intro.setOptions({ hints });
//     intro.addHints();
//     intro.showHints();
// }

function showPage(pageNumber) {
    console.log(`showPage called with pageNumber: ${pageNumber}`); // Log the page number
    currentPage = pageNumber; // Update the global currentPage variable
    document.querySelectorAll('.tutorial-page').forEach(page => {
        page.style.display = 'none';
    });
    console.log('All tutorial pages set to display: none'); // Confirm all pages are hidden

    const activePage = document.getElementById(`page-${pageNumber}`);
    if (activePage) {
        activePage.style.display = 'block';
        console.log(`Page ${pageNumber} set to display: block`); // Confirm the active page is displayed
    } else {
        console.log(`Page ${pageNumber} not found`); // Log if the active page is not found
    }

    // Show hint or start tour based on the page number
    switch(pageNumber) {
        
    }
}



// Load tutorial text content. Manage visibility of tutorial section.
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);  // Show the first page by default
    
    

    document.querySelectorAll('.start-tutorial').forEach(button => {
        button.addEventListener('click', startIntro);
    });

    document.getElementById('close-tutorial').addEventListener('click', function() {
        const tutorialSection = document.getElementById('tutorial-section');
        const showTutorialButton = document.getElementById('show-tutorial');
        const editorSection = document.getElementById('editor-section');

        if (tutorialSection.classList.contains('hidden')) {
            tutorialSection.classList.remove('hidden');
            showTutorialButton.classList.remove('visible');
            editorSection.classList.remove('col-md-12');
            editorSection.classList.add('col-md-9');
        } else {
            tutorialSection.classList.add('hidden');
            showTutorialButton.classList.add('visible');
            editorSection.classList.remove('col-md-9');
            editorSection.classList.add('col-md-12');
        }
    });

    document.getElementById('show-tutorial').addEventListener('click', function() {
        const tutorialSection = document.getElementById('tutorial-section');
        const editorSection = document.getElementById('editor-section');

        tutorialSection.classList.remove('hidden');
        this.classList.remove('visible');
        editorSection.classList.remove('col-md-12');
        editorSection.classList.add('col-md-9');
    });

    
});
