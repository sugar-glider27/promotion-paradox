// data

const ladderData = [
    {
        label: "POLICE OFFICER",
        rate: 37.3,
        y: 500,
        colorStart: "#043F66",
        colorEnd: "#08618F"
    },
    {
        label: "SERGEANT",
        rate: 30.9,
        y: 350,
        colorStart: "#075789",
        colorEnd: "#1177AD"
    },
    {
        label: "LIEUTENANT",
        rate: 23.7,
        y: 200,
        colorStart: "#126DA8",
        colorEnd: "#258BC8"
    }
];

// svg setup

const width = 1100;
const height = 650;

const svg = d3
    .select("#ladder-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("role", "img")
    .attr(
        "aria-label",
        "Gray ladder showing decreasing substantiation rates as NYPD officer rank increases."
    )
    .style("display", "block");

const defs = svg.append("defs");

// individual gradients for bars

ladderData.forEach((d, i) => {

    const gradient = defs
        .append("linearGradient")
        .attr("id", `barGradient-${i}`)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

    gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d.colorStart);

    gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d.colorEnd);
});


// background

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#ffffff");


// metal rail gradient

const railFront = defs
    .append("linearGradient")
    .attr("id", "railFront")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%");

[
    ["0%",   "#62676b"],
    ["8%",   "#7a8085"],
    ["22%",  "#9ba1a5"],
    ["38%",  "#b8bdc0"],
    ["52%",  "#d2d5d7"],
    ["64%",  "#b8bdc0"],
    ["80%",  "#969ca0"],
    ["92%",  "#747a7e"],
    ["100%", "#555a5e"]
].forEach(([offset, color]) => {
    railFront
        .append("stop")
        .attr("offset", offset)
        .attr("stop-color", color);
});


// inner side face

const railSide = defs
    .append("linearGradient")
    .attr("id", "railSide")
    .attr("x1", "0%")
    .attr("x2", "100%");

[
    ["0%",   "#656a6e"],
    ["45%",  "#4e5357"],
    ["100%", "#383c3f"]
].forEach(([offset, color]) => {
    railSide
        .append("stop")
        .attr("offset", offset)
        .attr("stop-color", color);
});


// rung gradient

const rungGradient = defs
    .append("linearGradient")
    .attr("id", "rungGradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");

[
    ["0%",   "#656a6e"],
    ["10%",  "#858b8f"],
    ["24%",  "#adb2b5"],
    ["39%",  "#d0d3d5"],
    ["51%",  "#bec2c4"],
    ["68%",  "#93999c"],
    ["86%",  "#696e72"],
    ["100%", "#4c5154"]
].forEach(([offset, color]) => {
    rungGradient
        .append("stop")
        .attr("offset", offset)
        .attr("stop-color", color);
});


// label plaque gradient

const plaqueGradient = defs
    .append("linearGradient")
    .attr("id", "plaqueGradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");

[
    ["0%",   "#f2f5f6"],
    ["25%",  "#e7ecee"],
    ["55%",  "#dce3e6"],
    ["80%",  "#cdd6da"],
    ["100%", "#b9c3c7"]
].forEach(([offset, color]) => {
    plaqueGradient
        .append("stop")
        .attr("offset", offset)
        .attr("stop-color", color);
});


// shadow

const softShadow = defs
    .append("filter")
    .attr("id", "softShadow")
    .attr("x", "-40%")
    .attr("y", "-100%")
    .attr("width", "180%")
    .attr("height", "300%");

softShadow
    .append("feGaussianBlur")
    .attr("stdDeviation", 3);


// title

svg.append("text")
    .attr("x", width / 2)
    .attr("y", 46)
    .attr("text-anchor", "middle")
    .attr("font-family", "Georgia, serif")
    .attr("font-size", 29)
    .attr("font-weight", 700)
    .attr("fill", "#172033")
    .text("Higher rank, Lower substantiation");


// subtitle

svg.append("text")
    .attr("x", width / 2)
    .attr("y", 80)
    .attr("text-anchor", "middle")
    .attr("font-family", "system-ui, sans-serif")
    .attr("font-size", 18)
    .attr("fill", "#485563")
    .text(
        "Higher-ranking NYPD officers had a lower average share of misconduct allegations substantiated against them."
    );


// chart scale

const chartZero = 380;
const chartRight = 1000;

const axisMinimum = 15;
const axisMaximum = 40;

const xScale = d3
    .scaleLinear()
    .domain([axisMinimum, axisMaximum])
    .range([chartZero, chartRight]);


// vertical reference lines

svg.selectAll(".value-guide")
    .data(ladderData)
    .join("line")
    .attr("class", "value-guide")
    .attr("x1", d => xScale(d.rate))
    .attr("x2", d => xScale(d.rate))
    .attr("y1", d => d.y)
    .attr("y2", 580)
    .attr("stroke", "#dfe3e6")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8);


