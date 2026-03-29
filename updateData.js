import fs from 'fs';

const filePath = 'src/data/mockData.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// The file has export const airlines: Airline[] = [ ... ];
// export const airports: Airport[] = [ ... ];
// export const routes: Route[] = [ ... ];
// export const blogPosts: BlogPost[] = [ ... ];

// We can split the content by "export const"
const parts = content.split('export const ');

for (let i = 0; i < parts.length; i++) {
  if (parts[i].startsWith('airlines: Airline[] = [')) {
    // Remove existing website lines
    parts[i] = parts[i].replace(/\s+website: ".*?",/g, '');
    
    // Add website after id
    parts[i] = parts[i].replace(/id: "(.*?)",/g, (match, id) => {
      // Let's make the website more realistic
      let domain = id.replace(/-/g, '');
      if (id === 'malaysia-airlines') domain = 'malaysiaairlines';
      if (id === 'singapore-airlines') domain = 'singaporeair';
      if (id === 'emirates') domain = 'emirates';
      if (id === 'qatar-airways') domain = 'qatarairways';
      if (id === 'cathay-pacific') domain = 'cathaypacific';
      if (id === 'airasia') domain = 'airasia';
      if (id === 'scoot') domain = 'flyscoot';
      if (id === 'jetstar') domain = 'jetstar';
      if (id === 'british-airways') domain = 'britishairways';
      if (id === 'lufthansa') domain = 'lufthansa';
      if (id === 'air-france') domain = 'airfrance';
      if (id === 'klm') domain = 'klm';
      if (id === 'delta') domain = 'delta';
      if (id === 'united') domain = 'united';
      if (id === 'american-airlines') domain = 'aa';
      if (id === 'ana') domain = 'ana.co.jp';
      if (id === 'jal') domain = 'jal.co.jp';
      if (id === 'korean-air') domain = 'koreanair';
      if (id === 'asiana') domain = 'flyasiana';
      if (id === 'eva-air') domain = 'evaair';
      if (id === 'china-airlines') domain = 'china-airlines';
      if (id === 'qantas') domain = 'qantas';
      if (id === 'air-new-zealand') domain = 'airnewzealand';
      if (id === 'turkish-airlines') domain = 'turkishairlines';
      if (id === 'etihad') domain = 'etihad';
      if (id === 'saudia') domain = 'saudia';
      if (id === 'garuda-indonesia') domain = 'garuda-indonesia';
      if (id === 'vietnam-airlines') domain = 'vietnamairlines';
      if (id === 'thai-airways') domain = 'thaiairways';
      if (id === 'philippine-airlines') domain = 'philippineairlines';

      let ext = domain.includes('.') ? '' : '.com';
      return `${match}\n    website: "https://www.${domain}${ext}",`;
    });
  } else if (parts[i].startsWith('airports: Airport[] = [') || parts[i].startsWith('routes: Route[] = [') || parts[i].startsWith('blogPosts: BlogPost[] = [')) {
    // Remove website lines that were incorrectly added
    parts[i] = parts[i].replace(/\s+website: ".*?",/g, '');
  }
}

content = parts.join('export const ');

fs.writeFileSync(filePath, content);
console.log("Done");
