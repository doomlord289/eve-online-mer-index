const fs = require("fs");

const jsonPath = "mer.json";
const readmePath = "README.md";

const jsonContent = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

let markdown =
  "# Eve Online Monthly Economic Reports\n\nAn index of Eve Online's Monthly Economic Reports (MERs).\n\nThis README is generated using data in `mer.json`, which is manually updated. If the a link is broken, incorrect, or missing, please open an issue describing the problem. New MERs will be added ASAP.\n\n";

const monthsMap = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

const years = Object.keys(jsonContent).sort((a, b) => b - a);

for (const year of years) {
  markdown += `## ${year}\n\n`;

  const months = Object.keys(jsonContent[year]).sort((a, b) => b - a);

  for (const month of months) {
    const monthName = monthsMap[month];

    let everefLink = jsonContent[year][month].everef;

    if (everefLink === null) {
      everefLink = "<missing>";
    }

    markdown += `### ${monthName} ${year}\n`;
    markdown += `- News article: ${jsonContent[year][month].news}\n`;
    markdown += `- Forum post: ${jsonContent[year][month].forum}\n`;
    markdown += `- Data: ${jsonContent[year][month].data}\n`;
    markdown += `- Everef Data Mirror: ${everefLink}\n\n`;
  }
}

fs.writeFileSync(readmePath, markdown, "utf8");
