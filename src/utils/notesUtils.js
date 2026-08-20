/** Filter notes by search query, category, and subject */
export const filterNotes = (notes, { search = '', category = 'All', subject = 'All' } = {}) => {
    let result = [...notes];
    const q = search.trim().toLowerCase();

    if (q) {
        result = result.filter(
            (n) =>
                n.title.toLowerCase().includes(q) ||
                n.subject.toLowerCase().includes(q) ||
                n.author.toLowerCase().includes(q) ||
                (n.category && n.category.toLowerCase().includes(q)) ||
                n.tags?.some((t) => t.toLowerCase().includes(q))
        );
    }

    if (category !== 'All') {
        result = result.filter((n) => n.category === category);
    }

    if (subject !== 'All') {
        result = result.filter((n) => n.subject === subject);
    }

    return result;
};

/** Top notes by downloads + rating for trending section */
export const getTrendingNotes = (notes, limit = 4) =>
    [...notes]
        .sort((a, b) => b.downloads * b.rating - a.downloads * a.rating)
        .slice(0, limit);
