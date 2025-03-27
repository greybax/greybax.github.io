import fs from 'fs';
import path from 'path';
import glob from 'glob';
import moment from 'moment';

// Directory containing the Markdown files
const postsDir = './source/posts';

// Function to update dates in a file
const updateDatesInFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');

  // Regex to match dates in the format "_Month Day, Year_"
  const dateRegex = /_(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})_/g;

  // Replace dates with ISO 8601 format
  const updatedContent = content.replace(dateRegex, (match, month, day, year) => {
    const isoDate = moment(`${month} ${day}, ${year}`, 'MMMM D, YYYY').format('YYYY-MM-DD');
    return `_${isoDate}_`;
  });

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated dates in: ${filePath}`);
};

// Get all Markdown files in the posts directory
glob(`${postsDir}/*.md`, (err, files) => {
  if (err) {
    console.error('Error reading files:', err);
    return;
  }

  // Update dates in each file
  files.forEach((file) => updateDatesInFile(file));
});