// bars

const barHeight = 42;

svg.selectAll(".rate-bar")
    .data(ladderData)
    .join("rect")
    .attr("class", "rate-bar")
    .attr("x", chartZero - 30)
    .attr("y", d => d.y - barHeight / 2)
    .attr(
        "width",
        d => xScale(d.rate) - xScale(axisMinimum) + 30
    )
    .attr("height", barHeight)
    .attr("fill", (d, i) => `url(#barGradient-${i})`);


// rate labels

svg.selectAll(".rate-label")
    .data(ladderData)
    .join("text")
    .attr("x", d => xScale(d.rate) + 13)
    .attr("y", d => d.y + 6)
    .attr("font-family", "system-ui, sans-serif")
    .attr("font-size", 18)
    .attr("font-weight", 750)
    .attr("fill", "#182334")
    .text(d => `${d.rate.toFixed(1)}%`);

// mask for the bottom bar where it overlaps the ladder

svg.append("polygon")
    .attr("class", "police-officer-bar-mask")
    .attr(
        "points",
        `
        348,477
        378,477
        382,523
        348,523
        `
    )
    .attr("fill", "#ffffff");


// ladder

const ladderTop = 120;
const ladderBottom = 550;

const leftRail = {
    top: 176,
    bottom: 137
};

const rightRail = {
    top: 338,
    bottom: 377
};

const railWidth = 18;
const railDepth = 4;


// helpers

function railX(rail, y) {

    const t =
        (y - ladderTop) /
        (ladderBottom - ladderTop);

    return (
        rail.top +
        t * (rail.bottom - rail.top)
    );
}


function pointsString(points) {

    return points
        .map(([x, y]) => `${x},${y}`)
        .join(" ");
}


const ladder = svg
    .append("g")
    .attr("class", "ladder");


// draw rung

function drawRung(y) {

    const left =
        railX(leftRail, y) - 2;

    const right =
        railX(rightRail, y) + 2;

    const h = 9;


    // shadow

    ladder
        .append("rect")
        .attr("x", left + 8)
        .attr("y", y + 6)
        .attr("width", right - left - 16)
        .attr("height", 7)
        .attr("rx", 3)
        .attr("fill", "#394047")
        .attr("opacity", 0.13)
        .attr("filter", "url(#softShadow)");


    // dark underside

    ladder
        .append("rect")
        .attr("x", left)
        .attr("y", y)
        .attr("width", right - left)
        .attr("height", h)
        .attr("rx", h / 2)
        .attr("fill", "#555b5f");


    // main rung

    ladder
        .append("rect")
        .attr("x", left)
        .attr("y", y - h / 2)
        .attr("width", right - left)
        .attr("height", h)
        .attr("rx", h / 2)
        .attr("fill", "url(#rungGradient)")
        .attr("stroke", "#666c70")
        .attr("stroke-width", 0.6);


    // metallic highlight

    ladder
        .append("line")
        .attr("x1", left + 8)
        .attr("x2", right - 8)
        .attr("y1", y - 2)
        .attr("y2", y - 2)
        .attr("stroke", "#edf0f1")
        .attr("stroke-width", 0.7)
        .attr("stroke-opacity", 0.5);
}


// rungs

const stepRungs = [
    220,
    370,
    520
];

const extraRungs = [
    145,
    295,
    445
];

[
    ...stepRungs,
    ...extraRungs
].forEach(drawRung);


// rank plaques

function drawRankPlaque(d) {

    const plaqueY = d.y + 4;

    const leftCenter =
        railX(leftRail, plaqueY);

    const rightCenter =
        railX(rightRail, plaqueY);

    const left =
        leftCenter + 13;

    const right =
        rightCenter - 13;

    const h = 27;


    // soft shadow

    ladder
        .append("rect")
        .attr("x", left + 3)
        .attr("y", plaqueY - h / 2 + 5)
        .attr("width", right - left)
        .attr("height", h)
        .attr("rx", 1.5)
        .attr("fill", "#4b5459")
        .attr("opacity", 0.12)
        .attr("filter", "url(#softShadow)");


    // main plaque

    ladder
        .append("rect")
        .attr("x", left)
        .attr("y", plaqueY - h / 2)
        .attr("width", right - left)
        .attr("height", h)
        .attr("rx", 1.5)
        .attr("fill", "url(#plaqueGradient)")
        .attr("stroke", "none");


    // rank text

    ladder
        .append("text")
        .attr("x", (left + right) / 2)
        .attr("y", plaqueY + 5)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial, system-ui, sans-serif")
        .attr("font-size", 13)
        .attr("font-weight", 800)
        .attr("fill", "#17202a")
        .text(d.label);
}


ladderData.forEach(drawRankPlaque);


