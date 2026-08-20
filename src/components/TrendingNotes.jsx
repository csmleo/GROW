import { useState } from 'react';
import NoteCard from './NoteCard';
import NotePreviewModal from './NotePreviewModal';

/** Trending / recommended notes row */
const TrendingNotes = ({ notes, title = '🔥 Trending Notes', subtitle = 'Most popular picks this week' }) => {
    const [previewNote, setPreviewNote] = useState(null);

    if (!notes?.length) return null;

    return (
        <section className="trending-section">
            <div className="section-header section-header-left">
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>
            <div className="trending-grid">
                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} onPreview={setPreviewNote} featured />
                ))}
            </div>
            <NotePreviewModal note={previewNote} onClose={() => setPreviewNote(null)} />
        </section>
    );
};

export default TrendingNotes;
