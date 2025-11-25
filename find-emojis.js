import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to search (adjust as needed)
const SEARCH_DIRS = ["src"];
// File extensions to search
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".css", ".html"];

// Emoji regex pattern - matches all Unicode emoji characters
const EMOJI_REGEX = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

let results = [];
let emojiStats = {};

function findEmojis(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const emojis = [];

  lines.forEach((line, index) => {
    let match;
    while ((match = EMOJI_REGEX.exec(line)) !== null) {
      const emoji = match[0];
      emojis.push({
        emoji: emoji,
        line: index + 1,
        context: line
          .trim()
          .substring(Math.max(0, match.index - 20), match.index + 30),
      });

      // Update statistics
      emojiStats[emoji] = (emojiStats[emoji] || 0) + 1;
    }
  });

  return emojis;
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        walkDirectory(filePath);
      }
    } else {
      const ext = path.extname(file);
      if (EXTENSIONS.includes(ext)) {
        const emojis = findEmojis(filePath);
        if (emojis.length > 0) {
          results.push({
            file: filePath,
            emojis: emojis,
          });
        }
      }
    }
  });
}

// Main execution
console.log("🔍 Searching for emojis...\n");

SEARCH_DIRS.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    walkDirectory(fullPath);
  }
});

// Display results
if (results.length === 0) {
  console.log("No emojis found.");
} else {
  let totalEmojis = 0;
  results.forEach((result) => {
    console.log(`\n📁 ${result.file}`);
    console.log("─".repeat(50));
    result.emojis.forEach((item) => {
      totalEmojis++;
      console.log(`Line ${item.line}: ${item.emoji}`);
      console.log(`Context: ${item.context}`);
      console.log("");
    });
  });

  // Display statistics
  console.log("\n📊 Emoji Statistics:");
  console.log("─".repeat(50));
  const sortedEmojis = Object.entries(emojiStats).sort((a, b) => b[1] - a[1]);

  sortedEmojis.forEach(([emoji, count]) => {
    console.log(`${emoji} : ${count} occurrences`);
  });

  console.log(
    `\n✅ Total: ${totalEmojis} emojis found in ${results.length} files`
  );
}

// Optional: Save to JSON file
const outputPath = path.join(process.cwd(), "emojis-report.json");
fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      results: results,
      statistics: emojiStats,
    },
    null,
    2
  )
);
console.log(`\n💾 Report saved to: ${outputPath}`);
