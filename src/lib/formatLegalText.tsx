export function formatLegalText(rawText: string) {
    const sections = rawText.split('\n').filter(line => line.trim() !== '');

    return sections.map((section, index) => {
        if (index === 0) { // Titre principal
            return <h1 key={index} className="text-3xl font-bold my-4 pb-8">{section}</h1>;
        }
        if (/^Article \d+/.test(section)) { // Titres d'articles
            return <h2 key={index} className="text-2xl font-semibold my-4">{section}</h2>;
        }
        if (/^[A-D]\./.test(section)) { // Sous-titres principaux
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 ml-4">{section}</h3>;
        }
        if (/^[a-d]\./.test(section)) { // Sous-sous-titres
            return <h4 key={index} className="ml-8 font-semibold mt-4 mb-2 italic ">{section}</h4>;
        }
        if (section.startsWith('-')) { // Éléments de liste informels
            return <p key={index} className="mb-4 ml-12 ">- {section.slice(1).trim()}</p>;
        }
        return <p key={index} className="mb-4 ml-4">{section}</p>; // Paragraphe normal avec indentation légère
    });
}