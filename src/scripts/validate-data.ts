import fs from 'fs';
import path from 'path';

type Publication = {
  title: string;
  abstract: string;
  date: string;
  authors: string[];
  categories: string[];
  paperLink: string;
};

function isValidDateFormat(dateStr: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && dateStr === date.toISOString().slice(0, 10);
}

// need zod or not? just for this simple validation?
function isValidPublication(obj: any): obj is Publication {
  return (
    typeof obj === 'object' &&
    typeof obj.title === 'string' &&
    typeof obj.abstract === 'string' &&
    typeof obj.date === 'string' &&
    isValidDateFormat(obj.date) &&
    Array.isArray(obj.authors) &&
    obj.authors.every((a: any) => typeof a === 'string') &&
    Array.isArray(obj.categories) &&
    obj.categories.every((c: any) => typeof c === 'string') &&
    typeof obj.paperLink === 'string'
  );
}

function main() {
  const filePath = path.join(process.cwd(), 'public/data/publications.json');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  let data: Publication[];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(content);
  } catch (err) {
    console.error('❌ Failed to read or parse JSON file:', err);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('❌ JSON root is not an array.');
    process.exit(1);
  }

  let isValid = true;
  data.forEach((entry, index) => {
    if (!isValidPublication(entry)) {
      isValid = false;
      console.error(`❌ Invalid entry at index ${index}:`, entry);
    }
  });

  if (isValid) {
    console.log('✅ All entries are valid.');
  } else {
    process.exit(1);
  }
}

main();
