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

function getTemplateDash(xy1, xy2, tableHeight, tableWidth) {
    // Calculate the line length so the dash animation can reveal the full winning line
    const length = Math.hypot(xy2[0] - xy1[0], xy2[1] - xy1[1]); //difference between the two points, use pythagorean theorem to calculate the length of the line
    return `<svg class="dash" width="${tableWidth}" height="${tableHeight}">
                <line x1="${xy1[0]}" y1="${xy1[1]}" x2="${xy2[0]}" y2="${xy2[1]}" stroke="black" stroke-width="6" stroke-dasharray="${length}"/>
                    <!-- Fade in -->
                  <animate attributeName="stroke-dashoffset" from="${length}" to="0" dur="0.5s" fill="freeze" />
            </svg>`;
}