// draw rail

function drawRail(rail, side) {

    const half = railWidth / 2;

    const topCenter = rail.top;
    const bottomCenter = rail.bottom;


    const front = [
        [
            topCenter - half,
            ladderTop
        ],
        [
            topCenter + half,
            ladderTop
        ],
        [
            bottomCenter + half,
            ladderBottom
        ],
        [
            bottomCenter - half,
            ladderBottom
        ]
    ];


    const innerTop =
        side === "left"
            ? topCenter + half
            : topCenter - half;

    const innerBottom =
        side === "left"
            ? bottomCenter + half
            : bottomCenter - half;

    const direction =
        side === "left"
            ? 1
            : -1;


    // soft shadow

    ladder
        .append("polygon")
        .attr(
            "points",
            pointsString([
                [
                    innerTop + direction * 2,
                    ladderTop + 8
                ],
                [
                    innerBottom + direction * 2,
                    ladderBottom - 8
                ],
                [
                    innerBottom + direction * 9,
                    ladderBottom - 8
                ],
                [
                    innerTop + direction * 9,
                    ladderTop + 8
                ]
            ])
        )
        .attr("fill", "#41494e")
        .attr("opacity", 0.07)
        .attr("filter", "url(#softShadow)");


    // 3D inner side

    ladder
        .append("polygon")
        .attr(
            "points",
            pointsString([
                [
                    innerTop,
                    ladderTop
                ],
                [
                    innerBottom,
                    ladderBottom
                ],
                [
                    innerBottom + direction * railDepth,
                    ladderBottom
                ],
                [
                    innerTop + direction * railDepth,
                    ladderTop
                ]
            ])
        )
        .attr("fill", "url(#railSide)")
        .attr("stroke", "#4d5357")
        .attr("stroke-width", 0.5);


    // main rail

    ladder
        .append("polygon")
        .attr("points", pointsString(front))
        .attr("fill", "url(#railFront)")
        .attr("stroke", "#686e72")
        .attr("stroke-width", 0.8)
        .attr("stroke-linejoin", "round");


    // metallic highlight

    const highlightOffset =
        side === "left"
            ? 1
            : -1;

    ladder
        .append("line")
        .attr(
            "x1",
            topCenter + highlightOffset
        )
        .attr(
            "y1",
            ladderTop + 10
        )
        .attr(
            "x2",
            bottomCenter + highlightOffset
        )
        .attr(
            "y2",
            ladderBottom - 10
        )
        .attr("stroke", "#e0e3e5")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.46);


    // broad highlight

    ladder
        .append("line")
        .attr("x1", topCenter)
        .attr("y1", ladderTop + 12)
        .attr("x2", bottomCenter)
        .attr("y2", ladderBottom - 12)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 4)
        .attr("stroke-opacity", 0.07);
}


drawRail(leftRail, "left");
drawRail(rightRail, "right");


// screws

const screwYs = [
    165,
    245,
    320,
    395,
    470,
    530
];

screwYs.forEach(y => {

    [
        railX(leftRail, y),
        railX(rightRail, y)
    ].forEach(x => {

        ladder
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 1.8)
            .attr("fill", "#666c70")
            .attr("stroke", "#50565a")
            .attr("stroke-width", 0.4);


        ladder
            .append("circle")
            .attr("cx", x - 0.2)
            .attr("cy", y - 0.2)
            .attr("r", 1.05)
            .attr("fill", "#c9cdcf");


        ladder
            .append("circle")
            .attr("cx", x - 0.55)
            .attr("cy", y - 0.6)
            .attr("r", 0.3)
            .attr("fill", "#ffffff");
    });
});





// axis

const axisY = 580;

const xAxis = d3
    .axisBottom(xScale)
    .tickValues([
        15,
        20,
        25,
        30,
        35,
        40
    ])
    .tickFormat(d => `${d}%`)
    .tickSize(6);


const axisGroup = svg
    .append("g")
    .attr(
        "transform",
        `translate(0, ${axisY})`
    )
    .call(xAxis);


axisGroup
    .select(".domain")
    .attr("stroke", "#aab0b5");


axisGroup
    .selectAll(".tick line")
    .attr("stroke", "#aab0b5");


axisGroup
    .selectAll(".tick text")
    .attr("font-family", "system-ui, sans-serif")
    .attr("font-size", 12)
    .attr("fill", "#4c555d")
    .attr("dy", "0.9em");


// axis label

svg.append("text")
    .attr(
        "x",
        (chartZero + chartRight) / 2
    )
    .attr("y", 630)
    .attr("text-anchor", "middle")
    .attr("font-family", "system-ui, sans-serif")
    .attr("font-size", 18)
    .attr("fill", "#323a40")
    .text(
        "Average percentage of misconduct allegations substantiated per officer"
    );