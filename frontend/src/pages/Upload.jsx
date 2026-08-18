import { useState } from 'react';
import { SUBJECTS } from '../data/dummyData';
import './Upload.css';

const Upload = () => {
    const [form, setForm] = useState({
        title: '',
        subject: '',
        description: '',
        price: '',
        isFree: false,
        tags: '',
        pages: '',
        previewFile: null,
        coverFile: null,
    });
    const [dragOver, setDragOver] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'isFree' && checked ? { price: '' } : {}),
        }));
        setErrors((er) => ({ ...er, [name]: '' }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setForm((f) => ({ ...f, previewFile: file }));
        }
    };

    const handleFileChange = (e) => {
        setForm((f) => ({ ...f, previewFile: e.target.files[0] }));
    };

    const validateStep1 = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Title is required.';
        if (!form.subject) errs.subject = 'Please select a subject.';
        if (!form.description.trim()) errs.description = 'Description is required.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        const errs = {};
        if (!form.isFree && (!form.price || isNaN(form.price) || Number(form.price) <= 0)) {
            errs.price = 'Enter a valid price or mark as free.';
        }
        if (!form.previewFile) errs.previewFile = 'Please upload your notes file.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep2()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="page-wrapper upload-success-wrapper">
                <div className="orb orb-purple" style={{ width: 400, height: 400, top: -100, left: '30%' }} />
                <div className="upload-success">
                    <div className="upload-success-icon">🎉</div>
                    <h2 className="heading-md">Notes Uploaded Successfully!</h2>
                    <p className="upload-success-sub">
                        Your notes "<strong>{form.title}</strong>" have been submitted for review.
                        They'll be live within 24 hours.
                    </p>
                    <div className="upload-success-actions">
                        <button className="btn btn-primary btn-lg" onClick={() => { setSuccess(false); setStep(1); setForm({ title: '', subject: '', description: '', price: '', isFree: false, tags: '', pages: '', previewFile: null, coverFile: null }); }}>
                            Upload More Notes
                        </button>
                        <button className="btn btn-ghost btn-lg" onClick={() => window.location.href = '/dashboard'}>
                            View Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="upload-header">
                <div className="orb orb-purple" style={{ width: 350, height: 350, top: -100, right: 0 }} />
                <div className="container upload-header-inner">
                    <h1 className="heading-lg">Upload Your Notes 📝</h1>
                    <p className="upload-header-sub">Share your knowledge and start earning from your study materials</p>

                    {/* Step Indicator */}
                    <div className="step-indicator">
                        <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                            <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
                            <span>Details</span>
                        </div>
                        <div className={`step-line ${step > 1 ? 'done' : ''}`} />
                        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-circle">2</div>
                            <span>Upload & Pricing</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container upload-layout">
                <div className="upload-form-wrap">
                    <form onSubmit={handleSubmit}>

                        {/* ── STEP 1: Details ── */}
                        {step === 1 && (
                            <div className="upload-step-content animate-fade">
                                <div className="upload-card card">
                                    <div className="upload-card-header">
                                        <span className="upload-step-tag">Step 1 of 2</span>
                                        <h2 className="upload-section-title">Note Details</h2>
                                    </div>
                                    <div className="upload-card-body">

                                        <div className="form-group">
                                            <label htmlFor="upload-title" className="form-label">Note Title *</label>
                                            <input
                                                id="upload-title"
                                                name="title"
                                                type="text"
                                                placeholder="e.g. Complete Calculus Notes – Limits & Derivatives"
                                                className={`form-input ${errors.title ? 'input-error' : ''}`}
                                                value={form.title}
                                                onChange={handleChange}
                                                maxLength={100}
                                            />
                                            {errors.title && <span className="field-error">⚠ {errors.title}</span>}
                                            <span className="char-count">{form.title.length}/100</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="upload-subject" className="form-label">Subject *</label>
                                            <div className="select-wrap">
                                                <select
                                                    id="upload-subject"
                                                    name="subject"
                                                    className={`form-select ${errors.subject ? 'input-error' : ''}`}
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select a subject…</option>
                                                    {SUBJECTS.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <span className="select-arrow">▾</span>
                                            </div>
                                            {errors.subject && <span className="field-error">⚠ {errors.subject}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="upload-description" className="form-label">Description *</label>
                                            <textarea
                                                id="upload-description"
                                                name="description"
                                                rows={4}
                                                placeholder="Describe what's in your notes: topics covered, who it's for, what makes it special…"
                                                className={`form-input upload-textarea ${errors.description ? 'input-error' : ''}`}
                                                value={form.description}
                                                onChange={handleChange}
                                                maxLength={500}
                                            />
                                            {errors.description && <span className="field-error">⚠ {errors.description}</span>}
                                            <span className="char-count">{form.description.length}/500</span>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="upload-pages" className="form-label">Number of Pages</label>
                                                <input
                                                    id="upload-pages"
                                                    name="pages"
                                                    type="number"
                                                    min="1"
                                                    max="500"
                                                    placeholder="e.g. 45"
                                                    className="form-input"
                                                    value={form.pages}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="upload-tags" className="form-label">Tags <span className="label-optional">(comma-separated)</span></label>
                                                <input
                                                    id="upload-tags"
                                                    name="tags"
                                                    type="text"
                                                    placeholder="e.g. Calculus, JEE, Integration"
                                                    className="form-input"
                                                    value={form.tags}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <button type="button" id="upload-next-btn" className="btn btn-primary btn-lg" onClick={handleNext}>
                                            Continue to Upload & Pricing →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Upload & Pricing ── */}
                        {step === 2 && (
                            <div className="upload-step-content animate-fade">
                                {/* File Upload */}
                                <div className="upload-card card">
                                    <div className="upload-card-header">
                                        <span className="upload-step-tag">Step 2 of 2</span>
                                        <h2 className="upload-section-title">Upload File</h2>
                                    </div>
                                    <div className="upload-card-body">
                                        <div
                                            className={`dropzone ${dragOver ? 'dragover' : ''} ${form.previewFile ? 'has-file' : ''} ${errors.previewFile ? 'input-error' : ''}`}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onDrop={handleDrop}
                                        >
                                            {form.previewFile ? (
                                                <div className="dropzone-file">
                                                    <div className="dropzone-file-icon">📄</div>
                                                    <div className="dropzone-file-info">
                                                        <div className="dropzone-file-name">{form.previewFile.name}</div>
                                                        <div className="dropzone-file-size">{(form.previewFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="dropzone-remove"
                                                        onClick={() => setForm((f) => ({ ...f, previewFile: null }))}
                                                    >✕</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="dropzone-icon">📁</div>
                                                    <div className="dropzone-text">
                                                        <strong>Drag & drop your PDF here</strong>
                                                        <span>or click to browse files</span>
                                                    </div>
                                                    <div className="dropzone-hint">Supported: PDF (max 50MB)</div>
                                                </>
                                            )}
                                            <input
                                                id="upload-file"
                                                type="file"
                                                accept=".pdf"
                                                className="dropzone-input"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        {errors.previewFile && <span className="field-error">⚠ {errors.previewFile}</span>}
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="upload-card card" style={{ marginTop: '24px' }}>
                                    <div className="upload-card-header">
                                        <h2 className="upload-section-title">💰 Set Your Price</h2>
                                    </div>
                                    <div className="upload-card-body">
                                        <div className="free-toggle">
                                            <label className="toggle-label">
                                                <input
                                                    id="upload-free-toggle"
                                                    type="checkbox"
                                                    name="isFree"
                                                    checked={form.isFree}
                                                    onChange={handleChange}
                                                />
                                                <span className="toggle-slider" />
                                                <span className="toggle-text">Make this free for everyone</span>
                                            </label>
                                        </div>

                                        {!form.isFree && (
                                            <div className="form-group" style={{ marginTop: '16px' }}>
                                                <label htmlFor="upload-price" className="form-label">Price (₹) *</label>
                                                <div className="price-input-wrap">
                                                    <span className="price-currency">₹</span>
                                                    <input
                                                        id="upload-price"
                                                        name="price"
                                                        type="number"
                                                        min="1"
                                                        max="500"
                                                        placeholder="0"
                                                        className={`form-input price-input ${errors.price ? 'input-error' : ''}`}
                                                        value={form.price}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.price && <span className="field-error">⚠ {errors.price}</span>}
                                                <div className="price-suggestions">
                                                    {[29, 49, 79, 99, 149].map((p) => (
                                                        <button
                                                            type="button"
                                                            key={p}
                                                            className={`price-suggest-btn ${Number(form.price) === p ? 'active' : ''}`}
                                                            onClick={() => setForm((f) => ({ ...f, price: String(p) }))}
                                                        >
                                                            ₹{p}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="earning-preview">
                                                    <span className="earning-label">You earn</span>
                                                    <span className="earning-amount">₹{form.price ? Math.floor(Number(form.price) * 0.8) : 0}</span>
                                                    <span className="earning-note">(80% of sale price)</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="upload-actions">
                                    <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(1)}>
                                        ← Back
                                    </button>
                                    <button
                                        type="submit"
                                        id="publish-btn"
                                        className={`btn btn-success btn-lg ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <><span className="spinner" /> Publishing…</>
                                        ) : (
                                            '🚀 Publish Notes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Sidebar Tips */}
                <aside className="upload-sidebar">
                    <div className="tips-card glass-card">
                        <h3 className="tips-title">💡 Tips for Success</h3>
                        <div className="tips-list">
                            {[
                                { icon: '📝', tip: 'Use a clear, descriptive title that includes the subject or course.' },
                                { icon: '🖼️', tip: 'Neat, well-organized notes sell 3× more than messy ones.' },
                                { icon: '🏷️', tip: 'Add relevant tags to help students discover your notes.' },
                                { icon: '💰', tip: 'Price between ₹29–₹99 for best conversion rates.' },
                                { icon: '⭐', tip: 'Include a table of contents and page numbers for higher ratings.' },
                            ].map((t, i) => (
                                <div key={i} className="tip-item">
                                    <span className="tip-icon">{t.icon}</span>
                                    <span className="tip-text">{t.tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="earn-preview-card glass-card">
                        <h3 className="tips-title">📊 Earnings Estimate</h3>
                        <div className="earn-preview-rows">
                            {[
                                { sales: 10, price: form.price || 49 },
                                { sales: 50, price: form.price || 49 },
                                { sales: 100, price: form.price || 49 },
                            ].map(({ sales, price }) => (
                                <div key={sales} className="earn-row">
                                    <span className="earn-row-label">{sales} sales</span>
                                    <span className="earn-row-value">₹{Math.floor(sales * Number(price) * 0.8)}</span>
                                </div>
                            ))}
                        </div>
                        <p className="earn-note">Based on current price. You keep 80%.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Upload;
