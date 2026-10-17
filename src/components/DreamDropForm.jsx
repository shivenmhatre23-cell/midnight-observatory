import React, { useState } from 'react';

const RECIPIENT_OPTIONS = [
  'Sleepy Woodland Creatures 🦔',
  'Treetop Night Owlets 🦉',
  'Little Burrow Mice 🐭',
  'Star-gazers Everywhere ✨',
];

export default function DreamDropForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState(RECIPIENT_OPTIONS[0]);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [dreamsList, setDreamsList] = useState([]);

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Please enter a gentle title for your dream.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Dream title should be at least 3 characters.';
    }

    if (!trimmedDesc) {
      newErrors.description = 'Please describe what happens in this dream.';
    } else if (trimmedDesc.length < 10) {
      newErrors.description = 'Dream description should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newDream = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      recipient,
      time: 'Just now',
    };

    setDreamsList((prev) => [newDream, ...prev]);
    setStatusMessage(`✦ Your dream "${newDream.title}" has been nestled into Pip's cloud basket!`);
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setRecipient(RECIPIENT_OPTIONS[0]);
    setErrors({});
    setStatusMessage(null);
  };

  const handleDeleteDream = (id) => {
    setDreamsList((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <section className="dream-drop-section" id="dream-drop" aria-labelledby="dream-drop-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Local Cloud Dispatch</span>
          <h2 id="dream-drop-heading" className="section-title">Whisper a Dream to Pip</h2>
          <p className="section-subtitle">
            Have a cozy bedtime wish for the sleeping creatures below? Drop it into Pip’s local dispatch
            basket for tonight’s skiff delivery.
          </p>
        </div>

        <div className="dream-drop-layout">
          {/* Form Card */}
          <div className="dream-form-card">
            <div className="form-card-badge">
              <span className="form-badge-ico" aria-hidden="true">✉️</span>
              <span>Temporary Session Dispatch</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Dream Title */}
              <div className="form-field">
                <div className="field-label-row">
                  <label htmlFor="dream-title" className="field-label">
                    Dream Title <span className="required-star">*</span>
                  </label>
                  <span className="char-count">{title.length}/60</span>
                </div>
                <input
                  type="text"
                  id="dream-title"
                  className={`form-input ${errors.title ? 'input-error' : ''}`}
                  placeholder="e.g., A warm cup of moonlight and honey"
                  maxLength={60}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                  <p id="title-error" className="field-error-msg" role="alert">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Recipient Category */}
              <div className="form-field">
                <label htmlFor="dream-recipient" className="field-label">
                  Intended Slumberer
                </label>
                <select
                  id="dream-recipient"
                  className="form-select"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                >
                  {RECIPIENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dream Description */}
              <div className="form-field">
                <div className="field-label-row">
                  <label htmlFor="dream-desc" className="field-label">
                    Dream Vision <span className="required-star">*</span>
                  </label>
                  <span className="char-count">{description.length}/240</span>
                </div>
                <textarea
                  id="dream-desc"
                  rows={3}
                  className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                  placeholder="Describe the peaceful sights, gentle sounds, or soft warmth of this dream..."
                  maxLength={240}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                  }}
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'desc-error' : undefined}
                />
                {errors.description && (
                  <p id="desc-error" className="field-error-msg" role="alert">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status announcement */}
              {statusMessage && (
                <div className="form-success-banner" role="status" aria-live="polite">
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="form-actions-row">
                <button type="submit" className="btn-primary">
                  <span>Dispatch to Cloud Basket</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-secondary"
                  aria-label="Clear form fields"
                >
                  <span>Clear</span>
                </button>
              </div>

              <p className="privacy-disclaimer">
                🔒 <strong>Session Notice:</strong> Dreams are held exclusively in temporary React
                browser state. No accounts, email, or database connections exist; dreams gently drift
                away when this page is refreshed.
              </p>
            </form>
          </div>

          {/* Active Dreams Preview Column */}
          <div className="dream-list-column">
            <div className="list-column-header">
              <h3 className="list-column-title">Tonight’s Cloud Basket</h3>
              <span className="list-badge">{dreamsList.length} Whispers</span>
            </div>

            {dreamsList.length === 0 ? (
              <div className="empty-basket-card">
                <span className="empty-basket-icon" aria-hidden="true">🧺</span>
                <p className="empty-basket-text">
                  The cloud basket is waiting for its first whispered dream! Use the form to tuck in a cozy vision for Pip to deliver.
                </p>
              </div>
            ) : (
              <div className="dreams-scroll-container">
                {dreamsList.map((item) => (
                  <article key={item.id} className="dream-whisper-card">
                    <div className="whisper-header">
                      <span className="whisper-recipient">{item.recipient}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDream(item.id)}
                        className="btn-delete-whisper"
                        aria-label={`Remove dream "${item.title}"`}
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="whisper-title">{item.title}</h4>
                    <p className="whisper-desc">{item.description}</p>
                    <div className="whisper-footer">
                      <span className="whisper-tag">✦ Slumber Corridor Ready</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
