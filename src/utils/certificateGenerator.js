/**
 * High-Resolution HTML5 Canvas Certificate Generator for Pip's Midnight Observatory
 * Renders an official, premium 2400x1600 Junior Dream Engineer Certificate.
 */

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = `${currentLine} ${word}`;
    const width = ctx.measureText(testLine).width;
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        break;
      }
    }
  }
  if (lines.length < maxLines && currentLine) {
    lines.push(currentLine);
  }

  const totalH = (lines.length - 1) * lineHeight;
  const startY = y - totalH / 2;
  lines.forEach((line, idx) => {
    ctx.fillText(line, x, startY + idx * lineHeight);
  });
}

export function renderCertificateToCanvas(canvas, data) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const {
    nickname = 'Stargazer',
    highScore = 0,
    completedMilestonesCount = 0,
    unlockedCompanions = [],
    favoriteAura = 'Honey Amber (2200K)',
    isGraduated = false,
  } = data;

  const width = 2400;
  const height = 1600;
  canvas.width = width;
  canvas.height = height;

  // 1. Deep Midnight Nebula Background
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    80,
    width / 2,
    height / 2,
    1300
  );
  bgGrad.addColorStop(0, '#1a2240');
  bgGrad.addColorStop(0.45, '#12162a');
  bgGrad.addColorStop(0.85, '#0c0e1b');
  bgGrad.addColorStop(1, '#07080f');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Constellation Sky Backdrop
  ctx.save();
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);

  const starNodes = [
    [240, 260], [420, 180], [600, 280], [780, 200],
    [1620, 200], [1800, 280], [1980, 180], [2160, 260],
    [280, 1380], [520, 1440], [1880, 1440], [2120, 1380],
  ];

  ctx.beginPath();
  for (let i = 0; i < starNodes.length - 1; i += 2) {
    ctx.moveTo(starNodes[i][0], starNodes[i][1]);
    ctx.lineTo(starNodes[i + 1][0], starNodes[i + 1][1]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Twinkling Stardust Dots
  ctx.fillStyle = 'rgba(255, 248, 241, 0.75)';
  starNodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 3. Ornate Double Golden Filigree Border
  const padOuter = 50;
  const padInner = 72;

  // Outer Gold Border
  ctx.strokeStyle = '#f3c96b';
  ctx.lineWidth = 6;
  ctx.strokeRect(padOuter, padOuter, width - padOuter * 2, height - padOuter * 2);

  // Inner Delicate Gold Border
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.65)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(padInner, padInner, width - padInner * 2, height - padInner * 2);

  // Corner Star Ornaments (✦)
  ctx.fillStyle = '#f3c96b';
  ctx.font = '36px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦', padInner, padInner);
  ctx.fillText('✦', width - padInner, padInner);
  ctx.fillText('✦', padInner, height - padInner);
  ctx.fillText('✦', width - padInner, height - padInner);

  // 4. Header & Observatory Eyebrow
  ctx.font = 'bold 20px "Nunito", -apple-system, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('MIDNIGHT OBSERVATORY · CLOUD 9 SANCTUARY', width / 2, 145);
  ctx.letterSpacing = '0px';

  // Main Certificate Title
  ctx.font = 'bold 52px "Fraunces", Georgia, "Times New Roman", serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.6)';
  ctx.shadowBlur = 18;
  const mainTitle = isGraduated
    ? 'JUNIOR DREAM ENGINEER CERTIFICATE'
    : 'APPRENTICE-IN-TRAINING CERTIFICATE';
  ctx.fillText(mainTitle, width / 2, 215);
  ctx.shadowBlur = 0;

  // Gold Subtitle
  ctx.font = 'italic 24px "Fraunces", Georgia, serif';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('Official Accreditation of the Midnight Nursery Guild', width / 2, 270);

  // 5. Dedication Ceremony Copy
  ctx.font = '22px "Nunito", -apple-system, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('This celestial parchment bears witness that', width / 2, 345);

  // 6. Recipient Nickname (Prominent with auto-scale)
  const safeNickname = nickname.trim().slice(0, 32) || 'Stargazer';
  const nameFontSize = safeNickname.length > 20 ? 48 : safeNickname.length > 14 ? 54 : 64;
  ctx.font = `bold ${nameFontSize}px "Fraunces", Georgia, "Times New Roman", serif`;
  ctx.fillStyle = '#f3c96b';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.7)';
  ctx.shadowBlur = 14;
  ctx.fillText(safeNickname, width / 2, 425);
  ctx.shadowBlur = 0;

  // Decorative Underline Divider under Name
  const gradLine = ctx.createLinearGradient(width / 2 - 280, 455, width / 2 + 280, 455);
  gradLine.addColorStop(0, 'rgba(243, 201, 107, 0)');
  gradLine.addColorStop(0.5, 'rgba(243, 201, 107, 0.8)');
  gradLine.addColorStop(1, 'rgba(243, 201, 107, 0)');
  ctx.strokeStyle = gradLine;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 280, 455);
  ctx.lineTo(width / 2 + 280, 455);
  ctx.stroke();

  // Ceremony Lore
  ctx.font = 'italic 22px Georgia, serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(
    'has explored the cloudways, aided the nocturnal dreamers, and gathered the starlight of Cloud 9.',
    width / 2,
    505
  );

  // 7. Central Statistics Panel (CSS Grid Mirror with 3 Equal Columns)
  const boxX = 240;
  const boxY = 560;
  const boxW = 1920;
  const boxH = 210;
  const boxRadius = 16;

  ctx.fillStyle = 'rgba(20, 25, 48, 0.88)';
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, boxRadius);
  ctx.fill();
  ctx.stroke();

  // 3 Equal Columns inside box
  const col1X = 560;
  const col2X = 1200;
  const col3X = 1840;

  // Vertical Dividers (Separated from text)
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(880, boxY + 28);
  ctx.lineTo(880, boxY + boxH - 28);
  ctx.moveTo(1520, boxY + 28);
  ctx.lineTo(1520, boxY + boxH - 28);
  ctx.stroke();

  // Column 1: Star Harvest Record
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('STAR HARVEST RECORD', col1X, boxY + 52);
  ctx.letterSpacing = '0px';

  ctx.font = 'bold 36px "Fraunces", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(highScore > 0 ? `${highScore} Stars` : '0 Stars', col1X, boxY + 105);

  ctx.font = '18px "Nunito", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Verified Slumber Catch', col1X, boxY + 152);

  // Column 2: Quest Discoveries
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('QUEST DISCOVERIES', col2X, boxY + 52);
  ctx.letterSpacing = '0px';

  ctx.font = 'bold 36px "Fraunces", Georgia, serif';
  ctx.fillStyle = isGraduated ? '#f3c96b' : '#ffffff';
  ctx.fillText(`${completedMilestonesCount} of 3 Milestones`, col2X, boxY + 105);

  ctx.font = '18px "Nunito", sans-serif';
  ctx.fillStyle = isGraduated ? '#f3c96b' : '#94a3b8';
  ctx.fillText(
    isGraduated ? '🌟 Full Graduation Verified' : 'In Active Progress',
    col2X,
    boxY + 152
  );

  // Column 3: Favorite Bedside Aura (Safe wrapping for longer names)
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('FAVORITE BEDSIDE AURA', col3X, boxY + 52);
  ctx.letterSpacing = '0px';

  const cleanAura = (favoriteAura || 'Honey Amber').replace(/\(.*\)/, '').trim() || 'Not Yet Recorded';
  ctx.font = 'bold 28px "Fraunces", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  drawWrappedText(ctx, cleanAura, col3X, boxY + 105, 520, 34, 2);

  ctx.font = '18px "Nunito", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Calibrated Luminescence', col3X, boxY + 152);

  // 8. Unlocked Sky Companions Panel (3 Distinct Cards)
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('UNLOCKED SKY COMPANIONS', width / 2, 825);
  ctx.letterSpacing = '0px';

  const companionsMeta = [
    {
      id: 'cloud-kitten',
      name: 'Cloud Kitten',
      role: 'Slumbering Eaves Guardian',
      symbol: '🐱',
      unlocked: unlockedCompanions.includes('cloud-kitten'),
    },
    {
      id: 'golden-badger',
      name: 'Barnaby the Golden Badger',
      role: 'Keeper of Cedar Hearth',
      symbol: '🦡',
      unlocked: unlockedCompanions.includes('golden-badger'),
    },
    {
      id: 'celestial-moth',
      name: 'Celestial Moth',
      role: 'Watcher of Secret Skies',
      symbol: '🦋',
      unlocked: unlockedCompanions.includes('celestial-moth'),
    },
  ];

  const cardW = 600;
  const cardH = 190;
  const cardY = 855;
  const cardXs = [240, 900, 1560];

  companionsMeta.forEach((comp, idx) => {
    const cx = cardXs[idx];

    ctx.save();
    // Card Box
    ctx.fillStyle = comp.unlocked ? 'rgba(28, 36, 68, 0.85)' : 'rgba(18, 22, 42, 0.7)';
    ctx.strokeStyle = comp.unlocked ? 'rgba(243, 201, 107, 0.65)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = comp.unlocked ? 2 : 1.5;
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cardW, cardH, 14);
    ctx.fill();
    ctx.stroke();

    // Companion Glyph Symbol
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(comp.symbol, cx + 80, cardY + 105);

    // Companion Text (Left-aligned within card)
    ctx.textAlign = 'left';
    ctx.font = 'bold 24px "Fraunces", Georgia, serif';
    ctx.fillStyle = comp.unlocked ? '#ffffff' : '#94a3b8';
    ctx.fillText(comp.name, cx + 150, cardY + 68);

    ctx.font = '16px "Nunito", sans-serif';
    ctx.fillStyle = comp.unlocked ? '#cbd5e1' : '#64748b';
    ctx.fillText(comp.role, cx + 150, cardY + 102);

    // Status Pill
    const pillX = cx + 150;
    const pillY = cardY + 124;
    const pillW = comp.unlocked ? 140 : 220;
    const pillH = 36;

    ctx.fillStyle = comp.unlocked ? 'rgba(243, 201, 107, 0.15)' : 'rgba(255, 255, 255, 0.06)';
    ctx.strokeStyle = comp.unlocked ? 'rgba(243, 201, 107, 0.5)' : 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 18);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 13px "Nunito", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillStyle = comp.unlocked ? '#f3c96b' : '#94a3b8';
    ctx.fillText(comp.unlocked ? '✦ UNLOCKED' : '🔒 AWAITING DISCOVERY', pillX + 16, pillY + 23);
    ctx.letterSpacing = '0px';

    ctx.restore();
  });

  // 9. Inspirational Lore Tagline
  ctx.font = 'italic 24px Georgia, serif';
  ctx.fillStyle = '#fbcfe8';
  ctx.textAlign = 'center';
  ctx.fillText('“I build the dreams you fall asleep inside.”', width / 2, 1115);

  // 10. Balanced Three-Part Ceremonial Footer (No collisions)
  // Left: Accreditation Details | Center: Gold Wax Seal | Right: Accrediting Engineer
  const footerBaseY = 1290;

  // --- Left Column ---
  ctx.textAlign = 'left';
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('ACCREDITED NIGHT', 240, footerBaseY - 50);
  ctx.letterSpacing = '0px';

  ctx.font = 'bold 24px "Fraunces", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Night of October 19, 2026', 240, footerBaseY - 10);

  ctx.font = '17px "Nunito", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Registry Code: #OBS-2026-CLOUD9', 240, footerBaseY + 30);

  // --- Center Column: Official Circular Gold Wax Seal ---
  const sealX = width / 2;
  const sealY = footerBaseY;
  const sealR = 85;

  ctx.save();
  // Radial Gold Gradient
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 15, sealX, sealY, sealR);
  sealGrad.addColorStop(0, '#fef08a');
  sealGrad.addColorStop(0.35, '#f59e0b');
  sealGrad.addColorStop(0.75, '#b45309');
  sealGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = sealGrad;
  ctx.shadowColor = 'rgba(245, 158, 11, 0.45)';
  ctx.shadowBlur = 24;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Outer Decorative Ring
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Delicate Ring
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 14, 0, Math.PI * 2);
  ctx.stroke();

  // Seal Text (All inside circle, legible, perfectly balanced)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "Nunito", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('★ MIDNIGHT NURSERY ★', sealX, sealY - 26);

  ctx.font = 'bold 22px "Fraunces", Georgia, serif';
  ctx.fillText(isGraduated ? 'GRADUATED' : 'APPRENTICE', sealX, sealY + 4);

  ctx.font = 'bold 11px "Nunito", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillStyle = '#fef08a';
  ctx.fillText('CLOUD 9 SEAL', sealX, sealY + 28);
  ctx.letterSpacing = '0px';
  ctx.restore();

  // --- Right Column: Accrediting Engineer ---
  ctx.textAlign = 'right';
  ctx.font = 'bold 18px "Nunito", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('ACCREDITING ENGINEER', width - 240, footerBaseY - 50);
  ctx.letterSpacing = '0px';

  // Signature (Script style with gold glow)
  ctx.font = 'italic bold 36px "Brush Script MT", "Caveat", "Dancing Script", cursive, Georgia';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText('Pip ✦ Junior Dream Engineer', width - 240, footerBaseY - 10);
  ctx.shadowBlur = 0;

  ctx.font = '17px "Nunito", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Midnight Nursery Custodian', width - 240, footerBaseY + 30);
}

/**
 * Trigger browser PNG download of the rendered canvas at 2400x1600
 */
export async function downloadCertificatePng(canvas, rawNickname = 'Stargazer') {
  if (!canvas) throw new Error('Certificate canvas unavailable');

  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Safe fallback if fonts.ready fails
    }
  }

  const sanitized = rawNickname
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30)
    .trim() || 'Stargazer';

  const filename = `pip-dream-engineer-certificate-${sanitized}.png`;

  try {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Certificate download error:', err);
    throw err;
  }
}
