import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to search (adjust as needed)
const SEARCH_DIRS = ["src"];
// File extensions to search
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

// Comment patterns
const SINGLE_LINE_COMMENT = /\/\/(.*)$/gm;
const MULTI_LINE_COMMENT = /\/\*[\s\S]*?\*\//gm;
const JSX_COMMENT = /\{\/\*[\s\S]*?\*\/\}/gm;

let results = [];

function findComments(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const comments = [];

  // Find single-line comments
  let match;
  while ((match = SINGLE_LINE_COMMENT.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split("\n").length;
    comments.push({
      type: "single-line",
      line: lineNum,
      content: match[0].trim(),
    });
  }

  // Find multi-line comments
  let multiMatch;
  while ((multiMatch = MULTI_LINE_COMMENT.exec(content)) !== null) {
    const lineNum = content.substring(0, multiMatch.index).split("\n").length;
    comments.push({
      type: "multi-line",
      line: lineNum,
      content: multiMatch[0].trim(),
    });
  }

  // Find JSX comments
  let jsxMatch;
  while ((jsxMatch = JSX_COMMENT.exec(content)) !== null) {
    const lineNum = content.substring(0, jsxMatch.index).split("\n").length;
    comments.push({
      type: "jsx",
      line: lineNum,
      content: jsxMatch[0].trim(),
    });
  }

  return comments;
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
        const comments = findComments(filePath);
        if (comments.length > 0) {
          results.push({
            file: filePath,
            comments: comments,
          });
        }
      }
    }
  });
}

// Main execution
console.log("🔍 Searching for comments...\n");

SEARCH_DIRS.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    walkDirectory(fullPath);
  }
});

// Display results
if (results.length === 0) {
  console.log("No comments found.");
} else {
  let totalComments = 0;
  results.forEach((result) => {
    console.log(`\n📁 ${result.file}`);
    console.log("─".repeat(50));
    result.comments.forEach((comment) => {
      totalComments++;
      console.log(`Line ${comment.line} [${comment.type}]:`);
      console.log(comment.content);
      console.log("");
    });
  });
  console.log(
    `\n✅ Total: ${totalComments} comments found in ${results.length} files`
  );
}

// Optional: Save to JSON file
const outputPath = path.join(process.cwd(), "comments-report.json");
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Report saved to: ${outputPath}`);
