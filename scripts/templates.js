function getCrossTemplate() {
    return `<svg width="100" height="100">
                            <line x1="10" y1="10" x2="90" y2="90" stroke="red" stroke-width="4" />
                            <!-- to create an X with svg you have to use two lines -->
                            <line x1="90" y1="10" x2="10" y2="90" stroke="red" stroke-width="4" />
                            <!-- the table begins in the top left corner x = 0 and y = 0-->
                        </svg>`;
}

function getCircleTemplate() {
    return `<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="#00B1EF" stroke-width="4" fill="transparent" /></svg>`;
}
